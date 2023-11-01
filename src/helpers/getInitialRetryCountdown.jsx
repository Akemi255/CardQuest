export const getInitialRetryCountdown = () => {
    if (typeof window !== 'undefined') {
      let storedValue = localStorage.getItem('retryCountdown');
      if (!storedValue) {
        storedValue = 24; // Valor por defecto si no hay ninguno en el localStorage
        localStorage.setItem('retryCountdown', storedValue);
      }
      return parseInt(storedValue, 10);
    }
    return 24;
  };
  