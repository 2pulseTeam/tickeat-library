import { IOrderOption, IOrderProduct, OrderMode } from "../interfaces";
import { ItemHelpers } from "./item.helpers";


export class ProductHelpers {

  static getPlainProductPriceWithoutQty(product: IOrderProduct, mode?: OrderMode): number | undefined {
    if (!product || !product.productVariation || !mode) return;

    return ((product.productVariation[ItemHelpers.getPriceKey(mode)] as number) ?? product.productVariation.price);
  }

  static getPlainProductPrice(product: IOrderProduct, mode?: OrderMode): number | undefined {

    return product.quantity * (ProductHelpers.getPlainProductPriceWithoutQty(product, mode) || 0);
  }

  static getProductPrice(product: IOrderProduct, mode?: OrderMode): number | undefined {

    if (!product || !product.productVariation || !mode) return;

    const basePrice = ProductHelpers.getPlainProductPrice(product, mode)!;

    const optionsPrice = (product?.options || []).reduce((total, option) => {
      return total + (ProductHelpers.getOptionPrice(option, mode, product.productVariation?.variationId) ?? 0);
    }, 0);

    return (basePrice + product.quantity * optionsPrice);

  }
  static getOptionPrice(option: IOrderOption, mode: OrderMode, variationId?: string) {

    return option.products
      .filter(product => product.quantity > 0)
      .reduce((total, product) => {
        return total + (ProductHelpers.getOptionProductPrice(product, mode, variationId) ?? 0);
      }, 0);
  }


  static getOptionProductPrice(product: IOrderProduct, mode?: OrderMode, variationId?: string): number | undefined {

    if (!mode) return;

    const productVariation = product.productVariation;

    if (!productVariation) return;

    return product.quantity * ((productVariation[ItemHelpers.getPriceKey(mode)] as number) ?? productVariation.price ?? 0);

  }


}