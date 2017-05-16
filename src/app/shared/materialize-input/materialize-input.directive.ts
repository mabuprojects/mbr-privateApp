import {Directive, Input, Renderer, ElementRef} from "@angular/core";
import {FormControl} from "@angular/forms";

@Directive({
  selector: '[inputvalidate]'
})
export class MaterializeInputDirective {


  constructor(private _renderer: Renderer, private _elementRef: ElementRef) {
  }

  addClass(className: string) {
    this._renderer.setElementClass(this._elementRef.nativeElement, className, true);
  }

  removeClass(className: string) {
    this._renderer.setElementClass(this._elementRef.nativeElement, className, false);
  }

  setPlaceholder(value: string) {
    this._renderer.setElementAttribute(this._elementRef.nativeElement, 'placeholder', value);
  }

  @Input() set inputvalidate(form: FormControl) {
    form.statusChanges.subscribe(e=>{

      if (!form.pristine) {
        if (form.valid) {
          this.addClass("valid");
          this.removeClass("invalid");
          this.setPlaceholder("");
        } else {
          this.removeClass("valid");
          this.addClass("invalid");
          this.setPlaceholder(" ");
        }
      }
    });

  }
}
