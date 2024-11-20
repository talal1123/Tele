import emailjs from '@emailjs/browser';
import { config } from '../utils/config';
import type { BuyOrder } from '../types/orders';

const MINIMUM_BUY_AMOUNT = 5;
const BUY_FEE_PERCENTAGE = 0.05; // 5%

export const calculateBuyAmount = (amount: number): number => {
  if (amount < MINIMUM_BUY_AMOUNT) return 0;
  return amount * (1 - BUY_FEE_PERCENTAGE);
};

export const validateBuyOrder = (amount: number): string | null => {
  if (amount < MINIMUM_BUY_AMOUNT) {
    return `Minimum amount is ${MINIMUM_BUY_AMOUNT} USDT`;
  }
  return null;
};

export const submitBuyOrder = async (data: BuyOrder): Promise<void> => {
  try {
    const error = validateBuyOrder(parseFloat(data.amount));
    if (error) throw new Error(error);

    const templateVars = {
      operation_type: 'Buy USDT',
      amount: data.amount,
      wallet_address: data.walletAddress,
      network_type: data.network,
      customer_email: data.email,
      payment_method: 'PayPal',
    };

    const response = await emailjs.send(
      config.emailjs.serviceId,
      config.emailjs.templateId,
      templateVars,
      config.emailjs.publicKey
    );

    if (response.status !== 200) {
      throw new Error('Failed to submit buy order');
    }
  } catch (error) {
    console.error('Buy Order Error:', error);
    throw new Error('Failed to submit buy request. Please try again or contact support on Telegram.');
  }
};