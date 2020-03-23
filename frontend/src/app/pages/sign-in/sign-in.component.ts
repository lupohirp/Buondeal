import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';

import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { EncoderService } from 'src/app/shared/services/encoding/encoder.service';
import { encodeMap } from 'src/app/app.const';
import { AuthorizationService } from 'src/app/shared/services/security/authorization.service';
import { User, Partner } from 'src/app/app.models';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public router: Router, public snackBar: MatSnackBar,
    private _http: HttpService, private _encoderService: EncoderService,
    private _authorization: AuthorizationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'username': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])]
    });
  }

  public onLoginFormSubmit(values: Object): void {
    if (this.loginForm.valid) {

      const passwordEncoded = btoa(this._encoderService.encodeString((<any>values).password));

      const params = {
        'username': (<any>values).username,
        'password': passwordEncoded
      };

      this._http.sendGetReqeust(environment.backend_url + 'api/v1/users/', params).pipe(untilDestroyed(this)).subscribe(
        user_result => {
          if (user_result) {
            if (user_result.id) {
              const params = {
                'id': user_result.id
              };
              this._http.sendGetReqeust(environment.backend_url + 'api/v1/confirm/', params).pipe(untilDestroyed(this)).subscribe(
                confirm_result => {
                  if (confirm_result.enabled == 0) {
                    this.router.navigate(['/await-confirm']);
                  } else {
                    this._http.sendOAuth2Request(environment.backend_url + 'oauth2/token/', user_result.username, passwordEncoded).pipe(untilDestroyed(this)).subscribe(
                      token_result => {
                        if (token_result == 401) {
                          this.snackBar.open('Nome utente e password non corretti!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
                        } else {

                          this._authorization.setToken(token_result.access_token);
                          this._authorization.setTokenCookie();

                          this._http.sendGetReqeust(environment.backend_url + 'api/v1/partners/', { 'userid': user_result.id }, true).pipe(untilDestroyed(this)).subscribe(
                            partner_result => {

                              const user_authenticated = <User>user_result;
                              user_authenticated.password = passwordEncoded;
                              user_authenticated.partner = <Partner>partner_result;
                              this._authorization.setUser(user_authenticated);
                              this._authorization.setUserCookie();

                              this.router.navigate(['/account']);
                            },
                            partner_error => {

                              this._authorization.deleteCookies();
                              this.snackBar.open('Errore generico sul server!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
                            }
                          );

                        }
                      },
                      error => {
                        this.snackBar.open('Errore generico sul server!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
                      }
                    );

                  }
                },
                error => {
                  this.snackBar.open('Errore generico sul server!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
                }
              );
            }
          } else {
            this.snackBar.open('Nome utente e password non corretti!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          }
        },
        error => {
          this.snackBar.open('Errore generico sul server!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        });
    }
  }

  public goToRegisterPage() {
    this.router.navigate(['/register']);
  }

  ngOnDestroy() {
    console.log('Component Destroyed');
  }

}
