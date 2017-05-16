import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CreateProductStep2Component} from "./create-product-step2/create-product-step2.component";
import {FormGroup} from "@angular/forms";
import {CreateProductStep3Component} from "./create-product-step3/create-product-step3.component";

@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html'
})
export class CreateEditProductComponent implements OnInit {
  openMode: string;
  productFormStep1: FormGroup;
  productFormStep2: FormGroup;
  hideStep1:boolean=false;
  hideStep2:boolean=true;
  hideStep3:boolean=true;

  productName: string;

  @ViewChild(CreateProductStep2Component)
  private step2: CreateProductStep2Component;

  @ViewChild(CreateProductStep3Component)
  private step3: CreateProductStep3Component;

  constructor(
                private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    //Si la página recibe el nombre de un product el modo de apertura es EDIT, sino NEW
    this.route.params.subscribe(params => {
      this.productName = params['productName']
    });

    this.openMode = (this.productName) ? "EDIT" : "NEW";

  }

  onSaveStep1(productForm: FormGroup) {
    this.productFormStep1=productForm;
    this.hideStep1=true;
    this.hideStep2=false;
    this.step2.initComponent(productForm);
  }

  onSaveStep2(productForm: FormGroup) {
    this.productFormStep2=productForm;
    this.hideStep2=true;
    this.hideStep3=false;
    this.step3.initComponent(productForm);
  }

  onBackStep2(){
    this.hideStep1=false;
    this.hideStep2=true;
  }

  onBackStep3(){
    this.hideStep2=false;
    this.hideStep3=true;
  }

}

