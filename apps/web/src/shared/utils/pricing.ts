// The comission is 2.9% + S/1.00, if the sale is less than S/50.00, the comission is only 2.9%

export const calculateComission = (amount: number) => {
  if (amount < 50) {
    return amount * 0.029;
  }

  return amount * 0.029 + 1;
};
