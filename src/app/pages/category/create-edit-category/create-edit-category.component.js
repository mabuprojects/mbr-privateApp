"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var mbr_lib_1 = require("mbr-lib");
var reuse_form_component_1 = require("../.././reuse-form.component");
var CreateEditCategoryComponent = (function (_super) {
    __extends(CreateEditCategoryComponent, _super);
    function CreateEditCategoryComponent(categoryService, fb, router, route) {
        _super.call(this);
        this.categoryService = categoryService;
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.toastCreateActions = new core_1.EventEmitter();
        this.toastUpdateActions = new core_1.EventEmitter();
        this.error = false;
        this.errorMessage = '';
    }
    CreateEditCategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Si la página recibe el nombre de una categoria el modo de apertura es EDIT, sino NEW
        this.route.params.subscribe(function (params) {
            _this.categoryName = params['categoryName'];
        });
        this.openMode = (this.categoryName) ? "EDIT" : "NEW";
        if (this.openMode === "EDIT") {
            this.categoryService
                .findCategoryByName(this.categoryName, false)
                .subscribe(function (rs) {
                _this.editCategory = rs;
                _this.createForm(_this.editCategory);
            });
        }
        else {
            //openMode == NEW
            this.editCategory = this.createEmptyCategory();
            this.createForm(this.editCategory);
        }
    };
    /**
     * Inicializo el form
     *  NEW -> Form vacio
     *  EDIT -> Form completo
     * @param editRestaurant
     */
    CreateEditCategoryComponent.prototype.createForm = function (editCategory) {
        this.categoryForm = this.fb.group({
            id: editCategory.id,
            name: [editCategory.name, forms_1.Validators.required]
        });
    };
    CreateEditCategoryComponent.prototype.prepareSaveCategory = function () {
        var category = {
            id: this.editCategory.id,
            name: this.categoryForm.value.name
        };
        return category;
    };
    CreateEditCategoryComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.openMode === "NEW") {
            this.categoryService.createCategory(this.categoryForm.value.name).subscribe(function (result) {
                if (result) {
                    _this.toastCreateActions.emit('toast');
                    _this.categoryService
                        .getCategories(true);
                }
            }, function (err) {
                _this.error = true;
                _this.errorMessage = err.message;
            });
        }
        else {
            //openMode= EDIT
            var category = this.prepareSaveCategory();
            this.categoryService.updateCategory(category).subscribe(function (result) {
                if (result) {
                    _this.toastUpdateActions.emit('toast');
                    _this.categoryService
                        .getCategories(true);
                }
            }, function (err) {
                _this.error = true;
                _this.errorMessage = err.message;
            });
        }
        // this.router.navigate(['restaurants']);
    };
    //---------------------------------------------------------------------------------
    //AUX FUNCTIONS
    CreateEditCategoryComponent.prototype.createEmptyCategory = function () {
        var c = new mbr_lib_1.Category();
        c.id = null;
        c.name = null;
        return c;
    };
    CreateEditCategoryComponent = __decorate([
        core_1.Component({
            selector: 'app-create-edit-category',
            templateUrl: './create-edit-category.component.html'
        })
    ], CreateEditCategoryComponent);
    return CreateEditCategoryComponent;
}(reuse_form_component_1.ReuseFormComponent));
exports.CreateEditCategoryComponent = CreateEditCategoryComponent;
