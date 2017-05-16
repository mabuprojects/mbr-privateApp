import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {FormGroup, FormBuilder} from "@angular/forms";
import {Order} from "../../../core/model/order/order.component";
import {Restaurant} from "../../../core/model/restaurant/restaurant.component";
import {OrderService} from "../order.service";
import {RestaurantService} from "../../../core/restaurant.service";

@Component({
  selector: 'app-order-page',
  templateUrl: 'order-page.component.html',
  styleUrls: ['order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  orders: Observable<Order[]>;
  restaurants: Observable<Restaurant[]>;
  restaurantForm: FormGroup;

  constructor(private orderService: OrderService, private restaurantService: RestaurantService, private formBuilder: FormBuilder) {
    this.orders = this.orderService.getOrdersObservable();
    this.restaurants = this.restaurantService.getRestaurantsObservable();
    this.restaurantForm = this.formBuilder.group({
      restaurant: ['']
    });


    this.restaurantForm.controls["restaurant"].valueChanges
      .debounceTime(100) // wait a litle after the user input (ms)
      .subscribe(restaurantId => {
        this.orderService.setRestaurantId(restaurantId);
      });

  }

  ngOnInit() {
    this.restaurantService.getRestaurants(false);

    this.restaurants.subscribe((restaurants: Restaurant[]) => {
        this.orderService.setRestaurantId(restaurants[0].id);
      }
    )
  }
}
