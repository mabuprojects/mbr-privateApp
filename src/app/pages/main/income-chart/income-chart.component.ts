import { Component, OnInit } from '@angular/core';
import {OrderChartService} from "../order-chart.service";

@Component({
  selector: 'app-income-chart',
  templateUrl: './income-chart.component.html',
  styleUrls: ['./income-chart.component.css']
})
export class IncomeChartComponent implements OnInit{


  public lineChartData:Array<any> = [{data: [0,0,0,0,0,0] ,label: 'Ingresos'}];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(248,159,177,0.2)',
      borderColor: 'rgba(248,159,177,1)',
      pointBackgroundColor: 'rgba(248,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(248,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';


  private months = ['Enero','Febrero','marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  constructor(private orderChartService:OrderChartService) {


  }

  ngOnInit(): void {

    this.lineChartLabels = this.getLastNMonths(6);

    this.orderChartService.getOrderChartData().subscribe(e=>{
      console.log("called");
      this.lineChartLabels = e.map(month=>this.months[month.month-1]);
      this.lineChartData = [{data: e.map(month=>month.money),label: 'Ingresos'}];

    });
  }


  private getLastNMonths(months:number):Array<any>{
    if (months > 12 || months < 1){
      months = 12;
    }
    let currentMonth = new Date().getMonth();

    let nextMonth = currentMonth - months;
    let result = [];
    for (let i = 0; i < months; i++){
      nextMonth = nextMonth +1;
      result.push(this.months[nextMonth < 0 ? nextMonth+12 : nextMonth]);
    }

    return result;
  }


}

