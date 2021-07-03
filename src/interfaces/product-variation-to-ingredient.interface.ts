import { IIngredient } from "./ingredient.interface";
import { IProductVariation } from "./product-variation.interface";

export interface IProductVariationToIngredient {
  quantity: number;

  ingredientId: string;

  productVariationId: string;

  productVariation: IProductVariation;

  ingredient: IIngredient;
}