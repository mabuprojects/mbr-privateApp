import {Routes} from "@angular/router";
import {CreateEditCategoryComponent} from "./create-edit-category/create-edit-category.component";
import {CategoryPageComponent} from "./category-page/category-page.component";


export const categoryRoutes: Routes = [
    {path: '', component: CategoryPageComponent},
    {path: 'new', component: CreateEditCategoryComponent},
    {path: 'edit/:categoryName', component: CreateEditCategoryComponent} ] ;
