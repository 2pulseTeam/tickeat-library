import { ICatalogShopToCatalogProductVariation } from "./catalog-shop-to-catalog-product-variation.interface";
import { ICatalogShop } from "./catalog-shop.interface";
import { ICatalogToProduct } from "./catalog-to-product.interface";

export interface ICatalogShopToCatalogProduct {
  _id: string;

  disabled: boolean;

  catalogShopId: string;

  catalogProductId: string;

  catalogShop: ICatalogShop;

  catalogToProduct: ICatalogToProduct;

  catalogShopToCatalogProductVariations: ICatalogShopToCatalogProductVariation[];
}