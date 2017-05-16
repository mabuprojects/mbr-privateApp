import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {CoreModule} from "../../core/core.module";
import {RouterModule} from "@angular/router";
import {MaterializeModule} from "angular2-materialize/dist";
import {MainPageComponent} from "./main-page.component";
import {ChartsModule} from "ng2-charts";
import { OrderChartComponent } from './order-chart/order-chart.component';
import {OrderChartService} from "./order-chart.service";
import {IncomeChartComponent} from "./income-chart/income-chart.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule,
    MaterializeModule,
    ChartsModule
  ],
  declarations: [MainPageComponent, OrderChartComponent,IncomeChartComponent],
  providers: [OrderChartService]
})
export class MainModule { }
