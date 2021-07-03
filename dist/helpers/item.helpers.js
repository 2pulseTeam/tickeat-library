"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemHelpers = void 0;
const interfaces_1 = require("../interfaces");
class ItemHelpers {
    static getPriceKey(mode) {
        switch (mode) {
            case interfaces_1.OrderMode.DELIVERY:
                return 'deliveryPrice';
            case interfaces_1.OrderMode.TAKEAWAY:
                return 'takeAwayPrice';
            case interfaces_1.OrderMode.ONSPOT:
            default:
                return 'price';
        }
    }
}
exports.ItemHelpers = ItemHelpers;
