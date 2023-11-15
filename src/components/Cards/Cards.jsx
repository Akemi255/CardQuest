"use client";

import { decrementRetryCountdown } from "@/helpers/decrementRetryCountdown";
import { getColorForRarity } from "@/helpers/getColorForRarity";
import { getInitialButtonClickCount } from "@/helpers/getInitialButtonClickCount";
import { getInitialCharacterData } from "@/helpers/getInitialCharacterData";
import { getInitialRetryCountdown } from "@/helpers/getInitialRetryCountdown";
import { getInitialShowRetryMessage } from "@/helpers/getInitialShowRetryMessage";
import { getRandomNumberExcluding } from "@/helpers/getRandomNumberExcluding";
import useCharacterSaver from "@/hooks/useCharacterSaver";
import React, { useState, useEffect } from "react";
import CharacterCard from "./CharacterCard";

//declaración de estados
const Cards = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [characterData, setCharacterData] = useState(
    isClient ? getInitialCharacterData() : []
  );

  const [isLoading, setIsLoading] = useState(false);

  const [showRetryMessage, setShowRetryMessage] = useState(
    isClient ? getInitialShowRetryMessage() : false
  );

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

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [savedCardsCount, setSavedCardsCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likedCharacters, setLikedCharacters] = useState([]);
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



  

      















  useEffect(() => {
    if (isClient) {
      const storedFutureTime = parseInt(localStorage.getItem('futureTime'), 10);
      if (buttonClickCount >= 8 && !storedFutureTime) {
        const futureTime = parseInt(Date.now() / 1000, 10) + 84; // 24 segundos en el futuro
        localStorage.setItem('futureTime', futureTime);
      }
      
      const interval = setInterval(() => {
      

        const storedFutureTime = parseInt(localStorage.getItem('futureTime'), 10);
        
        if (storedFutureTime > retryCountdown) {
          setShowRetryMessage(true);
        } else if (storedFutureTime < retryCountdown){
          setShowRetryMessage(false);
          localStorage.clear();
          window.location.reload()
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isClient, buttonClickCount]);














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

  return (
    <div>
      <button
        className="btn float"
        onClick={fetchCharacterData}
        disabled={showRetryMessage && retryCountdown > 0}
      >
        {"Cargar Cartas"}
      </button>

      {showRetryMessage && (
        <div className="bg-yellow-200 text-yellow-800 rounded-lg p-4 my-4">
          <p>{`Límite de intentos superados, regrese en 24 horas.`}</p>
        </div>
      )}

      {characterData.length > 0 && (
        <div className="flex flex-wrap">
          {characterData.map((character, index) => (
            <CharacterCard
              key={index}
              character={character}
              index={index}
              getColorForRarity={getColorForRarity}
              saveCharacter={saveCharacter}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cards;