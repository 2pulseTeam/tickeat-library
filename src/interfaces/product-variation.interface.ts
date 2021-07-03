import { IAccountCode } from "./account-code.interface";
import { IBase } from "./base.interface";
import { IProductVariationToIngredient } from "./product-variation-to-ingredient.interface";
import { ITax } from "./tax.interface";
import { IVariation } from "./variation.interface";

export interface IProductVariation extends IBase<string> {
  name: string;

  imageUrl?: string;

  kitchenName: string;

  description: string;

  price: number;

  tax: ITax;

  deliveryPrice: number;

  deliveryTax: ITax;

  takeAwayPrice: number;

  takeAwayTax: ITax;

  loyaltyPointOffered: number;

  disabled: boolean;

  productId: string;

  variationId: string;
  variation?: IVariation;

  accountCode: IAccountCode;

  productVariationToIngredients: IProductVariationToIngredient[];
}