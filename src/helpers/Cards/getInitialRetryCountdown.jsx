export const getInitialRetryCountdown = () => {
  if (typeof window !== 'undefined') {
    const now = parseInt(Date.now() / 1000, 10); // Obtiene el tiempo actual en milisegundos
    const storedValue = localStorage.getItem('retryCountdown');
    
    if (!storedValue) {
      const initialRetryCountdown = parseInt(Date.now() / 1000, 10);// Convierte milisegundos a segundos (número entero)
      
      return initialRetryCountdown;
    }

    return now;
  }

  return 24; // Valor por defecto si no es posible obtener la hora actual
};
