import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormBuilder, FormArray, Validators, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../../../core/model/product.component";
import {Category} from "../../../../core/model/category.component";
import {Taxe} from "../../../../core/model/taxe.component";
import {ProductService} from "../../product.service";
import {TaxeService} from "../../../taxe/taxe.service";
import {CategoryService} from "../../../category/category.service";
import {RestaurantService} from "../../../../core/restaurant.service";
import {ProductDetails} from "../../../../core/model/product-details.component";
import {Option} from "../../../../core/model/option.component";
import {CreateProductGeneric} from "../create-product-generic.component";
import {Restaurant} from "../../../../core/model/restaurant/restaurant.component";


@Component({
  selector: 'app-create-product-step2',
  templateUrl: 'create-product-step2.component.html'
})
export class CreateProductStep2Component extends CreateProductGeneric implements OnInit {

  @Output() onBack = new EventEmitter<boolean>();

  @Output() onSave = new EventEmitter<FormGroup>();

  @Input() editProduct: Product;

  productForm: FormGroup;
  restaurantCount: number = 0;

  categories: Category[];
  restaurants: Restaurant[];
  taxes: Taxe[];

  states = ['VISIBLE', 'VISIBLE_BUY', 'HIDDEN', 'HISTORICAL'];

  constructor(private productService: ProductService,
              private taxeService: TaxeService,
              private categoryService: CategoryService,
              public fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private restaurantService: RestaurantService) {
    super(fb);
  }

  ngOnInit() {
    this.getRestaurants();
    this.productForm = this.createProductForm(this.createEmptyProduct());
  }

  initComponent(productForm: FormGroup) {
    this.productForm = productForm;
  }

  onSubmit() {
    this.onSave.emit(this.productForm);
  }

  back() {
    this.onBack.emit(true);
  }


  setProductDetails(productDetails: ProductDetails[]) {
    const productDetailsFGs = productDetails.map(pd =>
      this.fb.group({
        restaurantId: [pd.restaurantId, Validators.required],
        state: [pd.state, Validators.required],
        mainPage: [pd.mainPage, Validators.compose([Validators.required, this.greaterThan0])],
        price: [pd.price, Validators.compose([Validators.required, this.greaterThan0])]
      }));
    const productDetailsFormArray = this.fb.array(productDetailsFGs);
    this.productForm.setControl('productDetails', productDetailsFormArray);
  }

  setOptions(options: Option[]) {
    const optionsFGs = options.map(o =>
      this.fb.group({
        name: [o.name, Validators.required],
        optionLines: this.fb.array(o.optionLines.map(ol =>
          this.fb.group({
            name: [ol.name, Validators.required],
            optionLinePrices: this.fb.array(ol.optionLinePrices.map(olp => this.fb.group({
              restaurantId: [olp.restaurantId, Validators.required],
              priceAdded: [olp.priceAdded, Validators.required]
            })))
          })))
      }));
    const optionsFormArray = this.fb.array(optionsFGs);
    this.productForm.setControl('options', optionsFormArray);
  }

  formStep2Disable() {
    return this.productForm.controls['productDetails'].invalid;
  }


  //-----------------------------------------------
  //ADD ROWS

  addProductDetails(indexRestaurant: number) {

    this.productDetails.push(
      this.fb.group({
        id:null,
        restaurantId: ['', Validators.required],
        state: ['', Validators.required],
        mainPage: ['', Validators.compose([Validators.required, this.greaterThan0])],
        price: ['', Validators.compose([Validators.required, this.greaterThan0])]
      }));
  }


  // addOptionLinePrices(indexOption: number, indexOptionLine: number) {
  //   this.getOptionLinePrices(indexOption, indexOptionLine).push(
  //     this.fb.group({
  //       restaurantId: ['', Validators.required],
  //       priceAdded: ['', Validators.required]
  //     }))
  // }


  //-----------------------------------------------
  // DELETE ROWS
  deleteProductDetails(index: number) {
    this.productDetails.removeAt(index);
  }


//-----------------------------------------------
  // GET FORMS
  get productDetails(): FormArray {
    return this.productForm.get('productDetails') as FormArray;
  };

  // get options(): FormArray {
  //   return this.productForm.get('options') as FormArray;
  // };
  //
  // getOptionLines(indexOption: number): FormArray {
  //   var formArray: FormArray = this.productForm.get('options') as FormArray;
  //   return formArray.controls[indexOption].get('optionLines') as FormArray;
  // };
  //
  // getOptionLinePrices(indexOption: number, indexOptionLine): FormArray {
  //   var formArrayOption: FormArray = this.productForm.get('options') as FormArray;
  //   var formArrayOptionLine: FormArray = formArrayOption.controls[indexOption].get('optionLines') as FormArray;
  //   return formArrayOptionLine.controls[indexOptionLine].get('optionLinePrices') as FormArray;
  // };


  //-----------------------------------
  // GET DATA

  getCategories(): void {
    this.categoryService.getCategoriesObservable().subscribe(categories =>{
      this.categories=categories;
    });
    this.categoryService.getCategories(false);
  }

  getTaxes(): void {
    this.taxeService.getTaxesObservable().subscribe(taxes =>{
      this.taxes=taxes;
    });
    this.taxeService.getTaxes(false);
  }

  getRestaurants(): void {
    this.restaurantService.getRestaurantsObservable().subscribe(restaurants =>{
      this.restaurants=restaurants;
    });
    this.restaurantService.getRestaurants(false);
  }


}
