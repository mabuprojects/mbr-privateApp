import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {WebClientService} from "../../core/web-client.service";
import {ConfigService} from "../../core/config.service";
import {CoreModule} from "../../core/core.module";
import {TaxeService} from "./taxe.service";
import {MaterializeModule} from "angular2-materialize/dist";
import {TaxesPageComponent} from "./taxes-page/taxes-page.component";
import {CreateEditTaxeComponent} from "./create-edit-taxe/create-edit-taxe.component";
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
  declarations: [TaxesPageComponent,CreateEditTaxeComponent],
  providers: [WebClientService, ConfigService, TaxeService]
})
export class TaxeModule {
}
