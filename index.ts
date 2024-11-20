export type PaymentMethod = 'bank' | 'transfer' | 'cash';

export interface BankInfo {
  accountNumber: string;
  fullName: string;
  bankName: string;
  address: string;
}

export interface TransferInfo {
  company: string;
  fullName: string;
  phoneNumber: string;
  address: string;
}

export interface CashInfo {
  provider: string;
  phoneNumber: string;
  fullName: string;
}

export interface FormData {
  operation: 'buy' | 'sell';
  amount: string;
  paymentMethod?: PaymentMethod;
  network?: 'trc20' | 'bep20';
  walletAddress?: string;
  email?: string;
  bankInfo?: BankInfo;
  transferInfo?: TransferInfo;
  cashInfo?: CashInfo;
}