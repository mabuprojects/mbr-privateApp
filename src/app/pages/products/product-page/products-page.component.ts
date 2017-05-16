import {Component, OnInit, EventEmitter} from "@angular/core";
import {Observable} from "rxjs";
import {MaterializeAction} from "angular2-materialize/dist";
import {Product} from "../../../core/model/product.component";
import {ProductService} from "../product.service";


@Component({
  selector: 'app-products-page',
  templateUrl: 'products-page.component.html',
  styles: [`.small-button-list{top: -7px;margin-right: 4px;}
           .small-button-top{top:16px;margin-right: 4px;}`]
})
export class ProductsPageComponent implements OnInit {

  error = false;
  errorMessage = '';

  products: Observable<Product[]>;

  toastDeleteActions = new EventEmitter<string|MaterializeAction>();

  toastUpdateActions = new EventEmitter<string|MaterializeAction>();

  constructor(private productService: ProductService) {
    this.products = this.productService.getProductsObservable();
  }

  ngOnInit() {
    this.productService.getProducts(false);
  }

  refresh():void{
    this.productService.getProducts(true);
    this.toastUpdateActions.emit('toast');
  }


}
