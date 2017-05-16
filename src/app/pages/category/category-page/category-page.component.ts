import {Component, OnInit, EventEmitter} from '@angular/core';
import {MaterializeAction} from "angular2-materialize/dist";
import {Observable} from "rxjs";
import {Category} from "../../../core/model/category.component";
import {CategoryService} from "../category.service";

@Component({
  selector: 'app-category-page',
  templateUrl: 'category-page.component.html',
  styles:[`.small-button-list{top: -7px;margin-right: 4px;}
           .small-button-top{top:16px;margin-right: 4px;}`]
})
export class CategoryPageComponent implements OnInit {

  categories: Observable<Category[]>;

  error = false;
  errorMessage = '';

  toastDeleteActions = new EventEmitter<string|MaterializeAction>();
  toastUpdateActions = new EventEmitter<string|MaterializeAction>();

  constructor(private categoryService: CategoryService) {

    this.categories = this.categoryService.getCategoriesObservable();
  }

  ngOnInit() {
    this.categoryService.getCategories();
  }

  deleteCategory(categoryId: number): void {
    this.categoryService.deleteCategory(categoryId).subscribe(
      result => {
        if (result) {
          this.toastDeleteActions.emit('toast');
          this.categoryService.getCategories(true);
        }
      },
      (err) => {
        this.error = true;
        this.errorMessage = err.message;
      });
  }


  refresh():void{
    this.categoryService.getCategories(true);
    this.toastUpdateActions.emit('toast');
  }


}
