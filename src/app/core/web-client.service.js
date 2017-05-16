"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
/**
 * Created by alejandro on 17/03/17.
 */
var WebClientService = (function () {
    function WebClientService(http, auth) {
        this.http = http;
        this.auth = auth;
    }
    WebClientService.prototype.secureGet = function (url) {
        var headers = this.getSecureHeaders();
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(url, options);
    };
    WebClientService.prototype.securePost = function (url, body) {
        var headers = this.getSecureHeaders();
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, body, options);
    };
    WebClientService.prototype.securePatch = function (url, body) {
        var headers = this.getSecureHeaders();
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.patch(url, body, options);
    };
    WebClientService.prototype.getSecureHeaders = function () {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.auth.token == null ? '' : this.auth.token);
        return headers;
    };
    WebClientService = __decorate([
        core_1.Injectable()
    ], WebClientService);
    return WebClientService;
}());
exports.WebClientService = WebClientService;
