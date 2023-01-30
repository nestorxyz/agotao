export const roundNumber2Two = (number: number): number => {
  return Math.round((number + Number.EPSILON) * 100) / 100;
};

// Example usage:
// import { roundNumber2Two } from "utils/roundNumber2Two";
//
// const roundedNumber = roundNumber2Two(1.2345);
// console.log(roundedNumber); // 1.23
