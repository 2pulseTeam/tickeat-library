import { IOrderPack, OrderMode } from "../interfaces";
import { ItemHelpers } from "./item.helpers";
import { ProductHelpers } from "./product.helpers";



export class PackHelpers {

  static getPlainPackPrice(pack: IOrderPack, mode?: OrderMode): number | undefined {
    if (!mode) return;

    const basePrice = (pack[ItemHelpers.getPriceKey(mode)] as number) ?? pack.price;

    return pack.quantity * basePrice;
  }

  static getPackPrice(pack: IOrderPack, mode?: OrderMode): number | undefined {
    if (!mode) return;

    const basePrice = PackHelpers.getPlainPackPrice(pack, mode) || 0;

    const packProductsPrice = pack.packToProductVariations?.reduce((total, packToProductVariation) => {
      return total + (packToProductVariation?.options || []).reduce((optionTotal, option) => {
        return optionTotal + ProductHelpers.getOptionPrice(option, mode, packToProductVariation.productVariation?.variationId);
      }, 0);
    }, 0);

    const packStepsPrice = pack.packToSteps?.reduce((total, packToStep) => {

      return total + (packToStep.step.stepToProductVariations || []).reduce((stepTotal, stepToProductVariation) => {
        return stepTotal + ((stepToProductVariation.quantity || 0) * (stepToProductVariation.price || 0)) + (stepToProductVariation.options || []).reduce((optionTotal, option) => {
          return optionTotal + ProductHelpers.getOptionPrice(option, mode, stepToProductVariation.productVariation.variationId);
        }, 0);
      }, 0);
    }, 0)

    return basePrice + pack.quantity * ((packProductsPrice || 0) + (packStepsPrice || 0));
  }
  static getPackToStepPrice() {}
}