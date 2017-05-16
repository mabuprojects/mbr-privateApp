import {Component, OnInit, EventEmitter, Output} from "@angular/core";
import {CreateProductGeneric} from "../create-product-generic.component";
import {FormBuilder, FormArray, FormGroup, Validators} from "@angular/forms";
import {MaterializeAction} from "angular2-materialize/dist";
import {Category} from "../../../../core/model/category.component";
import {Taxe} from "../../../../core/model/taxe.component";
import {ProductService} from "../../product.service";
import {TaxeService} from "../../../taxe/taxe.service";
import {CategoryService} from "../../../category/category.service";
import {RestaurantService} from "../../../../core/restaurant.service";
import {Restaurant} from "../../../../core/model/restaurant/restaurant.component";
@Component({
  selector: 'app-create-product-step3',
  templateUrl: 'create-product-step3.component.html'
})
export class CreateProductStep3Component extends CreateProductGeneric implements OnInit {

  productForm: FormGroup;

  toastActions = new EventEmitter<string|MaterializeAction>();

  error = false;
  errorMessage = '';

  categories: Category[];
  restaurants: Restaurant[];
  taxes: Taxe[];

  @Output() onBack = new EventEmitter<boolean>();


  constructor(public fb: FormBuilder,private productService: ProductService, private restaurantService: RestaurantService, private taxeService: TaxeService,
              private categoryService: CategoryService,) {
    super(fb);
  }

  ngOnInit() {
    this.getRestaurants();
    this.getTaxes();
    this.getCategories();
    this.productForm = this.createProductForm(this.createEmptyProduct());
  }

  initComponent(productForm: FormGroup) {
    this.productForm = productForm;

    const formModel = productForm.value;
    var indexOption = 0;
    var indexOptionLine = 0;

    for (let pd of formModel.productDetails) {
      for (let o of  formModel.options) {
        for (let ol of o.optionLines) {
          this.addOptionLinePrices(indexOption, indexOptionLine, pd.restaurantId);
          indexOptionLine++;
        }
        indexOption++;
      }
      indexOptionLine = 0;
      indexOption = 0;
    }

    debugger;
  }

  back() {
    this.onBack.emit(true);
  }

  onSubmit() {
    var product = this.prepareSaveProduct(this.productForm, this.createEmptyProduct(), this.categories, this.taxes);


    this.productService.createProduct(product).subscribe(
      result => {
        if (result) {
          this.toastActions.emit('toast');
          this.restaurantService
            .getRestaurants(true);
        }
      },
      (err) => {
        this.error = true;
        this.errorMessage = err.message;
      });

  }


  addOptionLinePrices(indexOption: number, indexOptionLine: number, restaurantId: number) {
    this.getOptionLinePrices(indexOption, indexOptionLine).push(
      this.fb.group({
        id:null,
        restaurantId: [restaurantId, Validators.required],
        priceAdded: ['', Validators.required]
      }))
  }

  getOptionLinePrices(indexOption: number, indexOptionLine: number): FormArray {
    var formArrayOption: FormArray = this.productForm.get('options') as FormArray;
    var formArrayOptionLine: FormArray = formArrayOption.controls[indexOption].get('optionLines') as FormArray;
    return formArrayOptionLine.controls[indexOptionLine].get('optionLinePrices') as FormArray;
  };


  deleteOptionLinePrices(indexOption: number, indexOptionLine: number, indexOptionLinePrice: number) {
    this.getOptionLinePrices(indexOption, indexOptionLine).removeAt(indexOptionLine);
  }

  get options(): FormArray {
    return this.productForm.get('options') as FormArray;
  };

  getOptionLines(indexOption: number): FormArray {
    var formArray: FormArray = this.productForm.get('options') as FormArray;
    return formArray.controls[indexOption].get('optionLines') as FormArray;
  };

  getRestaurantName(restuarantId: string) {
    return this.restaurants.find(r => r.id === +restuarantId).name;
  }

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
