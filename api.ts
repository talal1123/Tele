import emailjs from '@emailjs/browser';
import type { FormData } from '../types';

const SERVICE_ID = 'service_telepayz';
const TEMPLATE_ID = 'template_telepayz';
const PUBLIC_KEY = 'IwArHCIAEhYY7x1bH';

export const submitExchangeRequest = async (data: FormData): Promise<void> => {
  try {
    const templateVars = {
      operation_type: data.operation === 'buy' ? 'Buy USDT' : 'Sell USDT',
      amount: data.amount,
      wallet_address: data.walletAddress,
      network_type: data.network,
      customer_email: data.email || '',
      payment_method: data.paymentMethod || '',
      payment_details: '',
    };

    // Add payment details for sell operations
    if (data.operation === 'sell' && data.paymentMethod) {
      if (data.bankInfo) {
        templateVars.payment_details = `
Bank Details:
- Country: ${data.bankInfo.country}
- Bank: ${data.bankInfo.bankName}
- Account: ${data.bankInfo.accountNumber}
- Name: ${data.bankInfo.fullName}
- Address: ${data.bankInfo.address}`;
      }
      else if (data.transferInfo) {
        templateVars.payment_details = `
Transfer Details:
- Country: ${data.transferInfo.country}
- Company: ${data.transferInfo.company}
- Name: ${data.transferInfo.fullName}
- Phone: ${data.transferInfo.phoneNumber}
- Address: ${data.transferInfo.address}`;
      }
      else if (data.cashInfo) {
        templateVars.payment_details = `
Cash Details:
- Country: ${data.cashInfo.country}
- Provider: ${data.cashInfo.provider}
- Name: ${data.cashInfo.fullName}
- Phone: ${data.cashInfo.phoneNumber}`;
      }
    }
    
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateVars,
      PUBLIC_KEY
    );

    if (response.status !== 200) {
      throw new Error('Failed to submit form');
    }
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw new Error('Failed to submit request. Please try again or contact support on Telegram.');
  }
};