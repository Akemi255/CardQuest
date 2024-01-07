export const getRandomNumberExcluding = (min, max, exclude = []) => {
  let num;
  do {
    num = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (exclude.length > 0 && exclude.includes(num));
  return num;
};
