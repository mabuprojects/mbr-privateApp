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
import {CreateEditProductComponent} from "./create-edit-product/create-edit-product.component";
import {CreateProductStep1Component} from "./create-edit-product/create-product-step1/create-product-step1.component";
import {DetailsProductsComponent} from "./details-products/details-products.component";
import {ProductsPageComponent} from "./product-page/products-page.component";
import {CreateProductStep2Component} from "./create-edit-product/create-product-step2/create-product-step2.component";
import {CreateProductStep3Component} from "./create-edit-product/create-product-step3/create-product-step3.component";
import {ProductService} from "./product.service";
import {TaxeService} from "../taxe/taxe.service";
import {CategoryService} from "../category/category.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MaterializeModule,
    CoreModule,
    RouterModule
  ],
  declarations: [
    ProductsPageComponent,
    DetailsProductsComponent,
    CreateProductStep1Component,
    CreateEditProductComponent,
    CreateProductStep2Component,
    CreateProductStep3Component],
  providers: [WebClientService, ConfigService, ProductService, TaxeService, CategoryService, RestaurantService]
})
export class ProductModule {
}
