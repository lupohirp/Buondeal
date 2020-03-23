import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { matchingPasswords, matchingActualPasswords, matchingActualAndNewPasswords } from 'src/app/theme/utils/app-validators';
import { AuthorizationService } from 'src/app/shared/services/security/authorization.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { environment } from 'src/environments/environment';
import { EncoderService } from 'src/app/shared/services/encoding/encoder.service';
import { DecoderService } from 'src/app/shared/services/decoding/decoder.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  infoForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public snackBar: MatSnackBar, private _authorizationService: AuthorizationService, private _http: HttpService, private _encoderService: EncoderService, private _decoderService: DecoderService) { }


  ngOnInit() {
    this.infoForm = this.formBuilder.group({
      'currentPassword': ['', Validators.required],
      'newPassword': ['', Validators.required],
      'confirmNewPassword': ['', Validators.required]
    }, { validator: [matchingActualPasswords('currentPassword', this._decoderService.decodeString(atob(this._authorizationService.getUser().password))), matchingPasswords('newPassword', 'confirmNewPassword'), matchingActualAndNewPasswords('currentPassword', 'newPassword')] });
  }

  public onInfoFormSubmit(values: Object): void {
    const user = this._authorizationService.getUser();
    user.password = btoa(this._encoderService.encodeString(this.infoForm.get('newPassword').value));
    if (this.infoForm.valid) {
      this._http.sendPutReqeust(environment.backend_url + 'api/v1/users/', user, true).pipe(untilDestroyed(this)).subscribe(
        result => {
          this._authorizationService.setUser(user);
          this._authorizationService.setUserCookie();
          this.snackBar.open('La password è stata aggiornata!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        },
        error => {
          this.snackBar.open('Errore durante il salvataggio delle informazioni', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
      );
    }
  }

  ngOnDestroy() {
    console.log('Component Destroyed');
  }

}
