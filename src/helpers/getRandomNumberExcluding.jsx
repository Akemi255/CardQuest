export const getRandomNumberExcluding = (min, max, exclude) => {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    while (exclude.includes(num)) {
      num = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return num;
  };