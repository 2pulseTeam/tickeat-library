import { ICatalogShopToCatalogPack } from "./catalog-shop-to-catalog-pack.interface";
import { ICatalog } from "./catalog.interface";

export interface ICatalogToPack {
  _id: string;

  disabled: boolean;

  price: number;

  catalogShopToCatalogPacks: ICatalogShopToCatalogPack[];

  deliveryPrice: number;

  takeAwayPrice: number;

  loyaltyPointOffered: number;

  catalogId: string;

  packId: string;

  catalog: ICatalog;

}