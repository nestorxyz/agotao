// The comission is 2.9% + S/1.00, if the sale is less than S/50.00, the comission is only 2.9%

export const calculateComission = (amount: number): number => {
  /* if (amount < 50) {
    return parseFloat((amount * 0.029).toFixed(2));
  } */

  return parseFloat((amount * 0.029).toFixed(2)) + 1;
};
