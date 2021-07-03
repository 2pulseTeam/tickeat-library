import { IBase } from "./base.interface";
import { ICatalogShop } from "./catalog-shop.interface";
import { ICatalogToPack } from "./catalog-to-pack.interface";
import { ICatalogToProduct } from "./catalog-to-product.interface";
import { ICatalogToTag } from "./catalog-to-tag.interface";
import { IPlatform } from "./platform.interface";
import { IPromotion } from "./promotion.interface";

export interface ICatalog extends IBase<string> {
  name: string;

  startDate: Date;

  endDate: Date;

  platforms: IPlatform[];

  promotions: IPromotion[];

  catalogToTags: ICatalogToTag[];

  catalogToShops: ICatalogShop[];

  catalogToPacks: ICatalogToPack[];

  catalogToProducts: ICatalogToProduct[];
}