"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
/**
 * Created by alejandro on 15/04/17.
 */
var OrderService = (function () {
    function OrderService(webClient, configService) {
        this.webClient = webClient;
        this.configService = configService;
        this.restaurantId = 1;
        this.ordersObservable = new rxjs_1.ReplaySubject(1);
    }
    OrderService.prototype.getOrdersObservable = function () {
        return this.ordersObservable;
    };
    /**
     *Emite los pedidos
     *
     * @param refresh Si quieres forzar la petición
     * @returns {any}
     */
    OrderService.prototype.getOrders = function (refresh) {
        var _this = this;
        var request = true;
        if (this.orders) {
            request = false;
        }
        request = refresh ? true : request;
        if (request) {
            //No ha realizado la petición o quiere forzarla
            this.webClient.secureGet(this.configService.getUrl('order') + "/" + this.restaurantId)
                .map(function (response) {
                _this.orders = response.json();
                _this.ordersObservable.next(_this.orders);
            })
                .catch(this.handleError)
                .subscribe();
        }
    };
    /**
     *Emite los pedidos
     *
     * @param refresh Si quieres forzar la petición
     * @returns {any}
     */
    OrderService.prototype.getOrdersByClient = function (refresh) {
        var _this = this;
        var request = true;
        if (this.orders) {
            request = false;
        }
        request = refresh ? true : request;
        if (request) {
            //No ha realizado la petición o quiere forzarla
            this.webClient.secureGet(this.configService.getUrl('orderByClient'))
                .map(function (response) {
                _this.orders = response.json();
                _this.ordersObservable.next(_this.orders);
            })
                .catch(this.handleError)
                .subscribe();
        }
    };
    /**
     * Maneja los errores
     * @param error
     * @returns {any}
     */
    OrderService.prototype.handleError = function (error) {
        if (error.status == 400) {
            return rxjs_1.Observable.throw(error.json());
        }
        return rxjs_1.Observable.throw(error.json());
    };
    /**
     * Actualiza un restaurante
     *
     * @param restaurant
     * @returns {Observable<R>}
     */
    OrderService.prototype.changeOrderStatus = function (orderId, currentState) {
        var _this = this;
        var stateEndpoint = this.getOrderStatusEndpoint(currentState);
        this.webClient.securePatch(this.configService.getUrl('order') + "/" + orderId + "/" + stateEndpoint, "")
            .map(function (response) {
            _this.getOrders(true);
        })
            .catch(this.handleError)
            .subscribe();
    };
    OrderService.prototype.getOrderStatusEndpoint = function (state) {
        switch (state) {
            case 'RECEIVED': {
                return 'cook';
            }
            case 'COOKING': {
                return 'send';
            }
            case 'SENDED': {
                return 'close';
            }
            default:
                return '';
        }
    };
    OrderService.prototype.setRestaurantId = function (id) {
        this.restaurantId = id;
        this.getOrders(true);
    };
    OrderService = __decorate([
        core_1.Injectable()
    ], OrderService);
    return OrderService;
}());
exports.OrderService = OrderService;
