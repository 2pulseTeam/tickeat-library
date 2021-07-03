import { ICatalogProductToProductVariation } from "./catalog-product-to-product-variation.interface";
import { ICatalogShopToCatalogProduct } from "./catalog-shop-to-catalog-product.interface";
import { ICatalog } from "./catalog.interface";

export interface ICatalogToProduct {
  _id: string;

  disabled: boolean;

  catalogShopToCatalogProducts: ICatalogShopToCatalogProduct[];

  catalogId: string;

  catalog: ICatalog;

  productId: string;

  catalogProductToProductVariations: ICatalogProductToProductVariation[];
}