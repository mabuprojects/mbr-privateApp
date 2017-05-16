import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "../core/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isAuthenticated()) { return true; }

    // Store the attempted URL for redirecting
    this.authService.setRedirectUrl(url);

    // Navigate to the login page with extras
    this.router.navigate(['/singin']);
    return false;
  }

}
