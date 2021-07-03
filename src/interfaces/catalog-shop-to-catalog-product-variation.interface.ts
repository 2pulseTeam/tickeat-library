import { ICatalogProductToProductVariation } from "./catalog-product-to-product-variation.interface";
import { ICatalogShopToCatalogProduct } from "./catalog-shop-to-catalog-product.interface";

export interface ICatalogShopToCatalogProductVariation {
  _id: string;

  price: number;

  deliveryPrice: number;

  takeAwayPrice: number;

  loyaltyPointOffered: number;

  disabled: boolean;

  catalogShopToCatalogProductId: string;

  catalogProductToProductVariationId: string;

  catalogShopToCatalogProduct: ICatalogShopToCatalogProduct;

  catalogProductToProductVariation: ICatalogProductToProductVariation;
}