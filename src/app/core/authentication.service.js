"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/http");
require("rxjs/Rx");
var AuthenticationService = (function () {
    function AuthenticationService(http, config) {
        this.http = http;
        this.config = config;
        this.authenticatedObservable = new core_1.EventEmitter();
        this.redirectUrl = '';
        var user = localStorage.getItem('currentUser');
        if (user != null) {
            var currentUser = JSON.parse(user);
        }
        this.token = currentUser && currentUser.token;
        if (this.isNowAuthenticated()) {
            this.getUserData();
        }
    }
    AuthenticationService.prototype.ngOnInit = function () {
        this.authenticationChanged();
    };
    AuthenticationService.prototype.singin = function (email, password) {
        var _this = this;
        var body = JSON.stringify({ username: email, password: password });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.config.get('serviceUrl') + '/auth', body, options)
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var token = response.json() && response.json().token;
            if (token) {
                // set token property
                _this.token = token;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ username: email, token: token }));
                _this.getUserData();
                _this.authenticationChanged();
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                return false;
            }
        })
            .catch(this.handleSingInError);
    };
    AuthenticationService.prototype.handleSingInError = function (error) {
        if (error.status == 400) {
            return rxjs_1.Observable.throw(error.json());
        }
        return rxjs_1.Observable.throw(error.json());
    };
    AuthenticationService.prototype.getUserData = function () {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.token == null ? '' : this.token);
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.get(this.config.getUrl('user'), options).subscribe(function (response) {
            console.log("USUARIO RECIBIDO");
            console.log(response.json());
            _this.user = response.json();
            if (_this.user != null) {
                _this.roles = _this.user.authorities.map(function (e) { return e.authority; });
            }
        });
    };
    AuthenticationService.prototype.isAuthenticated = function () {
        return this.authenticatedObservable;
    };
    AuthenticationService.prototype.authenticationChanged = function () {
        this.authenticated = this.token != null;
        this.authenticatedObservable.emit(this.authenticated);
    };
    AuthenticationService.prototype.isNowAuthenticated = function () {
        return this.token != null;
    };
    AuthenticationService.prototype.logOut = function () {
        localStorage.removeItem('currentUser');
        this.token = null;
        this.authenticationChanged();
    };
    AuthenticationService.prototype.setRedirectUrl = function (url) {
        this.redirectUrl = url;
    };
    AuthenticationService.prototype.getRedirectUrl = function () {
        return this.redirectUrl;
    };
    AuthenticationService.prototype.getUser = function () {
        return this.user;
    };
    AuthenticationService.prototype.getRoles = function () {
        return this.roles;
    };
    AuthenticationService = __decorate([
        core_1.Injectable()
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
