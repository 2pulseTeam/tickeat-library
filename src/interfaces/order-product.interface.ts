import { IVariation } from "./variation.interface";



export interface IOrderOption {
  _id: string;
  name: string;
  disabled?: boolean;
  mandatory?: boolean;
  freeQuantity?: number;
  maxChoiceCount?: number;
  products: IOrderOptionProduct[];
}

export interface IOrderProductVariation {
  _id: string;
  name: string;
  imageUrl?: string;
  kitchenName: string;

  price: number;
  taxId: string;

  deliveryPrice: number;
  deliveryTaxId: string;

  takeAwayPrice: number;
  takeAwayTaxId: string;

  loyaltyPointOffered: number;

  disabled?: boolean;

  productId: string;

  variation?: Pick<IVariation, '_id'>;
  variationId: string;

  accountCodeId: string;
}

export interface IOrderProduct {
  _id: string;
  name: string;

  tagsIds: string[];

  imageUrl: string;

  quantity: number;
  disabled?: boolean;

  productVariation: IOrderProductVariation;

  options?: IOrderOption[];

}

export interface IOrderOptionProduct {
  _id: string;
  name: string;

  tagsIds: string[];

  imageUrl: string;

  quantity: number;

  productVariation: IOrderProductVariation;
}