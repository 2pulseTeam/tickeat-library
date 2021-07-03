import { IBase } from "./base.interface";
import { IAddress } from "./address.interface";

export interface ICustomer extends IBase<string>  {
  lastname: string;

  firstname: string;

  email: string;

  password: string;

  phone: string;

  birthday: Date;

  optInEmail: boolean;

  optInSMS: boolean;

  informations: string;

  lastLogin: Date;

  registeredFrom: string;

  addresses: IAddress[];
}
