import { IBase } from './base.interface';
import { IDeliveryZone } from './delivery-zone.interface';
import { IPrinter } from './printer.interface';
import { ISchedule } from './schedule.interface';

export interface IShop extends IBase<string> {
  internalName: string;

  slug: string;

  siret: string;

  publicName: string;

  disabled: boolean;

  description: string;

  address: string;

  location: {
    coordinates: number[];
    type: 'Point';
  };

  phone: string;

  email: string;

  website: string;

  // brands: string[] | IBrand[];

  schedule: ISchedule;

  deliveryZones: IDeliveryZone[];

  takeAwayTime: number;

  deliveryTime: number;

  printers: IPrinter[];
}

export type IShopDocument = IShop & Document;