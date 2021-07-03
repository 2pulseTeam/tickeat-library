"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackHelpers = void 0;
const item_helpers_1 = require("./item.helpers");
const product_helpers_1 = require("./product.helpers");
class PackHelpers {
    static getPlainPackPrice(pack, mode) {
        var _a;
        if (!mode)
            return;
        const basePrice = (_a = pack[item_helpers_1.ItemHelpers.getPriceKey(mode)]) !== null && _a !== void 0 ? _a : pack.price;
        return pack.quantity * basePrice;
    }
    static getPackPrice(pack, mode) {
        var _a, _b;
        if (!mode)
            return;
        const basePrice = PackHelpers.getPlainPackPrice(pack, mode) || 0;
        const packProductsPrice = (_a = pack.packToProductVariations) === null || _a === void 0 ? void 0 : _a.reduce((total, packToProductVariation) => {
            return total + ((packToProductVariation === null || packToProductVariation === void 0 ? void 0 : packToProductVariation.options) || []).reduce((optionTotal, option) => {
                var _a;
                return optionTotal + product_helpers_1.ProductHelpers.getOptionPrice(option, mode, (_a = packToProductVariation.productVariation) === null || _a === void 0 ? void 0 : _a.variationId);
            }, 0);
        }, 0);
        const packStepsPrice = (_b = pack.packToSteps) === null || _b === void 0 ? void 0 : _b.reduce((total, packToStep) => {
            return total + (packToStep.step.stepToProductVariations || []).reduce((stepTotal, stepToProductVariation) => {
                return stepTotal + ((stepToProductVariation.quantity || 0) * (stepToProductVariation.price || 0)) + (stepToProductVariation.options || []).reduce((optionTotal, option) => {
                    return optionTotal + product_helpers_1.ProductHelpers.getOptionPrice(option, mode, stepToProductVariation.productVariation.variationId);
                }, 0);
            }, 0);
        }, 0);
        return basePrice + pack.quantity * ((packProductsPrice || 0) + (packStepsPrice || 0));
    }
    static getPackToStepPrice() { }
}
exports.PackHelpers = PackHelpers;
