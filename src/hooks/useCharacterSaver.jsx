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
        
       
        localStorage.setItem(`savedCard_${cardsInCurrentSet}`, JSON.stringify(character));
        setSavedCardsCount(cardsInCurrentSet + 1);
        setLikedCharacters([...likedCharacters, character.name]);

        const updatedCharacterData = [...characterData];
        updatedCharacterData[index] = {
          ...updatedCharacterData[index],
          saved: true,
        };
        setCharacterData(updatedCharacterData);
     
         // Enviar la carta al backend
    try {
      const response = await fetch('https://api-rest-card-quest-dev-dxjt.3.us-1.fl0.io/api/cards/saveCard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          content: character,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (response.status === 202) {
          // La carta ya existe, muestra un toast.error específico
          toast.success(`La carta ya la tienes, se ha guardado su valor en monedas en tu perfil:`);
        } else {
          // La carta se guardó exitosamente
          toast.success('Carta guardada exitosamente');
        }
      } else {
        toast.error('Error al guardar la carta en el backend.');
      }
    } catch (error) {
      toast.error('Error al enviar la carta al backend:', error);
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