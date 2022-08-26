export const randomNumber = (
  min: number,
  max: number,
  integer = true
): number => {
  if (integer) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } 
    return Math.random() * (max - min) + min;
  
};

export const getRandomNumber = randomNumber;

export default randomNumber;
