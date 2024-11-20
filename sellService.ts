import emailjs from '@emailjs/browser';
import { config } from '../utils/config';
import type { SellOrder } from '../types/orders';

const MINIMUM_SELL_AMOUNTS = {
  cash: 10,
  bank: 50,
  transfer: 50,
};

const SELL_FEE_PERCENTAGES = {
  cash: 0.05, // 5%
  bank: 0.07, // 7%
  transfer: 0.07, // 7%
};

export const calculateSellAmount = (amount: number, paymentMethod: string): number => {
  const minAmount = MINIMUM_SELL_AMOUNTS[paymentMethod as keyof typeof MINIMUM_SELL_AMOUNTS];
  if (amount < minAmount) return 0;
  
  const feePercentage = SELL_FEE_PERCENTAGES[paymentMethod as keyof typeof SELL_FEE_PERCENTAGES];
  return amount * (1 - feePercentage);
};

export const validateSellOrder = (amount: number, paymentMethod: string): string | null => {
  const minAmount = MINIMUM_SELL_AMOUNTS[paymentMethod as keyof typeof MINIMUM_SELL_AMOUNTS];
  if (amount < minAmount) {
    return `Minimum amount for ${paymentMethod} is ${minAmount} USDT`;
  }
  return null;
};

export const submitSellOrder = async (data: SellOrder): Promise<void> => {
  try {
    const error = validateSellOrder(parseFloat(data.amount), data.paymentMethod);
    if (error) throw new Error(error);

    let paymentDetails = '';
    
    if (data.paymentMethod === 'bank' && data.bankInfo) {
      paymentDetails = `
Bank Details:
- Country: ${data.bankInfo.country}
- Bank: ${data.bankInfo.bankName}
- Account: ${data.bankInfo.accountNumber}
- Name: ${data.bankInfo.fullName}
- Address: ${data.bankInfo.address}`;
    }
    else if (data.paymentMethod === 'transfer' && data.transferInfo) {
      paymentDetails = `
Transfer Details:
- Country: ${data.transferInfo.country}
- Company: ${data.transferInfo.company}
- Name: ${data.transferInfo.fullName}
- Phone: ${data.transferInfo.phoneNumber}
- Address: ${data.transferInfo.address}`;
    }
    else if (data.paymentMethod === 'cash' && data.cashInfo) {
      paymentDetails = `
Cash Details:
- Country: ${data.cashInfo.country}
- Provider: ${data.cashInfo.provider}
- Name: ${data.cashInfo.fullName}
- Phone: ${data.cashInfo.phoneNumber}
- Address: ${data.cashInfo.address}`;
    }

    const templateVars = {
      operation_type: 'Sell USDT',
      amount: data.amount,
      wallet_address: data.walletAddress,
      network_type: data.network,
      payment_method: data.paymentMethod,
      payment_details: paymentDetails,
    };

    const response = await emailjs.send(
      config.emailjs.serviceId,
      config.emailjs.templateId,
      templateVars,
      config.emailjs.publicKey
    );

    if (response.status !== 200) {
      throw new Error('Failed to submit sell order');
    }
  } catch (error) {
    console.error('Sell Order Error:', error);
    throw new Error('Failed to submit sell request. Please try again or contact support on Telegram.');
  }
};