import {Component, OnInit, EventEmitter} from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
import {ReuseFormComponent} from "../../../shared/reuse-form/reuse-form.component";
import {MaterializeAction} from "angular2-materialize/dist";
import {Category} from "../../../core/model/category.component";
import {CategoryService} from "../category.service";

@Component({
  selector: 'app-create-edit-category',
  templateUrl: './create-edit-category.component.html'
})
export class CreateEditCategoryComponent extends ReuseFormComponent implements OnInit {


  categoryForm: FormGroup;

  toastCreateActions = new EventEmitter<string|MaterializeAction>();
  toastUpdateActions = new EventEmitter<string|MaterializeAction>();

  error = false;
  errorMessage = '';

  categoryName: string;
  openMode: string;
  editCategory: Category;

  constructor(private categoryService: CategoryService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    //Si la página recibe el nombre de una categoria el modo de apertura es EDIT, sino NEW
    this.route.params.subscribe(params => {
      this.categoryName = params['categoryName']
    });

    this.openMode = (this.categoryName) ? "EDIT" : "NEW";

    this.editCategory = this.createEmptyCategory();
    this.createForm(this.editCategory);

    if (this.openMode === "EDIT") {
      this.categoryService
        .findCategoryByName(this.categoryName, false)
        .subscribe(rs => {
          this.editCategory = rs;
          this.createForm(this.editCategory);
        });
    }
  }

  /**
   * Inicializo el form
   *  NEW -> Form vacio
   *  EDIT -> Form completo
   * @param editCategory
   */
  createForm(editCategory: Category) {
    this.categoryForm = this.fb.group({
      id: editCategory.id,
      name: [editCategory.name, Validators.required]
    });
  }

  prepareSaveCategory(): Category {
    var category: Category = {
      id: this.editCategory.id,
      name: this.categoryForm.value.name
    }
    return category;
  }

  onSubmit() {
    if (this.openMode === "NEW") {
      this.categoryService.createCategory(this.categoryForm.value.name).subscribe(
        result => {
          if (result) {
            this.toastCreateActions.emit('toast');
            this.categoryService.getCategories(true);
            this.router.navigate(['category']);
          }
        },
        (err) => {
          this.error = true;
          this.errorMessage = err.message;
        });


    } else {
      //openMode= EDIT
      var category = this.prepareSaveCategory();
      this.categoryService.updateCategory(category).subscribe(
        result => {
          if (result) {
            this.toastUpdateActions.emit('toast');
            this.categoryService.getCategories(true);
            this.router.navigate(['category']);
          }
        },
        (err) => {
          this.error = true;
          this.errorMessage = err.message;
        });
    }
  }

//---------------------------------------------------------------------------------
  //AUX FUNCTIONS
  createEmptyCategory(): Category {
    var category = new Category();
    category.id = null;
    category.name = null;
    return category;
  }

}
