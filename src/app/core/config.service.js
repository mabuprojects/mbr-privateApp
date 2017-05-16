"use strict";
var ConfigService = (function () {
    function ConfigService() {
        this.config = {
            serviceUrl: "http://localhost:8080"
        };
        this.url = {
            product: "/public/product",
            restaurant: "/public/restaurant",
            category: "/public/category",
            taxe: "/public/taxe",
            existRestaurantName: "public/restaurant/exist",
            user: '/user',
            employee: '/employee',
            employeeRoles: '/employee/roles',
            order: '/order',
        };
    }
    ConfigService.prototype.get = function (key) {
        return this.config[key];
    };
    ConfigService.prototype.getUrl = function (key) {
        return this.config['serviceUrl'] + this.url[key];
    };
    return ConfigService;
}());
exports.ConfigService = ConfigService;
