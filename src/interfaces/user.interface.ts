import { IBase } from './base.interface';
import { IShop } from './shop.interface';

export interface IUser extends IBase<string> {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  organization: string;
  role: string;
  phone: string;
  code: string;
  shops: Array<Pick<IShop, '_id'>>;

  createdAt: any;
  updatedAt: any;
}
