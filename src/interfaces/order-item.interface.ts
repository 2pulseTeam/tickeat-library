import { IOrderPack } from "./order-pack.interface";
import { IOrderProduct } from "./order-product.interface";

export interface IOrderItem {
  type: ItemType;
  item?: IOrderProduct | IOrderPack;
}

export enum ItemType {
  PRODUCT = 'product',
  PACK = 'pack',
}