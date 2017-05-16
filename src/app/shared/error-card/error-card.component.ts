import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
  selector: 'mbr-error-card',
  templateUrl: 'error-card.component.html',
  styleUrls: ['error-card.component.css']
})
export class ErrorCardComponent {

  @Input() public errorMessage: string = "";
  @Input() public error: boolean = false;
  @Output() public errorChange: EventEmitter<boolean> = new EventEmitter();

  close() {
    this.error = false;
    this.errorChange.emit(this.error);
  }

}
