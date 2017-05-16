import {Routes} from "@angular/router";
import {RestaurantsPageComponent} from "./restaurant-page/restaurants-page.component";
import {CreateEditRestaurantComponent} from "./create-edit-restaurant/create-edit-restaurant.component";


export const restaurantRoutes: Routes = [
    {path: '', component: RestaurantsPageComponent},
    {path: 'new', component: CreateEditRestaurantComponent},
    {path: 'edit/:restaurantName', component: CreateEditRestaurantComponent}

  ];
