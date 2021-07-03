"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductHelpers = void 0;
const item_helpers_1 = require("./item.helpers");
class ProductHelpers {
    static getPlainProductPriceWithoutQty(product, mode) {
        var _a;
        if (!product || !product.productVariation || !mode)
            return;
        return ((_a = product.productVariation[item_helpers_1.ItemHelpers.getPriceKey(mode)]) !== null && _a !== void 0 ? _a : product.productVariation.price);
    }
    static getPlainProductPrice(product, mode) {
        return product.quantity * (ProductHelpers.getPlainProductPriceWithoutQty(product, mode) || 0);
    }
    static getProductPrice(product, mode) {
        if (!product || !product.productVariation || !mode)
            return;
        const basePrice = ProductHelpers.getPlainProductPrice(product, mode);
        const optionsPrice = ((product === null || product === void 0 ? void 0 : product.options) || []).reduce((total, option) => {
            var _a, _b;
            return total + ((_b = ProductHelpers.getOptionPrice(option, mode, (_a = product.productVariation) === null || _a === void 0 ? void 0 : _a.variationId)) !== null && _b !== void 0 ? _b : 0);
        }, 0);
        return (basePrice + product.quantity * optionsPrice);
    }
    static getOptionPrice(option, mode, variationId) {
        return option.products
            .filter(product => product.quantity > 0)
            .reduce((total, product) => {
            var _a;
            return total + ((_a = ProductHelpers.getOptionProductPrice(product, mode, variationId)) !== null && _a !== void 0 ? _a : 0);
        }, 0);
    }
    static getOptionProductPrice(product, mode, variationId) {
        var _a, _b;
        if (!mode)
            return;
        const productVariation = product.productVariation;
        if (!productVariation)
            return;
        return product.quantity * ((_b = (_a = productVariation[item_helpers_1.ItemHelpers.getPriceKey(mode)]) !== null && _a !== void 0 ? _a : productVariation.price) !== null && _b !== void 0 ? _b : 0);
    }
}
exports.ProductHelpers = ProductHelpers;
