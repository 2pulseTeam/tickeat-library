import { OrderMode } from "../interfaces";


export class ItemHelpers {

  static getPriceKey(mode: OrderMode): 'price' | 'takeAwayPrice' | 'deliveryPrice' {
    switch (mode) {
      case OrderMode.DELIVERY:
        return 'deliveryPrice';
      case OrderMode.TAKEAWAY:
        return 'takeAwayPrice';
      case OrderMode.ONSPOT:
      default:
        return 'price';
    }
  }

}