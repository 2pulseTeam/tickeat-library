import { IUser } from "./user.interface";

export enum TransportMode {
  BIKE = 'BIKE',
  CAR = 'CAR',
  SCOOTER_50_CM3 = 'SCOOTER_50_CM3',
  SCOOTER_125_CM3 = 'SCOOTER_125_CM3',
}

export function getTransportModeTraduction(transport: TransportMode) {
  switch (transport) {
    case TransportMode.BIKE:
      return 'Vélo';
    case TransportMode.CAR:
      return 'Voiture';
    case TransportMode.SCOOTER_50_CM3:
      return 'Scooter 50cm3';
    case TransportMode.SCOOTER_125_CM3:
      return 'Scooter 125cm3';
  }
}

export enum DeliveryFilter {
  DISPATCHED = "DISPATCHED",
  LATE = "LATE",
  NOT_DISPATCHED = "NOT_DISPATCHED",
  DELIVERED = "DELIVERED",
}

export interface IDeliveryMan extends Pick<IUser, '_id' | 'firstname' | 'lastname'> {
  transport: TransportMode;
  inDelivery: boolean;

  departureAt: any;
  updatedAt: any;
}

export const isDeliveryMan = (object: IDeliveryMan | IUser): object is IDeliveryMan => {
  return 'inDelivery' in object;
}

export enum DeliveryStep {
  MAIN = 'MAIN',
  LIST_DELIVERY_MEN = 'LIST_DELIVERY_MEN',
  TRANSPORT_DELIVERY_MAN = 'TRANSPORT_DELIVERY_MAN',
  ORDERS_SELECTED = 'ORDERS_SELECTED',
  AVAILABLE_DELIVERY_MEN = 'AVAILABLE_DELIVERY_MEN',
}
