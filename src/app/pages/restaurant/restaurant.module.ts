import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {WebClientService} from "../../core/web-client.service";
import {ConfigService} from "../../core/config.service";
import {CoreModule} from "../../core/core.module";
import {MaterializeModule} from "angular2-materialize/dist";
import {RouterModule} from "@angular/router";
import {RestaurantService} from "../../core/restaurant.service";
import {RestaurantsPageComponent} from "./restaurant-page/restaurants-page.component";
import {CreateEditRestaurantComponent} from "./create-edit-restaurant/create-edit-restaurant.component";
import { TimeTableFilterPipe } from './time-table-filter.pipe';
import {CalendarComponent} from "ap-angular2-fullcalendar";
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MaterializeModule,
    CoreModule,
    RouterModule
  ],
  declarations: [CreateEditRestaurantComponent, RestaurantsPageComponent, TimeTableFilterPipe,CalendarComponent],
  providers: [WebClientService, ConfigService, RestaurantService]
})
export class RestaurantModule {
}
