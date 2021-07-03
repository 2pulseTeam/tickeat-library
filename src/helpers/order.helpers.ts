import { DiscountType, IOrder, IOrderDiscount, IOrderItem, IOrderOption, IOrderPack, IOrderProduct, IOrderProductVariation, IOrderPromotion, IOrderTaxes, ItemType, OrderMode, PromotionTypes } from "../interfaces";
import { PackHelpers } from "./pack.helpers";
import { ProductHelpers } from "./product.helpers";


export class OrderHelpers {
  static getOrderPartialTotal(order: Partial<IOrder>, parts: Array<keyof Pick<IOrder, 'items' | 'promotions' | 'discounts'>>) {
    let total = 0;
    if (parts.find(part => part === 'items')) {
      total = order?.items?.reduce((acc: number, item: IOrderItem) => {

        switch (item.type) {
          case ItemType.PRODUCT:
            acc += ProductHelpers.getProductPrice((item.item as IOrderProduct), order.mode!) ?? 0;
            break;
          case ItemType.PACK:
            acc += PackHelpers.getPackPrice((item.item as IOrderPack), order.mode!) ?? 0;
            break;
        }

        return acc;

      }, 0) || 0
    }

    if (parts.find(part => part === 'promotions')) {
      total = order?.promotions?.reduce((acc: number, promotion: IOrderPromotion) => {
        acc -= promotion.computedDiscount || 0;
        return acc;
      }, total) || total;

    }

    if (parts.find(part => part === 'discounts')) {
      total = order.discounts?.reduce((acc: number, discount: IOrderDiscount) => {

        acc -= discount.type === DiscountType.FIXED
          ? discount.amount
          : Math.floor(acc * discount.amount / 100);
        return acc;
      }, total) || total;
    }

    return total;
  }

  static getOrderPaymentTotal(order?: Partial<IOrder>) {
    if (!order?.mode) return 0;

    const paymentTotal = order?.payments?.reduce((acc, payment) => {

      acc += payment.amount * (payment.quantity || 1);

      return acc;
    }, 0);

    return (paymentTotal || 0);

  }


  static getOrderTaxes(order: IOrder): IOrderTaxes[] {
    if (!order?.mode) return [];

    const itemsTaxes = (order.items || []).reduce((acc, item) => {

      switch (item.type) {
        case ItemType.PRODUCT: {
          const product = item.item as IOrderProduct;

          const taxId = OrderHelpers.getOrderProductVariationTax(product.productVariation!, order.mode);

          if (!taxId) console.error('No tax found for product', product.productVariation);

          if (!acc[taxId]) {
            acc[taxId] = 0;
          }

          acc[taxId] += ProductHelpers.getPlainProductPrice(product, order.mode) || 0;

          if (product.options) {
            OrderHelpers.appendProductOptionTaxes(acc, product.options, order.mode);
          }
          break;
        }

        case ItemType.PACK: {
          const pack = item.item as IOrderPack;

          const taxId = OrderHelpers.getOrderPackTax(pack, order.mode);

          if (!taxId) console.error('No tax found for pack', pack);

          if (!acc[taxId]) {
            acc[taxId] = 0;
          }

          acc[taxId] += PackHelpers.getPlainPackPrice(pack, order.mode) || 0;

          // Product variation is offered, but we need to count supplements
          pack.packToProductVariations?.forEach(packToProductVariation => {

            if (packToProductVariation.options) {
              OrderHelpers.appendProductOptionTaxes(acc, packToProductVariation.options, order.mode);
            }
          });

          // Price of each step is defined in stepToProductVariation,
          // Tax is defined in productVariation,
          pack.packToSteps?.forEach(packToStep => {

            packToStep.step.stepToProductVariations
            .filter(stepToProductVariation => stepToProductVariation.quantity > 0)
            .forEach(stepToProductVariation => {

              const stepToProductVariationTaxId = OrderHelpers.getOrderProductVariationTax(stepToProductVariation.productVariation!, order.mode);
              if (!acc[stepToProductVariationTaxId]) {
                acc[stepToProductVariationTaxId] = 0;
              }

              acc[stepToProductVariationTaxId] += stepToProductVariation.price || 0;

              if (stepToProductVariation.options) {
                OrderHelpers.appendProductOptionTaxes(acc, stepToProductVariation.options, order.mode);
              }
            });

          });
          break;
        }

      }


      return acc;
    }, {} as any);

    // Apply promotion reduction to corresponding taxes
    const orderTaxes = (order.promotions || []).reduce((acc, promotion) => {

      let promotionTaxId;
      switch (promotion.type) {
        case PromotionTypes.LEAST_EXPENSIVE: {
          const productVariation = promotion.discountedProductVariation;

          if (productVariation) {
            promotionTaxId = OrderHelpers.getOrderProductVariationTax(productVariation, order.mode);
            if (acc[promotionTaxId]) {
              acc[promotionTaxId] -= promotion.computedDiscount || 0;
            }
          }

          break;
        }

        case PromotionTypes.CODE: {
          // TODO: impl after v1
          break;
        }
      }

      return acc;

    }, itemsTaxes);

    // TTC = HT * (1 + TVA)
    const data = Object.keys(orderTaxes)
    .map(key => ({key, tax: order.taxes.find(tax => tax._id === key)}))
    .filter(({key, tax}) => !!tax)
    .map(({key, tax}) => {

      const ttcAmount = orderTaxes[key];
      const htAmount = Math.round(ttcAmount / (1 + tax!.rate/100));
      const tvaAmount = ttcAmount - htAmount;

      return {
        rate: tax!.rate,
        tvaAmount,
        htAmount,
        ttcAmount,
      }
    });

    const taxes = (order.discounts || []).reduce((acc, discount) => {

      return acc.map((orderTax, index) => {

        let discountVal = 0;
        let discountValLeft = 0;
        if (discount.type === DiscountType.FIXED) {
          discountVal = Math.floor(discount.amount / acc.length);

          discountValLeft = index === acc.length - 1 ? discount.amount % acc.length : 0;

        } else {

          discountVal = Math.floor(orderTax.ttcAmount * discount.amount / 100);

        }

        // const discountValue = (discount.type === DiscountType.FIXED ? Math.round(discount.amount / acc.length): Math.floor(orderTax.ttcAmount * discount.amount / 100));
        const ttcAmount = Math.round(orderTax.ttcAmount - discountVal - discountValLeft);
        const htAmount = Math.round(ttcAmount / (1 + orderTax!.rate/100));
        const tvaAmount = ttcAmount - htAmount;

        return {
          ...orderTax,
          tvaAmount,
          htAmount,
          ttcAmount,
        }

      });
    }, data);
    return taxes;
  }

  static appendProductOptionTaxes(acc: any, options: IOrderOption[], mode: OrderMode) {
    return options?.reduce((products, option) => {
      products.push(...option.products.filter(product => product.quantity > 0))
      return products;
    }, [] as IOrderProduct[])?.forEach(product => {

      const optionProductTaxId = OrderHelpers.getOrderProductVariationTax(product.productVariation!, mode);

      if (!acc[optionProductTaxId]) {
        acc[optionProductTaxId] = 0;
      }

      acc[optionProductTaxId] += ProductHelpers.getOptionProductPrice(product, mode) || 0;

    })
  }

  static getOrderPackTax(pack: IOrderPack, mode: OrderMode) {
    switch (mode) {
      case OrderMode.DELIVERY:
        return pack.deliveryTaxId ?? pack.taxId;
      case OrderMode.TAKEAWAY:
        return pack.takeAwayTaxId ?? pack.taxId
      case OrderMode.ONSPOT:
        return pack.takeAwayTaxId ?? pack.taxId;
    }
  }

  static getOrderProductVariationTax(productVariation: Pick<IOrderProductVariation, 'taxId' | 'deliveryTaxId' | 'takeAwayTaxId'>, mode: OrderMode): string {

    switch (mode) {
      case OrderMode.DELIVERY:
        return productVariation.deliveryTaxId ?? productVariation.taxId;
      case OrderMode.TAKEAWAY:
        return productVariation.takeAwayTaxId ?? productVariation.taxId
      case OrderMode.ONSPOT:
        return productVariation.takeAwayTaxId ?? productVariation.taxId;
    }

  }

}