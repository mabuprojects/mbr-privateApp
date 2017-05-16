import {Component, OnInit, EventEmitter, Output} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";
import {MaterializeAction} from "angular2-materialize/dist";
import {CreateProductGeneric} from "../create-product-generic.component";
import {Observable} from "rxjs";
import {Product} from "../../../../core/model/product.component";
import {Category} from "../../../../core/model/category.component";
import {Taxe} from "../../../../core/model/taxe.component";
import {ProductService} from "../../product.service";
import {TaxeService} from "../../../taxe/taxe.service";
import {CategoryService} from "../../../category/category.service";
import {RestaurantService} from "../../../../core/restaurant.service";
import {ProductDetails} from "../../../../core/model/product-details.component";
import {Option} from "../../../../core/model/option.component";

@Component({
  selector: 'app-create-product-step1',
  templateUrl: 'create-product-step1.component.html'
})
export class CreateProductStep1Component extends CreateProductGeneric implements OnInit {

  @Output() onSave = new EventEmitter<FormGroup>();

  editProduct: Product;
  productForm: FormGroup;
  productName: string;
  openMode: string;

  toastCreateActions = new EventEmitter<string|MaterializeAction>();
  toastUpdateActions = new EventEmitter<string|MaterializeAction>();

  categories: Observable<Category[]>;
  taxes: Observable<Taxe[]>;

  states = ['VISIBLE', 'VISIBLE_BUY', 'HIDDEN', 'HISTORICAL'];

  error = false;
  errorMessage = '';

  constructor(private productService: ProductService,
              private taxeService: TaxeService,
              private categoryService: CategoryService,
              public fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private restaurantService: RestaurantService) {
    super(fb);
    this.categories = this.categoryService.getCategoriesObservable();
    this.taxes = this.taxeService.getTaxesObservable();
  }

  ngOnInit() {
    this.categoryService.getCategories(false);
    this.taxeService.getTaxes(false);

    //Si la página recibe el nombre de un restaurante el modo de apertura es EDIT, sino NEW
    this.route.params.subscribe(params => {
      this.productName = params['productName']
    });
    this.openMode = (this.productName) ? "EDIT" : "NEW";

    if (this.openMode === "EDIT") {
      this.productService
        .getProductByName(this.productName, false)
        .subscribe(p => {
          this.editProduct = p;
          this.createForm(this.editProduct);
        });
    } else {
      //openMode == NEW
      this.editProduct = this.createEmptyProduct();
      this.createForm(this.editProduct);
    }
  }

  createForm(editProduct: Product): void {
    this.productForm = this.createProductForm(editProduct);
    this.setProductDetails(editProduct.productDetails);
    this.setOptions(editProduct.options);
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
            optionLinePrices: this.fb.array([])
          })))
      }));
    const optionsFormArray = this.fb.array(optionsFGs);
    this.productForm.setControl('options', optionsFormArray);
  }


  onSubmit() {
    this.onSave.emit(this.productForm);
  }


  //FALTA COMPRO
  formStep1Disable() {
    if (
      this.productForm.controls['name'].invalid ||
      this.productForm.controls['description'].invalid ||
      this.productForm.controls['category'].invalid ||
      this.productForm.controls['taxe'].invalid
    ) {
      return true
    } else {

      if (this.productForm.controls['options'].get('name')) {
        // var options: FormArray = this.productForm.controls['options'];
        //
        //  options.controls.forEach(control => {
        //   if (control.get('name').invalid){
        //    return true;
        //  });


      }
    }
    return false
  }


  //-----------------------------------------------
  //ADD ROWS


  addOptions() {
    this.options.push(
      this.fb.group({
        id: null,
        name: ['', Validators.required],
        optionLines: this.fb.array([])
      }));
  }

  addOptionLines(indexOption: number) {
    var formgroup = this.fb.group({
      id: null,
      name: ['', Validators.required],
      optionLinePrices: this.fb.array([])
    });
    /*Si no tiene ninguna opción todavía se crean 2 porque es el mínimo
     de opciones*/
    if (this.getOptionLines(indexOption).length === 0) {
      this.getOptionLines(indexOption).push(formgroup);
    }
    this.getOptionLines(indexOption).push(formgroup);
  }


  //-----------------------------------------------
  // DELETE ROWS


  deleteOptions(index: number) {
    this.options.removeAt(index);
  }

  deleteOptionLines(indexOption: number, indexOptionLine: number) {
    this.getOptionLines(indexOption).removeAt(indexOptionLine);
  }


  //-----------------------------------------------
  // GET FORMS


  get options(): FormArray {
    return this.productForm.get('options') as FormArray;
  };

  getOptionLines(indexOption: number): FormArray {
    var formArray: FormArray = this.productForm.get('options') as FormArray;
    return formArray.controls[indexOption].get('optionLines') as FormArray;
  };

}
