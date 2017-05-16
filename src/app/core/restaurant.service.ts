import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";
import {Observable, ReplaySubject} from "rxjs";
import {Restaurant} from "./model/restaurant/restaurant.component";
import {ConfigService} from "./config.service";
import {Exception} from "./exception.component";

@Injectable()
export class RestaurantService {

    restaurants: Restaurant[];
    restaurantObservable: ReplaySubject<Restaurant>;
    restaurantsObservable: ReplaySubject<Restaurant[]>;

    constructor(private http: Http, private configService: ConfigService) {
        this.restaurantsObservable =new ReplaySubject(1);
        this.restaurantObservable = new ReplaySubject(1);

    }

    getRestaurantObservable(): Observable<Restaurant>{
        return this.restaurantObservable;
    }
    getRestaurantsObservable(): Observable<Restaurant[]>{
        return this.restaurantsObservable;
    }

    /**
     *Emite los restaurantes
     *
     * @param refresh Si quieres forzar la petición
     * @returns {any}
     */
    getRestaurants(refresh: boolean): void {

        var request: boolean = true;

        if (this.restaurants) {
            request = false;
        }

        request = refresh ? true : request;

        if (request) {
            //No ha realizado la petición o quiere forzarla
            this.http.get(this.configService.getUrl('restaurant'))
                .map(response => {
                    this.restaurants = response.json();
                    this.restaurantsObservable.next(this.restaurants);
                })
                .catch(this.handleError)
                .subscribe();
        }

    }


    /**
     * Eliminar restaurante
     * @param categoryId
     * @returns {Observable<R>}
     */
    deleteRestaurante(restaurantId: number): Observable<boolean> {
        return this.http.delete(this.configService.getUrl('restaurant') + `/${restaurantId}`)
            .map((response: Response) => {
                return true
            })
            .catch(this.handleError);
    }

    /**
     *Devuelve un restaurante por el nombre
     *
     * @param restaurantId
     * @param refresh
     * @returns {any}
     */
    getRestaurantByName(restaurantName: string, refresh: boolean): void{
        var request: boolean = true;

        if (this.restaurants) {
            request = false;
        }

        request = refresh ? true : request;

        if (request) {
            //No ha realizado la petición o quiere forzarla
            this.http.get(this.configService.getUrl('restaurant'))
                .map(response => {
                    this.restaurants = response.json();
                    this.restaurantObservable.next(this.restaurants.find(r => r.name === restaurantName) as Restaurant);
                })
                .catch(this.handleError)
                .subscribe();
        }else{
            this.restaurantObservable.next(this.restaurants.find(r => r.name === restaurantName) as Restaurant);
        }
    }

    /**
     * Crea un restaurante
     *
     * @param restaurant
     * @returns {Observable<R>}
     */
    createRestaurant(restaurant: Restaurant): Observable<boolean> {

        let body = JSON.stringify(restaurant);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.configService.getUrl('restaurant'), body, options)
            .map((response: Response) => {
                return true
            })
            .catch(this.handleError);
    }

    /**
     * Actualiza un restaurante
     *
     * @param restaurant
     * @returns {Observable<R>}
     */
    updateRestaurant(restaurant: Restaurant): Observable<boolean> {
        let body = JSON.stringify(restaurant);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.patch(this.configService.getUrl('restaurant'), body, options)
            .map((response: Response) => {
                return true
            })
            .catch(this.handleError);
    }

    /**
     * Devuelve true si hay algun restaurante con ese nombre
     *
     * @param restaurantName
     * @returns {Observable<R>}
     */
    existRestaurantName(restaurantName: string): Observable<boolean> {

        return this.http.get(`http://localhost:8080/public/restaurant/exists/${restaurantName}`)
            .map(response => {
                return response.json();
            })
            .catch(this.handleError);
    }


    /**
     * Maneja los errores
     * @param error
     * @returns {any}
     */
    private handleError(error: Response) {
        if (error.status == 400) {
            return Observable.throw(error.json() as Exception);
        }
        return Observable.throw(error.json());

    }

}
