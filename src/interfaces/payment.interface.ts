
export enum PaymentType {
  CBL = 'cbl',
  CB = 'cb',
  ESPECES = 'especes',
  TR = 'tr',    // Ticket restaurant
  TRD = 'trd', // Carte ticket restaurant
  CHEQUE = 'cheque',
  HOLIDAY_CHEQUE = 'holiday_cheque',
  PLATFORM = 'platform',
  BILL = 'bill',
  OTHER = 'other',
}

export interface IPaymentMethod {
  _id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  specialType: PaymentType;
  negativeReturn: boolean;
  openCashRegister: boolean;
  authorizeCount: boolean;
  disabled: boolean;
  position: number;
}


export interface IPayment {
  method: IPaymentMethod;
  amount: number;
  quantity?: number;
}