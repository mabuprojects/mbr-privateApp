"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var RoleGuardService = (function () {
    function RoleGuardService(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    RoleGuardService.prototype.canActivate = function (route, state) {
        var url = state.url;
        var roles = route.data["roles"];
        return this.checkLogin(url, roles);
    };
    RoleGuardService.prototype.checkLogin = function (url, roles) {
        if (this.authService.isNowAuthenticated()) {
            if (this.verifyRoles(this.authService.getRoles(), roles)) {
                return true;
            }
        }
        // Store the attempted URL for redirecting
        this.authService.setRedirectUrl(url);
        // Navigate to the login page with extras
        this.router.navigate(['/singin']);
        return false;
    };
    RoleGuardService.prototype.verifyRoles = function (userRoles, requiredRoles) {
        return (requiredRoles.length === _.intersection(requiredRoles, userRoles).length);
    };
    RoleGuardService = __decorate([
        core_1.Injectable()
    ], RoleGuardService);
    return RoleGuardService;
}());
exports.RoleGuardService = RoleGuardService;
