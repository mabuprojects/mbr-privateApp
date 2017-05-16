import {Component, OnInit, Input} from '@angular/core';
import {Order} from "../../../../core/model/order/order.component";
import {OrderService} from "../../order.service";
import {Observable} from "rxjs";
import {ConfigService} from "../../../../core/config.service";
@Component({
  selector: 'app-order',
  templateUrl: 'order.component.html',
  styleUrls: ['order.component.css']
})
export class OrderComponent implements OnInit {


  @Input() order: Order;
  height = 0;
  whatTime;

  imageUrl:string;
  constructor(private orderService: OrderService,private configService:ConfigService) {
      this.imageUrl = configService.getUrl('image');
  }

  ngOnInit() {
    this.order.estimatedPickupOrDeliveryTime = new Date(this.order.estimatedPickupOrDeliveryTime);
    let date = new Date(this.order.estimatedPickupOrDeliveryTime);
    this.whatTime = Observable.interval(1000)
      .map(x => {
        return this.getHoursMinSec(date.getTime());
      }).share();
  }

  changeState() {
    this.orderService.changeOrderStatus(this.order.id, this.order.status);
  }

  private getHoursMinSec(date_future){
    // get total seconds between the times
    var delta = Math.abs(date_future - new Date().getTime()) / 1000;

// calculate (and subtract) whole days
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

// calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

// calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

// what's left is seconds
    var seconds = Math.floor(delta % 60);

    return {hours:(hours+days*24),min:minutes, sec:seconds, total:date_future};
  }
}
