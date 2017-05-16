import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MainContainerComponent} from "./main-container.component";
import {MaterializeModule} from "angular2-materialize/dist";
import {MainContainerRoutingModule} from "./main-container-routing.module";
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {EmployeeModule} from "../../pages/user/employee.module";
import {SidebarEntryComponent} from "../sidebar/sidebar-entry/sidebar-entry.component";
import {UploadFileComponent} from "../../pages/upload-file/upload-file.component";
import {SharedModule} from "../../shared/shared.module";
import {CategoryModule} from "../../pages/category/category.module";
import {OrderModule} from "../../pages/order/order.module";
import {AuthenticationService} from "../../core/authentication.service";
import {CoreModule} from "../../core/core.module";
import {TaxeModule} from "../../pages/taxe/taxe.module";
import {ProductModule} from "../../pages/products/product.module";
import {RestaurantModule} from "../../pages/restaurant/restaurant.module";
import {MainModule} from "../../pages/main/main.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterializeModule,
    EmployeeModule,
    CategoryModule,
    OrderModule,
    TaxeModule,
    ProductModule,
    RestaurantModule,
    MainModule,
    MainContainerRoutingModule,
    SharedModule,
    CoreModule,
    BrowserAnimationsModule
  ],
  declarations: [
    MainContainerComponent,
    SidebarComponent,
    SidebarEntryComponent,
    UploadFileComponent
  ],
  providers: [AuthenticationService],
})
export class MainContainerModule {
}
