import { IBase } from "./base.interface";

export interface IAddress extends IBase<string> {
  name: string;

  street: string;

  streetNum: string;

  postalCode: string;

  city: string;

  formattedAddress: string;

  deliveryZoneId: string;

  shopId: string;

  location: {
    coordinates: number[];
    type: 'Point';
  };

  door: string;

  floor: string;

  building: string;

  buildingCode: string;

  intercom: string;

  informations: string;

  region: string;
}

