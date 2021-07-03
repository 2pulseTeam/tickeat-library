"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderChannel = exports.OrderMode = exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["CREATED"] = "created";
    OrderStatus["COOKING"] = "cooking";
    OrderStatus["COOKED"] = "cooked";
    OrderStatus["DELIVERING"] = "delivering";
    OrderStatus["DELIVERED"] = "delivered";
    OrderStatus["CLOSED"] = "closed";
    OrderStatus["CANCELLED"] = "cancelled";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
var OrderMode;
(function (OrderMode) {
    OrderMode["DELIVERY"] = "DELIVERY";
    OrderMode["TAKEAWAY"] = "TAKEAWAY";
    OrderMode["ONSPOT"] = "ONSPOT";
})(OrderMode = exports.OrderMode || (exports.OrderMode = {}));
var OrderChannel;
(function (OrderChannel) {
    OrderChannel["WEBSITE"] = "website";
    OrderChannel["TICKEAT_OS"] = "tickeat_os";
    OrderChannel["UBER"] = "uber";
    OrderChannel["DELIVEROO"] = "deliveroo";
})(OrderChannel = exports.OrderChannel || (exports.OrderChannel = {}));
