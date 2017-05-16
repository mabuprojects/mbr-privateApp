import {Component, OnInit, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MaterializeAction} from "angular2-materialize/dist";
import {ReuseFormComponent} from "../../../shared/reuse-form/reuse-form.component";
import {Taxe} from "../../../core/model/taxe.component";
import {TaxeService} from "../taxe.service";

@Component({
  selector: 'app-create-edit-taxe',
  templateUrl: './create-edit-taxe.component.html'
})
export class CreateEditTaxeComponent extends ReuseFormComponent implements OnInit {

  taxeForm: FormGroup;

  toastCreateActions = new EventEmitter<string|MaterializeAction>();
  toastUpdateActions = new EventEmitter<string|MaterializeAction>();

  error = false;
  errorMessage = '';

  taxeName: string;
  openMode: string;
  editTaxe: Taxe;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private taxeService: TaxeService) {
    super();
  }

  ngOnInit(): void {
    //Si la página recibe el nombre de un impuesto el modo de apertura es EDIT, sino NEW
    this.route.params.subscribe(params => {
      this.taxeName = params['taxeName']
    });

    this.openMode = (this.taxeName) ? "EDIT" : "NEW";

    this.editTaxe = this.createEmptyTaxe();
    this.createForm(this.editTaxe);

    if (this.openMode === "EDIT") {
      this.taxeService
        .findTaxeByName(this.taxeName, false)
        .subscribe(taxe => {
          this.editTaxe = taxe;
          this.createForm(this.editTaxe);
        });
    }
  }


  /**
   * Inicializo el form
   *  NEW -> Form vacio
   *  EDIT -> Form completo
   * @param editTaxe
   */
  createForm(editTaxe: Taxe) {
    this.taxeForm = this.fb.group({
      id: editTaxe.id,
      name: [editTaxe.name, Validators.required],
      value: [editTaxe.value, Validators.required]
    });
  }

  prepareSaveTaxe(): Taxe {
    var taxe: Taxe = {
      id: this.taxeForm.value.id,
      name: this.taxeForm.value.name,
      value: this.taxeForm.value.value
    };
    return taxe;
  }

  onSubmit() {
    var taxe = this.prepareSaveTaxe();

    if (this.openMode === "NEW") {
      this.taxeService.createTaxe(taxe).subscribe(
        result => {
          if (result) {
            this.toastCreateActions.emit('toast');
            this.taxeService
              .getTaxes(true);
            this.router.navigate(['taxe']);
          }
        },
        (err) => {
          this.error = true;
          this.errorMessage = err.message;
        });


    } else {
      //openMode= EDIT
      this.taxeService.updateTaxe(taxe).subscribe(
        result => {
          if (result) {
            this.toastUpdateActions.emit('toast');
            this.taxeService
              .getTaxes(true);
            this.router.navigate(['taxe']);
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
  createEmptyTaxe(): Taxe {
    let taxe = new Taxe();
    taxe.id = null;
    taxe.name = null;
    taxe.value = null;
    return taxe;
  }


}

