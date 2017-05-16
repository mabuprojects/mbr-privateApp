import {Injectable} from '@angular/core';
import {Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate} from "@angular/router";
import {AuthenticationService} from "../core/authentication.service";

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("test");
    let url: string = state.url;

    let roles = new Set(route.data["roles"] as Array<string>);

    console.log(roles);

    return this.checkLogin(url, roles);
  }

  checkLogin(url: string, roles: Set<string>): boolean {
    try {
      if (this.authService.isAuthenticated()) {
        if (this.verifyRoles(this.authService.getRoles(), roles)) {
          return true;
        }
      }
    } catch (e) {

    }
    this.authService.setRedirectUrl(url);
    return false;
  }


  verifyRoles(userRoles: string[], requiredRoles: Set<string>): boolean {
    return (requiredRoles.size === userRoles.filter(x => requiredRoles.has(x)).length);

  }

  checkRole(role: string) {
    if (this.authService.isAuthenticated()) {
      if (this.verifyRoles(this.authService.getRoles(), new Set(role))) {
        return true;
      }
    }
    return false;
  }


}
