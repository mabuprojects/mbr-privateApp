import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {ErrorCardComponent} from "./error-card/error-card.component";
import {MaterializeInputDirective} from "./materialize-input/materialize-input.directive";
import {MaterializeModule} from "angular2-materialize/dist";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterializeModule
  ],
  declarations: [NavBarComponent, ErrorCardComponent,MaterializeInputDirective ],
  exports: [NavBarComponent, ErrorCardComponent,MaterializeInputDirective]
})
export class SharedModule {
}
