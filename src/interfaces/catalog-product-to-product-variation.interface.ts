import { ICatalogShopToCatalogProductVariation } from "./catalog-shop-to-catalog-product-variation.interface";
import { ICatalogToProduct } from "./catalog-to-product.interface";
import { IProductVariation } from "./product-variation.interface";

export interface ICatalogProductToProductVariation {
  _id: string;

  price: number;

  deliveryPrice: number;

  takeAwayPrice: number;

  loyaltyPointOffered: number;

  disabled: boolean;

  catalogShopToCatalogProductVariations: ICatalogShopToCatalogProductVariation[];

  catalogProductId: string;

  catalogToProduct: ICatalogToProduct;

  productVariationId: string;

  productVariation: IProductVariation;
}