import { IBase } from "./base.interface";

export interface IIngredientShop extends IBase<string> {
  outOfStock: boolean;
  shopId: string;
  ingredientId: string;
}
