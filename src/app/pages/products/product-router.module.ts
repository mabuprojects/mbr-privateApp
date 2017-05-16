import {Routes} from "@angular/router";
import {ProductsPageComponent} from "./product-page/products-page.component";
import {CreateEditProductComponent} from "./create-edit-product/create-edit-product.component";
import {DetailsProductsComponent} from "./details-products/details-products.component";

export const productRoutes: Routes = [
  {path: '', component: ProductsPageComponent},
  {path: ':productName', component: DetailsProductsComponent},
  {path: 'new', component: CreateEditProductComponent},
  {path: 'edit/:productName', component: CreateEditProductComponent}
]
