import {Component, OnInit, EventEmitter} from "@angular/core";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/switchMap";
import {MaterializeAction} from "angular2-materialize/dist";
import {Observable} from "rxjs";
import {Restaurant} from "../../../core/model/restaurant/restaurant.component";
import {RestaurantService} from "../../../core/restaurant.service";


@Component({
  selector: 'app-restaurants-page',
  templateUrl: 'restaurants-page.component.html',
  styles: [`.small-icon{margin: -3px 3px 0px 3px;}
           .small-padding-sides{top:3px;margin-right: 4px;}
           .small-button-list{top: -7px;margin-right: 4px;}
            .small-button-top{top:16px;margin-right: 4px;}`]
})

export class RestaurantsPageComponent implements OnInit {


  restaurants: Observable<Restaurant[]>;

  error = false;
  errorMessage = '';

  toastDeleteActions = new EventEmitter<string|MaterializeAction>();

  toastUpdateActions = new EventEmitter<string|MaterializeAction>();

  constructor(private restaurantService: RestaurantService) {
    this.restaurants = this.restaurantService.getRestaurantsObservable();
  }

  ngOnInit(): void {
    this.restaurantService.getRestaurants(false);
  }

  deleteRestaurant(restaurantId: number): void {
    this.restaurantService.deleteRestaurante(restaurantId).subscribe(
      result => {
        if (result) {
          this.toastDeleteActions.emit('toast');
          this.restaurantService.getRestaurants(true);
        }
      },
      (err) => {
        this.error = true;
        this.errorMessage = err.message;
      });
  }


  refresh():void{
    this.restaurantService.getRestaurants(true);
    this.toastUpdateActions.emit('toast');
  }

  calendarOptions:Object = {
    height: 'parent',
    fixedWeekCount : false,
    editable: true,
    locale: 'es',
    header:{
      left:   'title',
      center: '',
      right:  'today month agendaDay prev,next'
    }

  };
}
