import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {Observable, ReplaySubject} from "rxjs";
import "rxjs/Rx";
import {Product} from "../../core/model/product.component";
import {Restaurant} from "../../core/model/restaurant/restaurant.component";
import {ConfigService} from "../../core/config.service";
import {WebClientService} from "../../core/web-client.service";
import {ProductDetails} from "../../core/model/product-details.component";
import {Option} from "../../core/model/option.component";
import {OptionLine} from "../../core/model/option-line.component";
import {OptionLinePrice} from "../../core/model/option-line-price.component";
import {Exception} from "../../core/exception.component";

@Injectable()
export class ProductService {

  products: Product[];

  productsRestaurant: Product[];

  productsObservable: ReplaySubject<Product[]>;

  productsRestaurantObservable: ReplaySubject<Product[]>;

  restaurant: Restaurant = new Restaurant();

  constructor(private webClientService: WebClientService, private configService: ConfigService) {
    this.restaurant.name = "";
    this.productsObservable = new ReplaySubject(1);
    this.productsRestaurantObservable = new ReplaySubject(1);
  }


  getProductsObservable(): Observable<Product[]> {
    return this.productsObservable;
  }

  getProductsRestaurantObservable(): Observable<Product[]> {
    return this.productsRestaurantObservable;
  }

  /**
   *Obtiene todos los productos
   *
   * @param refresh Si quieres forzar la petición
   * @returns {any}
   */
  getProducts(refresh: boolean): void {

    var request: boolean = true;

    if (this.products) {
      request = false;
    }

    request = refresh ? true : request;

    if (request) {
      //No ha realizado la petición o quiere forzarla
      this.webClientService.secureGet(this.configService.getUrl('product'))
        .map(response => {
          this.products = response.json();
          this.productsObservable.next(this.products);
        })
        .catch(this.handleError)
        .subscribe();
    }
  }


  /**
   * Obtiene un producto
   *
   * @param productName
   * @param refresh
   * @returns {any}
   */
  getProductByName(productName: string, refresh: boolean): Observable<Product> {
    if (!refresh && this.products) {
      //Ya he realizado esta petición
      return Observable.of(this.products.find(p => p.name === productName));
    } else {
      //No ha realizado la petición o quiere forzarla
      return this.webClientService.secureGet(this.configService.getUrl('product'))
        .map(response => {
          this.products = response.json() as Product[];
          return this.products.find(p => p.name === productName)
        })
        .catch(this.handleError);
    }
  }

  /**
   * Obtiene un producto
   *
   * @param productName
   * @param refresh
   * @returns {any}
   */
  getProduct(productId: number, refresh: boolean): Observable<Product> {
    if (!refresh && this.products) {
      //Ya he realizado esta petición
      return Observable.of(this.products.find(p => p.id === productId));
    } else {
      //No ha realizado la petición o quiere forzarla
      return this.webClientService.secureGet(this.configService.getUrl('product'))
        .map(response => {
          this.products = response.json() as Product[];
          return this.products.find(p => p.id === productId)
        })
        .catch(this.handleError);
    }
  }


  /**
   * Obtiene un producto
   *
   * @param productName
   * @param refresh
   * @returns {any}
   */
  getProductRestaurant(productId: number, refresh: boolean): Observable<Product> {
    if (!refresh && this.products) {
      //Ya he realizado esta petición
      return Observable.of(this.filterProductByRestaurant(this.products.find(p => p.id === productId) as Product, this.restaurant.id));
    } else {
      //No ha realizado la petición o quiere forzarla
      return this.webClientService.secureGet(this.configService.getUrl('product'))
        .map(response => {
          this.products = response.json() as Product[];
          return this.filterProductByRestaurant(this.products.find(p => p.id === productId) as Product, this.restaurant.id)
        })
        .catch(this.handleError);
    }
  }

  /**
   * Obtiene un producto
   *
   * @param productName
   * @param refresh
   * @returns {any}
   */
  getProductRestaurantByName(productName: string, refresh: boolean): Observable<Product> {
    if (!refresh && this.products) {
      //Ya he realizado esta petición
      return Observable.of(this.filterProductByRestaurant(this.products.find(p => p.name === productName) as Product, this.restaurant.id));
    } else {
      //No ha realizado la petición o quiere forzarla
      return this.webClientService.secureGet(this.configService.getUrl('product'))
        .map(response => {
          this.products = response.json() as Product[];
          return this.filterProductByRestaurant(this.products.find(p => p.name === productName) as Product, this.restaurant.id)
        })
        .catch(this.handleError);
    }
  }


  /**
   * Set restaurant selected
   * @param restaurant
   */
  setRestaurant(restaurant: Restaurant): void {
    this.restaurant = restaurant;
    this.getFilterProductsByRestaurant(restaurant.id, false);
  }

  /**
   * Get restaurant selected
   * @param restaurant
   */
  getRestaurant(): Restaurant {
    return this.restaurant;
  }


  /**
   * Devuelve todos los productos de un restaurante
   * @param restaurantId
   * @param refresh
   * @returns {any}
   */
  getFilterProductsByRestaurant(restaurantId: number, refresh: boolean): void {
    var request: boolean = true;

    if (this.products) {
      request = false;
    }

    request = refresh ? true : request;

    if (request) {
      //No ha realizado la petición o quiere forzarla
      this.webClientService.secureGet(this.configService.getUrl('product'))
        .map(response => {
          this.products = response.json();
          this.productsRestaurantObservable.next(this.filterProductsByRestaurant(this.products, restaurantId));
        })
        .catch(this.handleError)
        .subscribe();
    } else {
      this.productsRestaurantObservable.next(this.filterProductsByRestaurant(this.products, restaurantId));
    }
  }

  /**
   * Devuelve los productos asociados a un restaurante (INTERNA)
   * @param products
   * @param restaurantId
   * @returns {Product[]}
   */
  filterProductsByRestaurant(products: Product[], restaurantId: number): Product[] {
    var newProducts: Product[] = new Array<Product>();

    for (let p of products) {
      var product = this.filterProductByRestaurant(p, restaurantId);
      if (product) {
        newProducts.push(product);
      }
    }
    return newProducts;
  }


  /**
   * Devuelve un producto asociado a un restaurante (INTERNA)
   * @param products
   * @param restaurantId
   * @returns {Product[]}
   */
  filterProductByRestaurant(p: Product, restaurantId: number): any {

    var newProduct = new Product();
    newProduct.productDetails = new Array<ProductDetails>();
    newProduct.options = new Array<Option>();

    for (let pd of p.productDetails) {
      if (pd.restaurantId === restaurantId) {
        newProduct.id = p.id;
        newProduct.name = p.name;
        newProduct.category = p.category;
        newProduct.description = p.description;
        newProduct.taxe = p.taxe;
        newProduct.created = p.created;
        newProduct.productDetails.push(pd);
        newProduct.imageName = p.imageName;
      }
    }

    for (let o of p.options) {
      var option = new Option();
      option.name = o.name;
      option.id = o.id;
      option.main = o.main;
      option.optionLines = new Array<OptionLine>();
      for (let ol of o.optionLines) {
        var optionLine = new OptionLine;
        optionLine.name = ol.name;
        optionLine.id = ol.id;
        optionLine.optionLinePrices = new Array<OptionLinePrice>();
        for (let olp of ol.optionLinePrices) {
          if (olp.restaurantId == restaurantId) {
            optionLine.optionLinePrices.push(olp);
          }
        }
        if (optionLine.optionLinePrices.length > 0) {
          option.optionLines.push(optionLine);
        }

      }
      if (option.optionLines.length > 0) {
        newProduct.options.push(option);
      }
    }

    if (newProduct.id) {
      return newProduct;
    } else {
      return null;
    }

  }


  private handleError(error: Response) {
    if (error.status == 400) {
      return Observable.throw(error.json() as Exception);
    }
    return Observable.throw(error.json());

  }

  createProduct(product: Product): Observable<boolean> {

    let body = JSON.stringify(product);

    return this.webClientService.securePost(this.configService.getUrl('product'), body)
      .map((response: Response) => {
        return true
      })
      .catch(this.handleError);
  }

}
