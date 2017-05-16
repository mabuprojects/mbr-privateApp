import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import {WebClientService} from "../../core/web-client.service";
import {ConfigService} from "../../core/config.service";

@Injectable()
export class OrderChartService {

  private orderChartData: ReplaySubject<OrderChart[]>;

  constructor(private webClient:WebClientService,private configService:ConfigService) {

    this.orderChartData = new ReplaySubject<OrderChart[]>(1);
    this.getOrderData();
  }


  getOrderChartData(): Observable<OrderChart[]>{
    return this.orderChartData;
  }


  getOrderData(): void {
      //No ha realizado la petición o quiere forzarla
      this.webClient.secureGet(this.configService.getUrl('orderStatistics')+'/month6')
        .map(response => {
          this.orderChartData.next(response.json());
        })
        .subscribe();
    }
}

interface OrderChart{
  month:number;
  sales:number;
  money:number;
}
