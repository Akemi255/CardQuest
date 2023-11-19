export const getInitialButtonClickCount = () => {
    if (typeof window !== 'undefined') {
      const initialCount = parseInt(localStorage.getItem('buttonClickCount'), 10) || 0;
      return initialCount;
    } else {
      return 0;
    }
  };