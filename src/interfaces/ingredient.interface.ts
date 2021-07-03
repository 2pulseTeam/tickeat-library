import { IBase } from "./base.interface";
import { IIngredientShop } from "./ingredient-shop.interface";

export interface IIngredient extends IBase<string> {
  name: string;

  unit: string;

  price: number;

  bundle: string;

  supplier: string;

  ingredientShops: IIngredientShop[];
}