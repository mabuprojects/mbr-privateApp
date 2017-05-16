import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {MainPageComponent} from "../../pages/main/main-page.component";
import {AuthGuard} from "../../routing/auth-guard.service";
import {MainContainerComponent} from "./main-container.component";
import {RoleGuard} from "../../routing/role-guard.service";
import {EmployeeModule} from "../../pages/user/employee.module";
import {UploadFileComponent} from "../../pages/upload-file/upload-file.component";
import {orderRoutes} from "../../pages/order/order-router.module";
import {categoryRoutes} from "../../pages/category/category-router.module";
import {taxeRoutes} from "../../pages/taxe/taxe-router.module";
import {productRoutes} from "../../pages/products/product-router.module";
import {employeeRoutes} from "../../pages/user/employee-routing.module";
import {restaurantRoutes} from "../../pages/restaurant/restaurant-router";
import {mainRoutes} from "../../pages/main/main-routing.module";


const mainContainerRoutes = [
  {
    path: '',
    component: MainContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', children: [...mainRoutes]},
      {path: 'mainpage', children: [...mainRoutes]},
      {path: 'user', children: [...employeeRoutes]},
      {path: 'order', children: [...orderRoutes]},
      {path: 'category', children: [...categoryRoutes]},
      {path: 'taxe', children: [...taxeRoutes]},
      {path: 'product', children: [...productRoutes]},
      {path: 'restaurant', children: [...restaurantRoutes]},
      {path: 'file', component: UploadFileComponent}
    ]
  }
];
@NgModule({
  imports: [
    EmployeeModule,
    RouterModule.forChild(mainContainerRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [AuthGuard, RoleGuard]
})
export class MainContainerRoutingModule {
}
