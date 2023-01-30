// Payin fees: 2.9% + S/1.00 or 3.9%
import { roundNumber2Two } from "./roundNumber2Two";

export const calculateComission = (amount: number): number => {
  /* if (amount < 50) {
    return parseFloat((amount * 0.029).toFixed(2));
  } */

  return roundNumber2Two(amount * 0.029) + 1;
};

// Payout fees: 0.25% + S/0.85 or 1.10%
export const payoutFees = (amount: number): number => {
  return roundNumber2Two(amount * 0.0025) + 0.85;
};
