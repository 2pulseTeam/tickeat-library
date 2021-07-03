import { ICatalogShop } from "./catalog-shop.interface";
import { ICatalogToPack } from "./catalog-to-pack.interface";

export interface ICatalogShopToCatalogPack {
  _id: string;

  disabled: boolean;

  price: number;

  deliveryPrice: number;

  takeAwayPrice: number;

  loyaltyPointOffered: number;

  catalogShopId: string;

  catalogPackId: string;

  catalogShop: ICatalogShop;

  catalogToPack: ICatalogToPack;
}