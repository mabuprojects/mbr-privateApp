import {Component, OnInit, EventEmitter} from '@angular/core';

import {MaterializeAction} from "angular2-materialize/dist";
import {Observable} from "rxjs";
import {Taxe} from "../../../core/model/taxe.component";
import {TaxeService} from "../taxe.service";

@Component({
  selector: 'app-taxes-page',
  templateUrl: 'taxes-page.component.html',
  styles:[`.small-button-list{top: -7px;margin-right: 4px;}
           .small-button-top{top:16px;margin-right: 4px;}`]
})
export class TaxesPageComponent implements OnInit {
  taxes: Observable<Taxe[]>;

  error = false;
  errorMessage = '';

  toastDeleteActions = new EventEmitter<string|MaterializeAction>();

  toastUpdateActions = new EventEmitter<string|MaterializeAction>();

  constructor(private taxeService: TaxeService) {
    this.taxes = this.taxeService.getTaxesObservable();
  }

  ngOnInit() {
    this.taxeService.getTaxes(false);
  }

  deleteTaxe(taxeId: number): void {
    this.taxeService.deleteTaxe(taxeId).subscribe(
      result => {
        if (result) {
          this.toastDeleteActions.emit('toast');
          this.taxeService.getTaxes(true);
        }
      },
      (err) => {
        this.error = true;
        this.errorMessage = err.message;
      });
  }


  refresh():void{
    this.taxeService.getTaxes(true);
    this.toastUpdateActions.emit('toast');
  }


}
