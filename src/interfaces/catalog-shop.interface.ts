import { IBase } from "./base.interface";
import { ICatalogShopToCatalogPack } from "./catalog-shop-to-catalog-pack.interface";
import { ICatalogShopToCatalogProduct } from "./catalog-shop-to-catalog-product.interface";
import { ICatalog } from "./catalog.interface";

export interface ICatalogShop extends IBase<string> {
  catalogId: string;

  catalog: ICatalog;

  shopId: string;

  catalogShopToCatalogPacks: ICatalogShopToCatalogPack[];

  catalogShopToCatalogProducts: ICatalogShopToCatalogProduct[];
}