export enum PrinterTypes {

  CASH_REGISTER = 'cash_register',
  DELIVERY = 'delivery',
  COOK = 'cook',
}

export enum PrinterConnexion {
  ETHERNET = 'ethernet',
  // USB = 'usb',
}

export interface IPrinter {
  _id: string;
  appId: string;

  type: PrinterTypes;
  connexion: PrinterConnexion;

  name: string;
  ip: string;

  createdAt: string;
  updatedAt: string;
}
