
const useCharacterSaver = (characterData, likedCharacters, setCharacterData, setLikedCharacters, setSavedCardsCount) => {
  const saveCharacter = (character, index) => {
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
        localStorage.setItem(`savedCard_${cardsInCurrentSet}`, JSON.stringify(character));
        setSavedCardsCount(cardsInCurrentSet + 1);
        setLikedCharacters([...likedCharacters, character.name]);

        const updatedCharacterData = [...characterData];
        updatedCharacterData[index] = {
          ...updatedCharacterData[index],
          saved: true,
        };
        setCharacterData(updatedCharacterData);
      } else {
        alert("Este personaje ya ha sido guardado.");
      }
    } else {
      alert("Solo puedes guardar una carta por cada conjunto de cinco.");
    }
  };

  return { saveCharacter };
};

export default useCharacterSaver;
