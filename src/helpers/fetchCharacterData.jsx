
import { getRandomNumberExcluding } from "./getRandomNumberExcluding";


const fetchCharacterData = async (isLoading,
    buttonDisabled,
    setIsLoading,
    setCharacterData,
    buttonClickCount,
    setButtonClickCount,
    setShowRetryMessage,
    setButtonDisabled) => {
    const fetchCharacterData = async () => {
        try {
          if (isLoading || buttonDisabled) return;
          setIsLoading(true);
          setCharacterData([]);
      
          if (buttonClickCount >= 8) {
            setShowRetryMessage(true);
            setButtonDisabled(true);
      
            const interval = setInterval(() => {
             
             
                setShowRetryMessage(false);
                setButtonDisabled(false);
                setButtonClickCount(0);
      
                clearInterval(interval);
              
            }, 1000);
          }
      
          const randomNumbers = [];
          while (randomNumbers.length < 5) {
            const randomNumber = getRandomNumberExcluding(
              1,
              10000,
              [8, 9, 10, 578, 576]
            );
            if (!randomNumbers.includes(randomNumber)) {
              randomNumbers.push(randomNumber);
            }
          }
      
          for (let i = 0; i < randomNumbers.length; i++) {
            let success = false;
            let id = randomNumbers[i];
      
            while (!success) {
              try {
                const response = await fetch(
                  `https://api.jikan.moe/v4/characters/${id}/full`
                );
                if (response.ok) {
                  const data = await response.json();
                  if (data && data.data && data.data.images) {
                    const favorites = data.data.favorites || 0;
                    let borderColorClass = "";
                    let rareza = "";
      
                    if (favorites < 51) {
                      borderColorClass = "border-comun";
                      rareza = "Comun";
                    } else if (favorites >= 51 && favorites <= 100) {
                      borderColorClass = "border-plata";
                      rareza = "Plata";
                    } else if (favorites >= 101 && favorites <= 200) {
                      borderColorClass = "border-oro";
                      rareza = "Oro";
                    } else if (favorites >= 201 && favorites <= 500) {
                      borderColorClass = "border-raro";
                      rareza = "Raro";
                    } else if (favorites >= 501 && favorites <= 1000) {
                      borderColorClass = "border-epico";
                      rareza = "epico";
                    } else if (favorites > 1000) {
                      borderColorClass = "border-mitico";
                      rareza = "Mitico";
                    }
      
                    data.data = { ...data.data, borderColorClass, rareza };
      
                    setCharacterData((prevData) => [...prevData, data.data]);
                    success = true;
                  } else {
                    console.error(
                      `No se encontraron imágenes para el ID ${id}`
                    );
                    success = true; // Considerar como éxito para salir del bucle
                  }
                } else if (response.status === 404) {
                  console.error(
                    `Error 404 - Recurso no encontrado para el ID ${id}`
                  );
                  id = getRandomNumberExcluding(
                    1,
                    2000,
                    [8, 9, 10, 578, 576]
                  );
                } else {
                  console.error(
                    `Error ${response.status} en la solicitud del ID ${id}`
                  );
                  id = getRandomNumberExcluding(
                    1,
                    2000,
                    [8, 9, 10, 578, 576]
                  );
                }
              } catch (error) {
                console.error(
                  `Error al procesar la solicitud del ID ${id}:`,
                  error
                );
                id = getRandomNumberExcluding(
                  1,
                  2000,
                  [8, 9, 10, 578, 576]
                );
              }
              await new Promise((resolve) => setTimeout(resolve, 200));
            }
          }
      
          setIsLoading(false);
          setButtonClickCount((prevCount) => prevCount + 1);
        } catch (error) {
          console.error("Error al obtener datos:", error);
          setIsLoading(false);
        }
      };
    return fetchCharacterData;
};

export default fetchCharacterData;
