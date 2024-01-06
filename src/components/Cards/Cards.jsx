"use client";

import { decrementRetryCountdown } from "@/helpers/Cards/decrementRetryCountdown";
import { getColorForRarity } from "@/helpers/Cards/getColorForRarity";
import { getInitialButtonClickCount } from "@/helpers/Cards/getInitialButtonClickCount";
import { getInitialCharacterData } from "@/helpers/Cards/getInitialCharacterData";
import { getInitialRetryCountdown } from "@/helpers/Cards/getInitialRetryCountdown";
import { getInitialShowRetryMessage } from "@/helpers/Cards/getInitialShowRetryMessage";
import { getRandomNumberExcluding } from "@/helpers/Cards/getRandomNumberExcluding";
import useCharacterSaver from "@/hooks/useCharacterSaver";
import React, { useState, useEffect } from "react";
import CharacterCard from "./CharacterCard";
import { SetEmail } from "@/helpers/SetEmail";
import '/public/css/cards.css';
import Footer from "../Layout/footer";

//declaración de estados
const Cards = () => {
  const [isClient, setIsClient] = useState(false);

  let Email = SetEmail();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [characterData, setCharacterData] = useState(
    isClient ? getInitialCharacterData() : []
  );

  const [isLoading, setIsLoading] = useState(false);

  const [showRetryMessage, setShowRetryMessage] = useState(() => {
    if (isClient) {
      if (typeof window !== "undefined") {
        const storedShowRetryMessage = JSON.parse(
          localStorage.getItem("showRetryMessage")
        );
        return storedShowRetryMessage !== null
          ? storedShowRetryMessage
          : getInitialShowRetryMessage();
      } else {
        return getInitialShowRetryMessage();
      }
    }
  });

  const [retryCountdown, setRetryCountdown] = useState(
    isClient
      ? parseInt(getInitialRetryCountdown()) || getInitialRetryCountdown()
      : getInitialRetryCountdown()
  );

  const [buttonClickCount, setButtonClickCount] = useState(() => {
    if (isClient) {
      const savedCount = parseInt(localStorage.getItem("buttonClickCount"), 10);
      return !isNaN(savedCount) ? savedCount : getInitialButtonClickCount();
    }
    return getInitialButtonClickCount();
  });

  //algoritmos para detectar trampas
  useEffect(() => {
    const checkLocalStorage = () => {
      const localStorageCleared = localStorage.getItem("trappedState");
      if (buttonClickCount >= 0 && buttonClickCount <= 7) {
        setButtonDisabled(false);
      }

      if (buttonClickCount >= 1 && buttonClickCount <= 7) {
        const savedCount = parseInt(
          localStorage.getItem("buttonClickCount"),
          10
        );

        if (
          buttonClickCount === 1 &&
          !localStorageCleared &&
          (isNaN(savedCount) || savedCount === 0)
        ) {
          sendReportOfficial(Email);
        }
        if (buttonClickCount === 1) {
          localStorage.removeItem("trappedState");
        }
      }
    };

    checkLocalStorage();
  }, [buttonClickCount]);
  //fin de algoritmos de detección de trampas

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [savedCardsCount, setSavedCardsCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likedCharacters, setLikedCharacters] = useState([]);
  const [remainingAttempts, setRemainingAttempts] = useState(0);
  const [existingCards, setExistingCards] = useState(() => {
    if (typeof window !== "undefined") {
      const storedExistingCards = JSON.parse(
        localStorage.getItem("existingCards")
      );
      return storedExistingCards || Array(5).fill(false);
    } else {
      return null;
    } // Asegúrate de que siempre sea un array de 5 elementos
  });

  useEffect(() => {
    setIsClient(true);
    setRemainingAttempts(8 - buttonClickCount);
  }, [isClient, buttonClickCount]);

  const { saveCharacter } = useCharacterSaver(
    characterData,
    likedCharacters,
    setCharacterData,
    setLikedCharacters,
    setSavedCardsCount
  );

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(
        "showRetryMessage",
        JSON.stringify(showRetryMessage)
      );
    }
  }, [isClient, showRetryMessage]);

  //fin de declaración de estados

  //logica para recuperar datos de characters
  useEffect(() => {
    // Intenta recuperar datos de personajes guardados del almacenamiento local
    const savedData = JSON.parse(localStorage.getItem("savedCharacterData"));
    if (savedData && Array.isArray(savedData) && savedData.length > 0) {
      setCharacterData(savedData);
    }
  }, []);

  useEffect(() => {
    let interval;

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [buttonClickCount, showRetryMessage]);

  useEffect(() => {
    localStorage.setItem("showRetryMessage", JSON.stringify(showRetryMessage));
  }, [showRetryMessage]);

  //logica de guardar cartas en local storage
  useEffect(() => {
    if (buttonClickCount > 0) {
      localStorage.setItem("savedCharacterData", JSON.stringify(characterData));
    }
  }, [buttonClickCount, characterData]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("savedCharacterData"));
    if (savedData && savedData.length > 0) {
      setCharacterData(savedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("buttonClickCount", buttonClickCount);
  }, [buttonClickCount]);

  // ...

  useEffect(() => {
    if (isClient) {
      const storedFutureTime = parseInt(localStorage.getItem("futureTime"), 10);

      if (buttonClickCount >= 8 && !storedFutureTime) {
        const futureTime = parseInt(Date.now() / 1000, 10) + 84; // 24 segundos en el futuro
        localStorage.setItem("futureTime", futureTime);
      }

      const interval = setInterval(() => {
        // Lógica para comprobar el tiempo actual
        checkTime();

        const storedFutureTime = parseInt(
          localStorage.getItem("futureTime"),
          10
        );

        if (storedFutureTime > retryCountdown) {
          setShowRetryMessage(true);
        } else if (storedFutureTime < retryCountdown) {
          setShowRetryMessage(false);
          // Eliminar elementos uno por uno
          localStorage.removeItem("futureTime");
          localStorage.removeItem("showRetryMessage");

          for (let i = 0; i < characterData.length; i++) {
            localStorage.removeItem(`characterData_${i}`);
          }

          localStorage.removeItem("buttonClickCount");
          localStorage.removeItem("savedCharacterData");
          localStorage.removeItem("savedCardsCount");
          localStorage.removeItem("liked");
          localStorage.removeItem("likedCharacters");

          localStorage.setItem("trappedState", true);
          window.location.reload();
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isClient, buttonClickCount, retryCountdown, characterData]);

  // ...

  const checkTime = () => {
    // Lógica para comprobar el tiempo en tiempo real
    const storedFutureTime = parseInt(localStorage.getItem("futureTime"), 10);

    if (storedFutureTime) {
      const currentTime = parseInt(Date.now() / 1000, 10);

      if (currentTime > storedFutureTime) {
        console.log("Tiempo actual es mayor que el tiempo futuro");
        setShowRetryMessage(false);
        // Eliminar elementos uno por uno
        localStorage.removeItem("futureTime");
        localStorage.removeItem("showRetryMessage");

        for (let i = 0; i < characterData.length; i++) {
          localStorage.removeItem(`characterData_${i}`);
        }

        localStorage.removeItem("buttonClickCount");
        localStorage.removeItem("savedCharacterData");
        localStorage.removeItem("savedCardsCount");
        localStorage.removeItem("liked");
        localStorage.removeItem("likedCharacters");

        localStorage.setItem("trappedState", true);
        window.location.reload();
      }
    }
  };

  function getColorForRarity(rareza) {
    switch (rareza.toLowerCase()) {
      case "comun":
        return "border-red-800"; // Color RGB(82, 4, 4)
      case "plata":
        return "border-gray-300";
      case "oro":
        return "border-yellow-500"; // Color #FFD700
      case "raro":
        return "border-green-500"; // Color #1ecf4d
      case "epico":
        return "border-indigo-600"; // Color #271ecf
      case "mitico":
        return "border-pink-500"; // Color RGB(255, 0, 242)
      default:
        return "border-blue-500"; // Color por defecto
    }
  }

  const fetchCharacterData = async () => {
    try {
      if (isLoading || buttonDisabled) return;
      setIsLoading(true);
      setCharacterData([]);

      if (buttonClickCount >= 8) {
        setShowRetryMessage(true);
        setButtonDisabled(true);
      }

      const randomNumbers = [];
      while (randomNumbers.length < 5) {
        const randomNumber = getRandomNumberExcluding(
          1,
          169000,
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
                data.data.favorites = calculateNewFavoritesValue(favorites);
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
                console.log(characterData);
                success = true;

                const existCardResponse = await fetch(
                  "https://api-rest-card-quest-dev-dxjt.3.us-1.fl0.io/api/cards/existCard",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: Email, content: data.data }),
                  }
                );

                const existCardData = await existCardResponse.json();

                if (existCardData.exists) {
                  setExistingCards((prevExistingCards) => {
                    // Asegúrate de que prevExistingCards sea un array
                    const updatedExistingCards = Array.isArray(
                      prevExistingCards
                    )
                      ? [...prevExistingCards]
                      : Array(5).fill(false); // Cambia 5 al tamaño deseado del array

                    updatedExistingCards[i] = true; // Marca la carta actual como existente
                    localStorage.setItem(
                      "existingCards",
                      JSON.stringify(updatedExistingCards)
                    );
                    return updatedExistingCards;
                  });
                  console.log(`La carta con ID ${id} ya existe.`);
                  continue;
                }
              } else {
                console.error(`No se encontraron imágenes para el ID ${id}`);
                success = true;
              }
            } else if (response.status === 404) {
              console.error(
                `Error 404 - Recurso no encontrado para el ID ${id}`
              );
              id = getRandomNumberExcluding(1, 2000, [8, 9, 10, 578, 576]);
            } else {
              console.error(
                `Error ${response.status} en la solicitud del ID ${id}`
              );
              id = getRandomNumberExcluding(1, 2000, [8, 9, 10, 578, 576]);
            }
          } catch (error) {
            console.error(
              `Error al procesar la solicitud del ID ${id}:`,
              error
            );
            id = getRandomNumberExcluding(1, 2000, [8, 9, 10, 578, 576]);
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
  function CleanArray() {
    setExistingCards(Array(5).fill(false));
    localStorage.removeItem(`existingCards`);
    for (let i = 0; i <= 5; i++) {
      localStorage.removeItem(`existingCard-${i}`);
    }
  }
  
  return (
    <>
    <div>
      <div className="text-center mt-3 bg-slate-700 text-white font-bold py-2 px-4 rounded">{`Intentos restantes: ${remainingAttempts}`}</div>
      <button
        className="btn float"
        onClick={() => {
          CleanArray();
          fetchCharacterData();
        }}
        disabled={buttonDisabled || (showRetryMessage && retryCountdown > 0)}
      >
        {"Cargar Cartas"}
      </button>

      {showRetryMessage && (
        <div className="bg-yellow-200 text-yellow-800 rounded-lg p-4 my-4">
          <p>{`Límite de intentos superados, regrese en 24 horas.`}</p>
        </div>
      )}

      {characterData.length > 0 && (
        <div className="flex car flex-wrap">
          {characterData.map((character, index) => (
            <CharacterCard
              key={index}
              character={character}
              index={index}
              getColorForRarity={getColorForRarity}
              saveCharacter={saveCharacter}
              existingCards={existingCards}
            />
            ))}
        </div>
      )}
       <button
      className="btn lanzarCards"
      onClick={fetchCharacterData}
      disabled={buttonDisabled || (showRetryMessage && retryCountdown > 0)}
    >
      {"Lanzar Cartas"}
    </button>
    <div className="text-center text-white px-4 rounded intentos">{`Intentos restantes: ${remainingAttempts}`}</div>
    </div>
    <Footer></Footer>
    </>

  );
};

export default Cards;

const sendReportOfficial = async (email) => {
  try {
    const formData = new URLSearchParams();
    formData.append("reporterEmail", email);

    const response = await fetch(
      "https://api-rest-card-quest-dev-dxjt.3.us-1.fl0.io/api/users/reportOfficial",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      }
    );
  } catch (error) {
    console.error("Error al realizar la petición POST:", error.message);
  }
};
