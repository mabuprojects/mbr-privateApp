import {ReuseFormComponent} from "../../../shared/reuse-form/reuse-form.component";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Product} from "../../../core/model/product.component";
import {Category} from "../../../core/model/category.component";
import {Taxe} from "../../../core/model/taxe.component";
import {ProductDetails} from "../../../core/model/product-details.component";
import {Option} from "../../../core/model/option.component";

/**
 * Created by christian on 13/03/17.
 */
export class CreateProductGeneric extends ReuseFormComponent {

  constructor(public fb: FormBuilder,) {
    super();
  }


  prepareSaveProduct(productForm: FormGroup, editProduct: Product, categories: Category[], taxes: Taxe[]) {
    const formModel = productForm.value;

    const productDetailsDeepCopy: ProductDetails[] = formModel.productDetails.map(
      (pd: ProductDetails) => Object.assign({modified: null, created: null}, pd)
    );


    const optionsDeepCopy: Option[] = formModel.options.map(
      (o: Option) => Object.assign({}, o)
    );


    const saveProduct: Product = {
      id: editProduct.id,
      name: formModel.name as string,
      description: formModel.description as string,
      category: categories.find(c => c.id === +formModel.category),
      taxe: taxes.find(t => t.id === +formModel.taxe),
      created: null,
      productDetails: productDetailsDeepCopy,
      options:optionsDeepCopy,
      imageName: editProduct.imageName
    };

    return saveProduct;
  }


  setProductInfo(productForm: FormGroup, product: Product) {
    productForm.controls['name'].setValue(product.name);
    productForm.controls['description'].setValue(product.description);
    productForm.controls['category'].setValue(product.category.id);
    productForm.controls['taxe'].setValue(product.taxe.id);
  }


  createProductForm(editProduct: Product): FormGroup {
    return this.fb.group({
      name: [editProduct.name, Validators.required],
      description: [editProduct.description, Validators.required],
      category: [editProduct.category.id, Validators.required],
      taxe: [editProduct.taxe.id, Validators.required],
      productDetails: this.fb.array([]),
      options: this.fb.array([])
    });
  }

  createEmptyProduct(): Product {
    var p: Product = new Product();
    p.id = null;
    p.name = null;
    p.description = null;
    p.category = new Category();
    p.category.id = null;
    p.taxe = new Taxe();
    p.taxe.id = null;
    p.options = [];
    p.productDetails = [];
    return p
  }


}
