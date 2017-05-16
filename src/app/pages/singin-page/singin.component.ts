import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../core/authentication.service";

@Component({
  selector: 'app-singin',
  templateUrl: 'singin.component.html',
  styleUrls: ['singin.component.css']
})
export class SinginComponent implements OnInit {

  myForm: FormGroup;
  error = false;
  errorMessage = '';

  constructor(private fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) {

  }

  ngOnInit(): any {
    this.myForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
      password: ['', Validators.required],
    });
  }

  onSignIn() {

    this.authenticationService.singin(this.myForm.controls['email'].value, this.myForm.controls['password'].value).subscribe(
      result => {

      },
      (err) => {
        this.error = true;
        if (err.status == 0) {
          this.errorMessage = 'No se ha podido conectar con el servidor';
        } else {
          this.errorMessage = 'Email o contraseña incorrectos';
        }
      });
  }


}
