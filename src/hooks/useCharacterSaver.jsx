import { getEmail } from "@/helpers/getEmail";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useCharacterSaver = (characterData, likedCharacters, setCharacterData, setLikedCharacters, setSavedCardsCount) => {
  const saveCharacter = async (character, index) => {
    let cardsInCurrentSet = 0;

    for (const char of characterData) {
      if (char.saved) {
        cardsInCurrentSet++;
      }
    }

    if (cardsInCurrentSet % 5 === 0) {
      setLikedCharacters([]); // Reiniciar la lista de personajes guardados
    }

    const cardsSavedInCurrentSet = cardsInCurrentSet % 5;

    if (cardsSavedInCurrentSet < 1) {
      if (!likedCharacters.includes(character.name)) {

        const userEmail = getEmail();
        console.log(userEmail);
        console.log("hola"); 
       
        localStorage.setItem(`savedCard_${cardsInCurrentSet}`, JSON.stringify(character));
        setSavedCardsCount(cardsInCurrentSet + 1);
        setLikedCharacters([...likedCharacters, character.name]);

        const updatedCharacterData = [...characterData];
        updatedCharacterData[index] = {
          ...updatedCharacterData[index],
          saved: true,
        };
        setCharacterData(updatedCharacterData);
        console.log(character);
        // Enviar la carta al backend
        try {
          const response = await fetch('https://api-rest-card-quest-dev-dxjt.3.us-1.fl0.io/api/cards/saveCard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Cambiado a JSON
          },
          body: JSON.stringify({
            email: userEmail, // Reemplaza con la lógica para obtener el email del usuario
            content: character, // Utiliza el objeto character directamente
          }),
        });

          if (response.ok) {
            toast.success('Carta guardada exitosamente');
          } else {
            console.error('Error al guardar la carta en el backend.');
          }
        } catch (error) {
          console.error('Error al enviar la carta al backend:', error);
        }
      } else {
        toast.error("Este personaje ya ha sido guardado.");
      }
    } else {
      toast.error("Solo puedes guardar una carta por cada conjunto de cinco.");
    }
  };

  return { saveCharacter };
};

export default useCharacterSaver;