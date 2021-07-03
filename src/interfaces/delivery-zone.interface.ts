import { ISchedule } from "./schedule.interface";

export interface IDeliveryZone {
  _id: string;

  name: string;

  location: {
    type: 'Polygon',
    coordinates: number[][][];
  };

  schedule: ISchedule;

  deliveryTime: number;

  deliveryFee: number;

  minPrice: number;

  disabled: boolean;

  createdAt: any;
  updatedAt: any;
}
