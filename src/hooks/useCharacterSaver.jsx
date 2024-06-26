import { getEmail } from "@/helpers/getEmail";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useCharacterSaver = (
  characterData,
  likedCharacters,
  setCharacterData,
  setLikedCharacters,
  setSavedCardsCount,
  setLoading,
  loading
) => {
  const saveCharacter = async (character, index) => {
    setLoading(true);
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
            fetch(
              "https://api-rest-card-quest.vercel.app/api/apiCards/boostCard",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  content: character,
                }),
              }
            ),
          ]);

          // Verificar las respuestas de ambas solicitudes
          if (responseSaveCard.ok && responseBoostCard.ok) {
            const saveCardResponseData = await responseSaveCard.json();
            const boostCardResponseData = await responseBoostCard.json();

            if (saveCardResponseData.status === 202) {
              toast.success(
                `Ya tienes esta carta recibirás su valor en monedas. Monedas ganadas: ${boostCardResponseData.newCoinsValue}`
              );
            } else {
              toast.success("Carta guardada exitosamente");
            }

            // Obtener el nuevo valor en monedas de la carta desde la respuesta de boostCard
            const newCoinsValue = boostCardResponseData.newCoinsValue;

            // Actualizar localmente el valor en monedas de la carta
            const updatedCharacterData = [...characterData];
            updatedCharacterData[index] = {
              ...updatedCharacterData[index],
              monedas: newCoinsValue, // Ajustar a la propiedad correcta
              saved: true,
            };
            setCharacterData(updatedCharacterData);
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
    setLoading(false);
  };

  return { saveCharacter };
};

export default useCharacterSaver;
