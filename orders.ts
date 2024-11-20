export type PaymentMethod = 'bank' | 'transfer' | 'cash';

export interface BuyOrder {
  amount: string;
  network: 'trc20' | 'bep20';
  walletAddress: string;
  email: string;
}

export interface BankInfo {
  country?: string;
  accountNumber?: string;
  fullName?: string;
  bankName?: string;
  address?: string;
}

export interface TransferInfo {
  country?: string;
  company?: string;
  fullName?: string;
  phoneNumber?: string;
  address?: string;
}

export interface CashInfo {
  country?: string;
  provider?: string;
  phoneNumber?: string;
  fullName?: string;
  address?: string;
}

export interface SellOrder {
  amount: string;
  network: 'trc20' | 'bep20';
  walletAddress: string;
  paymentMethod: PaymentMethod;
  bankInfo?: BankInfo;
  transferInfo?: TransferInfo;
  cashInfo?: CashInfo;
}