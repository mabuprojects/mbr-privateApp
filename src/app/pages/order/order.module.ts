import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {WebClientService} from "../../core/web-client.service";
import {ConfigService} from "../../core/config.service";
import {OrderService} from "./order.service";
import {OrderPageComponent} from "./order-page/order-page.component";
import {OrderComponent} from "./order-page/order-line/order.component";
import {OrderFilterPipe} from "./order-filter.pipe";
import {CoreModule} from "../../core/core.module";
import {RestaurantService} from "../../core/restaurant.service";
import {MaterializeModule} from "angular2-materialize/dist";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    //OrderRouter,
    SharedModule,
    MaterializeModule,
    CoreModule
  ],
  declarations: [
    OrderPageComponent,
    OrderComponent,
    OrderFilterPipe],
  providers: [WebClientService, ConfigService, OrderService, RestaurantService],
})
export class OrderModule {
}
