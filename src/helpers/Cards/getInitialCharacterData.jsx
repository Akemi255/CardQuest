export const getInitialCharacterData = () => {
    if (typeof window !== 'undefined') {
      const initialData = JSON.parse(localStorage.getItem('savedCharacterData')) || [];
      return initialData;
    } else {
      return [];
    }
  };
