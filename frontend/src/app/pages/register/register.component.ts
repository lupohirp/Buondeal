import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator, matchingPasswords } from 'src/app/theme/utils/app-validators';
import { User } from 'src/app/app.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { isArray } from 'util';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public router: Router, public snackBar: MatSnackBar, private _http: HttpService) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required])],
      'surname': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'username': ['', Validators.compose([Validators.required])],
      'confirmPassword': ['', Validators.required]
    }, { validator: matchingPasswords('password', 'confirmPassword') });
  }

  public onRegisterFormSubmit(values: User): void {

    if (this.registerForm.valid) {
      this._http.sendPostReqeust(environment.backend_url + 'api/v1/users/', values).pipe(untilDestroyed(this)).subscribe(
        result => {
          this.router.navigate(['/confirm']);
        },
        error => {
          if (isArray(error.error)) {
            if (error.error[2].indexOf('users_un3') > 0) {
              this.snackBar.open('Email già presente', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
            } else if (error.error[2].indexOf('users_un2') > 0) {
              this.snackBar.open('Username già presente! Inserire un username diverso dal precedente.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
            }
          } else {
            this.snackBar.open('Errore Generico', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          }
        });
    }
  }

  ngOnDestroy() {
    console.log('Component Destroyed');
  }

}
