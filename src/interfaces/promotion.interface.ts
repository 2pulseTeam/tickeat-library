import { ICatalog } from "./catalog.interface";
import { OrderMode } from "./order-enums.interface";
import { IOrderProductVariation } from "./order-product.interface";
import { ITag } from "./tag.interface";

export interface IOrderPromotion extends IPromotion {
  computedDiscount?: number;

  discountedProductVariation?: Pick<IOrderProductVariation, '_id' | 'taxId' | 'deliveryTaxId' | 'takeAwayTaxId'>;

  // appliedOnItems?: {type: ItemType, item: {productVariation: Pick<IOrderProductVariation, '_id' | 'taxId' | 'deliveryTaxId' | 'takeAwayTaxId'>}}[];
}

export interface IPromotion {

  _id: string;
  createdAt: string;
  updatedAt: string;

  name: string;

  tags: ITag[];

  type: PromotionTypes;

  code?: string;

  discountMode?: PromotionDiscountModes;

  discountValue?: number;

  imageUrl?: string;

  description: string;

  disabled: boolean;

  catalog?: Pick<ICatalog, '_id'>;

  minPrice?: number;

  uniqueByCustomer?: boolean;

  firstOrderOnly?: boolean;

  maxUses?: number;

  orderModes?: OrderMode[];

  discountableProductVariationsIds?: string[];

  // Le nombre de produit a avoir (pour X produits achetés)
  neededCount?: number;

  // Le nombre de produit offerts (Y produits offers)
  offeredCount?: number;

  cumulative?: boolean;

  startDate?: Date;

  endDate?: Date;

}

export enum PromotionTypes {
  LEAST_EXPENSIVE = 'LEAST_EXPENSIVE',
  CODE = 'CODE'
}

export enum PromotionDiscountModes {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED'
}