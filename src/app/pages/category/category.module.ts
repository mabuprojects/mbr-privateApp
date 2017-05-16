import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {CreateEditCategoryComponent} from "./create-edit-category/create-edit-category.component";
import {CategoryPageComponent} from "./category-page/category-page.component";
import {WebClientService} from "../../core/web-client.service";
import {ConfigService} from "../../core/config.service";
import {CategoryService} from "./category.service";
import {CoreModule} from "../../core/core.module";
import {MaterializeModule} from "angular2-materialize/dist";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MaterializeModule,
    CoreModule,
    RouterModule
  ],
  declarations: [CreateEditCategoryComponent,CategoryPageComponent],
  providers:[WebClientService,ConfigService,CategoryService]
})
export class CategoryModule { }
