"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderHelpers = void 0;
const interfaces_1 = require("../interfaces");
const pack_helpers_1 = require("./pack.helpers");
const product_helpers_1 = require("./product.helpers");
class OrderHelpers {
    static getOrderPartialTotal(order, parts) {
        var _a, _b, _c;
        let total = 0;
        if (parts.find(part => part === 'items')) {
            total = ((_a = order === null || order === void 0 ? void 0 : order.items) === null || _a === void 0 ? void 0 : _a.reduce((acc, item) => {
                var _a, _b;
                switch (item.type) {
                    case interfaces_1.ItemType.PRODUCT:
                        acc += (_a = product_helpers_1.ProductHelpers.getProductPrice(item.item, order.mode)) !== null && _a !== void 0 ? _a : 0;
                        break;
                    case interfaces_1.ItemType.PACK:
                        acc += (_b = pack_helpers_1.PackHelpers.getPackPrice(item.item, order.mode)) !== null && _b !== void 0 ? _b : 0;
                        break;
                }
                return acc;
            }, 0)) || 0;
        }
        if (parts.find(part => part === 'promotions')) {
            total = ((_b = order === null || order === void 0 ? void 0 : order.promotions) === null || _b === void 0 ? void 0 : _b.reduce((acc, promotion) => {
                acc -= promotion.computedDiscount || 0;
                return acc;
            }, total)) || total;
        }
        if (parts.find(part => part === 'discounts')) {
            total = ((_c = order.discounts) === null || _c === void 0 ? void 0 : _c.reduce((acc, discount) => {
                acc -= discount.type === interfaces_1.DiscountType.FIXED
                    ? discount.amount
                    : Math.floor(acc * discount.amount / 100);
                return acc;
            }, total)) || total;
        }
        return total;
    }
    static getOrderPaymentTotal(order) {
        var _a;
        if (!(order === null || order === void 0 ? void 0 : order.mode))
            return 0;
        const paymentTotal = (_a = order === null || order === void 0 ? void 0 : order.payments) === null || _a === void 0 ? void 0 : _a.reduce((acc, payment) => {
            acc += payment.amount * (payment.quantity || 1);
            return acc;
        }, 0);
        return (paymentTotal || 0);
    }
    static getOrderAccountCodes(order) {
        if (!(order === null || order === void 0 ? void 0 : order.mode))
            return [];
        const itemsTaxes = (order.items || []).reduce((acc, item) => {
            var _a, _b;
            switch (item.type) {
                case interfaces_1.ItemType.PRODUCT: {
                    const product = item.item;
                    const accountCodeId = product.productVariation.accountCodeId;
                    if (!accountCodeId)
                        console.error('No tax found for product', product.productVariation);
                    if (!acc[accountCodeId]) {
                        acc[accountCodeId] = 0;
                    }
                    acc[accountCodeId] += product_helpers_1.ProductHelpers.getPlainProductPrice(product, order.mode) || 0;
                    if (product.options) {
                        OrderHelpers.appendProductOptionAccountCodes(acc, product.options, order.mode);
                    }
                    break;
                }
                case interfaces_1.ItemType.PACK: {
                    const pack = item.item;
                    const accountCodeId = pack.accountCodeId;
                    if (!accountCodeId)
                        console.error('No tax found for pack', pack);
                    if (!acc[accountCodeId]) {
                        acc[accountCodeId] = 0;
                    }
                    acc[accountCodeId] += pack_helpers_1.PackHelpers.getPlainPackPrice(pack, order.mode) || 0;
                    // Product variation is offered, but we need to count supplements
                    (_a = pack.packToProductVariations) === null || _a === void 0 ? void 0 : _a.forEach(packToProductVariation => {
                        if (packToProductVariation.options) {
                            OrderHelpers.appendProductOptionAccountCodes(acc, packToProductVariation.options, order.mode);
                        }
                    });
                    // Price of each step is defined in stepToProductVariation,
                    // Tax is defined in productVariation,
                    (_b = pack.packToSteps) === null || _b === void 0 ? void 0 : _b.forEach(packToStep => {
                        packToStep.step.stepToProductVariations
                            .filter(stepToProductVariation => stepToProductVariation.quantity > 0)
                            .forEach(stepToProductVariation => {
                            const stepToProductVariationAccountCodeId = stepToProductVariation.productVariation.accountCodeId;
                            if (!acc[stepToProductVariationAccountCodeId]) {
                                acc[stepToProductVariationAccountCodeId] = 0;
                            }
                            acc[stepToProductVariationAccountCodeId] += stepToProductVariation.price || 0;
                            if (stepToProductVariation.options) {
                                OrderHelpers.appendProductOptionAccountCodes(acc, stepToProductVariation.options, order.mode);
                            }
                        });
                    });
                    break;
                }
            }
            return acc;
        }, {});
        // Apply promotion reduction to corresponding taxes
        const orderTaxes = (order.promotions || []).reduce((acc, promotion) => {
            let accountCodeId;
            switch (promotion.type) {
                case interfaces_1.PromotionTypes.LEAST_EXPENSIVE: {
                    const productVariation = promotion.discountedProductVariation;
                    if (productVariation) {
                        accountCodeId = productVariation.accountCodeId;
                        if (acc[accountCodeId]) {
                            acc[accountCodeId] -= promotion.computedDiscount || 0;
                        }
                    }
                    break;
                }
                case interfaces_1.PromotionTypes.CODE: {
                    // TODO: impl after v1
                    break;
                }
            }
            return acc;
        }, itemsTaxes);
        // TTC = HT * (1 + TVA)
        const data = Object.keys(orderTaxes)
            .map(key => ({ key, tax: order.taxes.find(tax => tax._id === key) }))
            .filter(({ key, tax }) => !!tax)
            .map(({ key, tax }) => {
            const ttcAmount = orderTaxes[key];
            const htAmount = Math.round(ttcAmount / (1 + tax.rate / 100));
            const tvaAmount = ttcAmount - htAmount;
            return {
                rate: tax.rate,
                tvaAmount,
                htAmount,
                ttcAmount,
            };
        });
        const taxes = (order.discounts || []).reduce((acc, discount) => {
            return acc.map((orderTax, index) => {
                let discountVal = 0;
                let discountValLeft = 0;
                if (discount.type === interfaces_1.DiscountType.FIXED) {
                    discountVal = Math.floor(discount.amount / acc.length);
                    discountValLeft = index === acc.length - 1 ? discount.amount % acc.length : 0;
                }
                else {
                    discountVal = Math.floor(orderTax.ttcAmount * discount.amount / 100);
                }
                // const discountValue = (discount.type === DiscountType.FIXED ? Math.round(discount.amount / acc.length): Math.floor(orderTax.ttcAmount * discount.amount / 100));
                const ttcAmount = Math.round(orderTax.ttcAmount - discountVal - discountValLeft);
                const htAmount = Math.round(ttcAmount / (1 + orderTax.rate / 100));
                const tvaAmount = ttcAmount - htAmount;
                return Object.assign(Object.assign({}, orderTax), { tvaAmount,
                    htAmount,
                    ttcAmount });
            });
        }, data);
        return taxes;
    }
    static getOrderTaxes(order) {
        if (!(order === null || order === void 0 ? void 0 : order.mode))
            return [];
        const itemsTaxes = (order.items || []).reduce((acc, item) => {
            var _a, _b;
            switch (item.type) {
                case interfaces_1.ItemType.PRODUCT: {
                    const product = item.item;
                    const taxId = OrderHelpers.getOrderProductVariationTax(product.productVariation, order.mode);
                    if (!taxId)
                        console.error('No tax found for product', product.productVariation);
                    if (!acc[taxId]) {
                        acc[taxId] = 0;
                    }
                    acc[taxId] += product_helpers_1.ProductHelpers.getPlainProductPrice(product, order.mode) || 0;
                    if (product.options) {
                        OrderHelpers.appendProductOptionTaxes(acc, product.options, order.mode);
                    }
                    break;
                }
                case interfaces_1.ItemType.PACK: {
                    const pack = item.item;
                    const taxId = OrderHelpers.getOrderPackTax(pack, order.mode);
                    if (!taxId)
                        console.error('No tax found for pack', pack);
                    if (!acc[taxId]) {
                        acc[taxId] = 0;
                    }
                    acc[taxId] += pack_helpers_1.PackHelpers.getPlainPackPrice(pack, order.mode) || 0;
                    // Product variation is offered, but we need to count supplements
                    (_a = pack.packToProductVariations) === null || _a === void 0 ? void 0 : _a.forEach(packToProductVariation => {
                        if (packToProductVariation.options) {
                            OrderHelpers.appendProductOptionTaxes(acc, packToProductVariation.options, order.mode);
                        }
                    });
                    // Price of each step is defined in stepToProductVariation,
                    // Tax is defined in productVariation,
                    (_b = pack.packToSteps) === null || _b === void 0 ? void 0 : _b.forEach(packToStep => {
                        packToStep.step.stepToProductVariations
                            .filter(stepToProductVariation => stepToProductVariation.quantity > 0)
                            .forEach(stepToProductVariation => {
                            const stepToProductVariationTaxId = OrderHelpers.getOrderProductVariationTax(stepToProductVariation.productVariation, order.mode);
                            if (!acc[stepToProductVariationTaxId]) {
                                acc[stepToProductVariationTaxId] = 0;
                            }
                            acc[stepToProductVariationTaxId] += stepToProductVariation.price || 0;
                            if (stepToProductVariation.options) {
                                OrderHelpers.appendProductOptionTaxes(acc, stepToProductVariation.options, order.mode);
                            }
                        });
                    });
                    break;
                }
            }
            return acc;
        }, {});
        // Apply promotion reduction to corresponding taxes
        const orderTaxes = (order.promotions || []).reduce((acc, promotion) => {
            let promotionTaxId;
            switch (promotion.type) {
                case interfaces_1.PromotionTypes.LEAST_EXPENSIVE: {
                    const productVariation = promotion.discountedProductVariation;
                    if (productVariation) {
                        promotionTaxId = OrderHelpers.getOrderProductVariationTax(productVariation, order.mode);
                        if (acc[promotionTaxId]) {
                            acc[promotionTaxId] -= promotion.computedDiscount || 0;
                        }
                    }
                    break;
                }
                case interfaces_1.PromotionTypes.CODE: {
                    // TODO: impl after v1
                    break;
                }
            }
            return acc;
        }, itemsTaxes);
        // TTC = HT * (1 + TVA)
        const data = Object.keys(orderTaxes)
            .map(key => ({ key, tax: order.taxes.find(tax => tax._id === key) }))
            .filter(({ key, tax }) => !!tax)
            .map(({ key, tax }) => {
            const ttcAmount = orderTaxes[key];
            const htAmount = Math.round(ttcAmount / (1 + tax.rate / 100));
            const tvaAmount = ttcAmount - htAmount;
            return {
                tax,
                rate: tax.rate,
                tvaAmount,
                htAmount,
                ttcAmount,
            };
        });
        const taxes = (order.discounts || []).reduce((acc, discount) => {
            return acc.map((orderTax, index) => {
                let discountVal = 0;
                let discountValLeft = 0;
                if (discount.type === interfaces_1.DiscountType.FIXED) {
                    discountVal = Math.floor(discount.amount / acc.length);
                    discountValLeft = index === acc.length - 1 ? discount.amount % acc.length : 0;
                }
                else {
                    discountVal = Math.floor(orderTax.ttcAmount * discount.amount / 100);
                }
                // const discountValue = (discount.type === DiscountType.FIXED ? Math.round(discount.amount / acc.length): Math.floor(orderTax.ttcAmount * discount.amount / 100));
                const ttcAmount = Math.round(orderTax.ttcAmount - discountVal - discountValLeft);
                const htAmount = Math.round(ttcAmount / (1 + orderTax.rate / 100));
                const tvaAmount = ttcAmount - htAmount;
                return Object.assign(Object.assign({}, orderTax), { tvaAmount,
                    htAmount,
                    ttcAmount });
            });
        }, data);
        return taxes;
    }
    static appendProductOptionTaxes(acc, options, mode) {
        var _a;
        return (_a = options === null || options === void 0 ? void 0 : options.reduce((products, option) => {
            products.push(...option.products.filter(product => product.quantity > 0));
            return products;
        }, [])) === null || _a === void 0 ? void 0 : _a.forEach(product => {
            const optionProductTaxId = OrderHelpers.getOrderProductVariationTax(product.productVariation, mode);
            if (!acc[optionProductTaxId]) {
                acc[optionProductTaxId] = 0;
            }
            acc[optionProductTaxId] += product_helpers_1.ProductHelpers.getOptionProductPrice(product, mode) || 0;
        });
    }
    static appendProductOptionAccountCodes(acc, options, mode) {
        var _a;
        return (_a = options === null || options === void 0 ? void 0 : options.reduce((products, option) => {
            products.push(...option.products.filter(product => product.quantity > 0));
            return products;
        }, [])) === null || _a === void 0 ? void 0 : _a.forEach(product => {
            const accountCodeId = product.productVariation.accountCodeId;
            if (!acc[accountCodeId]) {
                acc[accountCodeId] = 0;
            }
            acc[accountCodeId] += product_helpers_1.ProductHelpers.getOptionProductPrice(product, mode) || 0;
        });
    }
    static getOrderPackTax(pack, mode) {
        var _a, _b, _c;
        switch (mode) {
            case interfaces_1.OrderMode.DELIVERY:
                return (_a = pack.deliveryTaxId) !== null && _a !== void 0 ? _a : pack.taxId;
            case interfaces_1.OrderMode.TAKEAWAY:
                return (_b = pack.takeAwayTaxId) !== null && _b !== void 0 ? _b : pack.taxId;
            case interfaces_1.OrderMode.ONSPOT:
                return (_c = pack.takeAwayTaxId) !== null && _c !== void 0 ? _c : pack.taxId;
        }
    }
    static getOrderProductVariationTax(productVariation, mode) {
        var _a, _b, _c;
        switch (mode) {
            case interfaces_1.OrderMode.DELIVERY:
                return (_a = productVariation.deliveryTaxId) !== null && _a !== void 0 ? _a : productVariation.taxId;
            case interfaces_1.OrderMode.TAKEAWAY:
                return (_b = productVariation.takeAwayTaxId) !== null && _b !== void 0 ? _b : productVariation.taxId;
            case interfaces_1.OrderMode.ONSPOT:
                return (_c = productVariation.takeAwayTaxId) !== null && _c !== void 0 ? _c : productVariation.taxId;
        }
    }
}
exports.OrderHelpers = OrderHelpers;
