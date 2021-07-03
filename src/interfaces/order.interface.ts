import { IAccountCode } from "./account-code.interface";
import { IAddress } from "./address.interface";
import { ICatalog } from "./catalog.interface";
import { ICustomer } from "./customer.interface";
import { IDeliveryZone } from "./delivery-zone.interface";
import { IDeliveryMan } from "./delivery.interface";
import { OrderChannel, OrderMode, OrderStatus } from "./order-enums.interface";
import { IOrderItem } from "./order-item.interface";
import { IPayment, IPaymentMethod } from "./payment.interface";
import { IOrderPromotion } from "./promotion.interface";
import { IShop } from "./shop.interface";
import { ITax } from "./tax.interface";

export type IOrderDeliveryZone = IDeliveryZone;
export type IOrderAddress = IAddress;
export type IOrderCustomer = Pick<ICustomer, '_id' | 'email' | 'firstname' | 'lastname' | 'informations' | 'phone' | 'birthday'> & {address?: IAddress, isNewCustomer?: boolean};
export type IOrderShop = Pick<IShop, '_id' | 'publicName' | 'internalName'>;
export type IOrderDeliveryMan = Pick<IDeliveryMan, '_id' | 'firstname' | 'lastname' | 'transport' | 'departureAt'>;

export interface IOrderDiscount {
  type: DiscountType;
  amount: number;
}

export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
}

export interface IOrderTaxes {
  rate: number;
  tvaAmount: number;
  htAmount: number;
  ttcAmount: number;
}

export interface IOrderAccountCodes {
  accountCode: IAccountCode;
  tvaAmount: number;
  htAmount: number;
  ttcAmount: number;
}

export interface IOrder {
  // L'identifiant de la commande sur l'engine
  _id?: string;
  // L'identifiant de la commande créé par l'application
  appId: string;
  // Le numero de la commande dans le service en cours (ex: 001)
  serviceId: string;
  mode: OrderMode;
  customer?: IOrderCustomer;

  deliveryZone?: IOrderDeliveryZone;

  address?: IOrderAddress;

  dueDate: string;
  channel: OrderChannel;

  shop: IOrderShop;
  catalog: Pick<ICatalog, '_id'>;

  createdAt: string;
  updatedAt: string;

  items: IOrderItem[];

  deliveryMan: IOrderDeliveryMan;

  status: OrderStatus;

  promotions: IOrderPromotion[];

  discounts: IOrderDiscount[];

  total: number;
  payments: IPayment[];
  taxes: ITax[];
}