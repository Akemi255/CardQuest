import { getEmail } from "@/helpers/getEmail";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useCharacterSaver = (
  characterData,
  likedCharacters,
  setCharacterData,
  setLikedCharacters,
  setSavedCardsCount
) => {
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

        localStorage.setItem(
          `savedCard_${cardsInCurrentSet}`,
          JSON.stringify(character)
        );
        setSavedCardsCount(cardsInCurrentSet + 1);
        setLikedCharacters([...likedCharacters, character.name]);

        const updatedCharacterData = [...characterData];
        updatedCharacterData[index] = {
          ...updatedCharacterData[index],
          saved: true,
        };
        setCharacterData(updatedCharacterData);
       
        try {
          const [responseSaveCard, responseBoostCard] = await Promise.all([
            fetch("https://api-rest-card-quest.vercel.app/api/cards/saveCard", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: userEmail,
                content: character,
              }),
            }),
            fetch("https://cards-api-beryl.vercel.app/api/cards/boostCard", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                content: character,
              }),
            }),
          ]);

          // Verificar las respuestas de ambas solicitudes
          if (responseSaveCard.ok && responseBoostCard.ok) {
            toast.success("Carta guardada exitosamente");
          } else {
            toast.error("Error en una o ambas solicitudes al backend.");
          }
        } catch (error) {
          toast.error("Error al enviar las cartas al backend");
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