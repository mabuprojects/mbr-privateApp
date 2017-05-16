import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../../core/model/product.component";
import {ProductService} from "../product.service";

@Component({
  selector: 'app-details-products',
  templateUrl: './details-products.component.html'
})
export class DetailsProductsComponent implements OnInit {
  private selectedProduct: Product;

  constructor(private route: ActivatedRoute,
              private productService: ProductService) {
  }
  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.productService
          .getProductByName(params['productName'], false)
          .subscribe(rs => {
            this.selectedProduct = rs
          });
      }
    );
  }


}
