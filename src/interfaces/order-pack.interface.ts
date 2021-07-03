import { IOrderOption, IOrderProductVariation } from "./order-product.interface";


export interface IOrderPack {
  _id: string;
  name: string;
  quantity: number;

  price: number;
  taxId: string;
  deliveryPrice?: number;
  deliveryTaxId?: string;
  takeAwayPrice?: number;
  takeAwayTaxId?: string;

  tagsIds?: string[];

  packToProductVariations: IOrderPackToProductVariation[];
  packToSteps: IOrderPackToStep[];

  accountCodeId: string;
}

export interface IOrderPackToProductVariation {
  _id: string;

  position: number;
  productVariation?: IOrderProductVariation;

  options?: IOrderOption[];
}

export interface IOrderPackToStep {
  _id: string;
  position: number;

  step: IOrderStep;
}

export interface IOrderStep {
  _id: string;
  name: string;
  maxChoiceCount?: number;
  stepToProductVariations: IOrderStepToProductVariation[];
}

export interface IOrderStepToProductVariation {
  _id: string;
  position: number;
  price: number;
  quantity: number;

  productVariation: IOrderProductVariation;
  options?: IOrderOption[];
}