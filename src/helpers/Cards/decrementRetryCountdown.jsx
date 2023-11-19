export const decrementRetryCountdown = () => {
    if (retryCountdown > 0) {
      setRetryCountdown((prevCount) => prevCount - 1);
    } else if (retryCountdown === 0) {
      setRetryCountdown(24);
    }
  };