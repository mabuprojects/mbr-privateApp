import {Component, OnInit, Input, EventEmitter, HostListener} from "@angular/core";
import {Location} from "@angular/common";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../core/authentication.service";
import {MaterializeAction} from "angular2-materialize/dist";
import {Observable} from "rxjs";
import {Employee} from "../../core/model/user/employee.component";
import {User} from "../../core/model/user/user.component";
const screenfull = require('screenfull');
@Component({
  selector: 'app-nav-bar',
  templateUrl: 'nav-bar.component.html',
  styleUrls: ['nav-bar.component.css']
})
export class NavBarComponent {

  @Input() title: string;
  @Input() back: boolean = false;
  sideNavActions = new EventEmitter<string|MaterializeAction>();
  user:Promise<User>;

  constructor(private location: Location, private authenticationService: AuthenticationService, private router: Router) {
   this.user = this.authenticationService.getUser();

  }


  backRoute() {
    this.location.back();

  }

  fullScreen() {
    screenfull.toggle();
  }

  logOut() {
    this.authenticationService.logOut();
    this.router.navigateByUrl('/singin');
    this.closeSideNav();
  }

  closeSideNav() {
    this.sideNavActions.emit({action: "sideNav", params: ['hide']});
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth > 600) {
      this.closeSideNav();
    }
    ;
  }

}
