import {Injectable} from "@angular/core";
import {ReplaySubject, Observable} from "rxjs";
import {Response} from "@angular/http";
import {Order} from "../../core/model/order/order.component";
import {WebClientService} from "../../core/web-client.service";
import {ConfigService} from "../../core/config.service";
import {Exception} from "../../core/exception.component";
/**
 * Created by alejandro on 15/04/17.
 */
@Injectable()
export class OrderService {

  orders: Order[];
  ordersObservable: ReplaySubject<Order[]>;
  private restaurantId: number = 1;

  constructor(private webClient: WebClientService, private configService: ConfigService) {
    this.ordersObservable = new ReplaySubject(1);

  }

  getOrdersObservable(): Observable<Order[]> {
    return this.ordersObservable;
  }

  /**
   *Emite los pedidos
   *
   * @param refresh Si quieres forzar la petición
   * @returns {any}
   */
  getOrders(refresh: boolean): void {

    var request: boolean = true;

    if (this.orders) {
      request = false;
    }

    request = refresh ? true : request;

    if (request) {
      //No ha realizado la petición o quiere forzarla
      this.webClient.secureGet(this.configService.getUrl('order') + "/" + this.restaurantId)
        .map(response => {
          this.orders = response.json();
          this.ordersObservable.next(this.orders);
        })
        .catch(this.handleError)
        .subscribe();
    }

  }


  /**
   *Emite los pedidos
   *
   * @param refresh Si quieres forzar la petición
   * @returns {any}
   */
  getOrdersByClient(refresh: boolean): void {

    var request: boolean = true;

    if (this.orders) {
      request = false;
    }

    request = refresh ? true : request;

    if (request) {
      //No ha realizado la petición o quiere forzarla
      this.webClient.secureGet(this.configService.getUrl('orderByClient'))
        .map(response => {
          this.orders = response.json();
          this.ordersObservable.next(this.orders);
        })
        .catch(this.handleError)
        .subscribe();
    }

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


  /**
   * Actualiza un restaurante
   *
   * @param restaurant
   * @returns {Observable<R>}
   */
  changeOrderStatus(orderId: number, currentState: string): void {

    let stateEndpoint: string = this.getOrderStatusEndpoint(currentState);
    this.webClient.securePatch(this.configService.getUrl('order') + "/" + orderId + "/" + stateEndpoint, "")
      .map((response: Response) => {
        this.getOrders(true);
      })
      .catch(this.handleError)
      .subscribe();
  }

  private getOrderStatusEndpoint(state: string): string {
    switch (state) {
      case 'PAID': {
        return 'cook';
      }
      case 'NOPAID': {
        return 'cook';
      }
      case 'COOKING': {
        return 'send';
      }
      case 'SENDED': {
        return 'close'
      }
      default:
        return '';
    }
  }


  setRestaurantId(id: number) {
    this.restaurantId = id;
    this.getOrders(true);
  }

}
