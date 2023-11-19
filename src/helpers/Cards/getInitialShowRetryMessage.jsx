

export const getInitialShowRetryMessage = () => {
    if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem('showRetryMessage');
        return storedValue ? JSON.parse(storedValue) : false;
      }
      return false;
    };
  