"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryStep = exports.isDeliveryMan = exports.DeliveryFilter = exports.getTransportModeTraduction = exports.TransportMode = void 0;
var TransportMode;
(function (TransportMode) {
    TransportMode["BIKE"] = "BIKE";
    TransportMode["CAR"] = "CAR";
    TransportMode["SCOOTER_50_CM3"] = "SCOOTER_50_CM3";
    TransportMode["SCOOTER_125_CM3"] = "SCOOTER_125_CM3";
})(TransportMode = exports.TransportMode || (exports.TransportMode = {}));
function getTransportModeTraduction(transport) {
    switch (transport) {
        case TransportMode.BIKE:
            return 'Vélo';
        case TransportMode.CAR:
            return 'Voiture';
        case TransportMode.SCOOTER_50_CM3:
            return 'Scooter 50cm3';
        case TransportMode.SCOOTER_125_CM3:
            return 'Scooter 125cm3';
    }
}
exports.getTransportModeTraduction = getTransportModeTraduction;
var DeliveryFilter;
(function (DeliveryFilter) {
    DeliveryFilter["DISPATCHED"] = "DISPATCHED";
    DeliveryFilter["LATE"] = "LATE";
    DeliveryFilter["NOT_DISPATCHED"] = "NOT_DISPATCHED";
    DeliveryFilter["DELIVERED"] = "DELIVERED";
})(DeliveryFilter = exports.DeliveryFilter || (exports.DeliveryFilter = {}));
const isDeliveryMan = (object) => {
    return 'inDelivery' in object;
};
exports.isDeliveryMan = isDeliveryMan;
var DeliveryStep;
(function (DeliveryStep) {
    DeliveryStep["MAIN"] = "MAIN";
    DeliveryStep["LIST_DELIVERY_MEN"] = "LIST_DELIVERY_MEN";
    DeliveryStep["TRANSPORT_DELIVERY_MAN"] = "TRANSPORT_DELIVERY_MAN";
    DeliveryStep["ORDERS_SELECTED"] = "ORDERS_SELECTED";
    DeliveryStep["AVAILABLE_DELIVERY_MEN"] = "AVAILABLE_DELIVERY_MEN";
})(DeliveryStep = exports.DeliveryStep || (exports.DeliveryStep = {}));
