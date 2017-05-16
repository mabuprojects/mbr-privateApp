import {TaxesPageComponent} from "./taxes-page/taxes-page.component";
import {CreateEditTaxeComponent} from "./create-edit-taxe/create-edit-taxe.component";
import {Routes} from "@angular/router";


export const taxeRoutes: Routes = [
  {path: '', component: TaxesPageComponent},
  {path: 'new', component: CreateEditTaxeComponent},
  {path: 'edit/:taxeName', component: CreateEditTaxeComponent},
];
