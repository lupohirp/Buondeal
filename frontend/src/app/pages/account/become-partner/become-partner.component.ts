import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorizationService } from 'src/app/shared/services/security/authorization.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { EncoderService } from 'src/app/shared/services/encoding/encoder.service';
import { DecoderService } from 'src/app/shared/services/decoding/decoder.service';
import { matchingActualPasswords, matchingPasswords, matchingActualAndNewPasswords, nameSurnameValidator, fiscalCodeValidator, emailValidator, numberOnlyValidator } from 'src/app/theme/utils/app-validators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-become-partner',
  templateUrl: './become-partner.component.html',
  styleUrls: ['./become-partner.component.scss']
})
export class BecomePartnerComponent implements OnInit, OnDestroy {


  partner_type: number;

  confirmation_status: string;
  already_partner: boolean;

  partnerIndustryForm: FormGroup;
  partnerPrivateForm: FormGroup;
  partnerSocietyForm: FormGroup;

  constructor(private router: Router, public formBuilder: FormBuilder, public snackBar: MatSnackBar, private _authorizationService: AuthorizationService, private _http: HttpService, private _encoderService: EncoderService, private _decoderService: DecoderService) { }

  ngOnInit(): void {
    if (this._authorizationService.getUser().partner) {
      this.already_partner = true;
      this.confirmation_status = this._authorizationService.getUser().partner.confirmation_status;

    }
  }


  createForm($event) {

    switch ($event.value) {
      case '1': {

        this.partner_type = $event.value;

        this.partnerIndustryForm = this.formBuilder.group({
          'owner': ['', Validators.compose([Validators.required, nameSurnameValidator])],
          'company_name': ['', Validators.required],
          'fiscal_code': ['', Validators.compose([Validators.required, fiscalCodeValidator])],
          'vat': ['', Validators.required],
          'activity_sector': ['', Validators.required],
          'address_legal': ['', Validators.required],
          'postal_code_legal': ['', Validators.compose([Validators.required, numberOnlyValidator])],
          'address_operative': ['', Validators.required],
          'postal_code_operative': ['', Validators.compose([Validators.required, numberOnlyValidator])],
          'checked': ['']

        }, { validator: [] });

        this.partnerPrivateForm = undefined;
        this.partnerSocietyForm = undefined;

        break;
      }
      case '2': {

        this.partner_type = $event.value;

        this.partnerPrivateForm = this.formBuilder.group({
          'owner': ['', Validators.compose([Validators.required, nameSurnameValidator])],
          'fiscal_code': ['', Validators.compose([Validators.required, fiscalCodeValidator])],
          'vat': ['', Validators.required],
          'activity_sector': ['', Validators.required],
          'address_legal': ['', Validators.required],
          'postal_code_legal': ['', Validators.required],
          'address_operative': ['', Validators.required],
          'postal_code_operative': ['', Validators.required],
          'checked': ['']

        }, { validator: [] });

        this.partnerIndustryForm = undefined;
        this.partnerSocietyForm = undefined;

        break;
      }
      case '3': {

        this.partner_type = $event.value;

        this.partnerSocietyForm = this.formBuilder.group({
          'owner': ['', Validators.compose([Validators.required, nameSurnameValidator])],
          'company_name': ['', Validators.required],
          'fiscal_code': ['', Validators.compose([Validators.required, fiscalCodeValidator])],
          'vat': ['', Validators.required],
          'activity_sector': ['', Validators.required],
          'address_legal': ['', Validators.required],
          'postal_code_legal': ['', Validators.required],
          'address_operative': ['', Validators.required],
          'postal_code_operative': ['', Validators.required],
          'checked': ['']

        }, { validator: [] });

        this.partnerIndustryForm = undefined;
        this.partnerPrivateForm = undefined;

        break;
      }
    }
  }

  public fillPartnerForm(formGroup: FormGroup) {
    if (!formGroup.controls.checked.value) { // la reactiveform funziona tutto il contrario... -_-
      formGroup.controls['address_operative'].setValue(formGroup.controls['address_legal'].value);
      formGroup.controls['postal_code_operative'].setValue(formGroup.controls['postal_code_legal'].value);
      formGroup.controls['address_operative'].updateValueAndValidity();
      formGroup.controls['postal_code_operative'].updateValueAndValidity();
    } else {
      formGroup.controls['address_operative'].setValue('');
      formGroup.controls['postal_code_operative'].setValue('');
      formGroup.controls['address_operative'].updateValueAndValidity();
      formGroup.controls['postal_code_operative'].updateValueAndValidity();
    }
  }

  public onPartnerFormSubmit(values: Object): void {
    if ((this.partnerIndustryForm && this.partnerIndustryForm.valid) || (this.partnerPrivateForm && this.partnerPrivateForm.valid) || (this.partnerSocietyForm && this.partnerSocietyForm.valid)) {
      values['userid'] = this._authorizationService.getUser().id;
      values['partner_type'] = this.partner_type;
      this._http.sendPostReqeust(environment.backend_url + 'api/v1/partners/', values, true).pipe(untilDestroyed(this)).subscribe(
        result => {
          this.router.navigate(['/account/await-partner-confirm']);
        },
        error => {
          if (error.error && error.error.indexOf('partners_un') >= 0) {
            this.snackBar.open('Utente giá inserito come Partner', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          } else {
            this.snackBar.open('Errore Generico', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          }
          console.log(error);
        });
    }
  }

  ngOnDestroy() {
    console.log('Component Destroyed');
  }
}
