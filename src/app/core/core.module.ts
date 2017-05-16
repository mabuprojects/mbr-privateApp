import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ConfigService} from "./config.service";
import {AuthenticationService} from "./authentication.service";
import {WebClientService} from "./web-client.service";
import {RestaurantService} from "./restaurant.service";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ConfigService,
    AuthenticationService,
    WebClientService,
    RestaurantService,
    RouterModule
  ],
  declarations: []
})
export class CoreModule { }
