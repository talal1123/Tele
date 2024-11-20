export const calculateBuyAmount = (inputAmount: number): number => {
  if (inputAmount < 5) return 0;
  return inputAmount * 0.95; // 5% fee
};

export const calculateSellAmount = (inputAmount: number, paymentMethod: string): number => {
  if (paymentMethod === 'cash') {
    if (inputAmount < 10) return 0;
    return inputAmount * 0.95; // 5% fee for cash
  } else {
    if (inputAmount < 50) return 0;
    return inputAmount * 0.93; // 7% fee for bank and transfer
  }
};