import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DisableControlDirective } from 'src/app/shared/directives/disable_control_directive';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { environment } from 'src/environments/environment';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss'],
  viewProviders: [DisableControlDirective]
})
export class ShipmentComponent implements OnInit, OnDestroy {

  @Input('formGroup') generalFormGroup;

  shipments: FormArray;
  isFreeShipment = false;
  forwarderList;

  constructor(private _formBuilder: FormBuilder, private _http: HttpService, private _snackbar: MatSnackBar) { }

  ngOnInit() {
    const formArray: FormArray = this.generalFormGroup.get('shipments');

    if (formArray.getRawValue().length === 0) {
      this.addShipment();
    }


    this._http.sendGetReqeust(environment.backend_url + 'api/v1/anag_forwarders/', {}, true).pipe(untilDestroyed(this)).subscribe(
      result => {
        this.forwarderList = result;
      },
      error => {
        this._snackbar.open('Errore Generico', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        console.log(error);
      });
  }
  addShipment() {
    this.shipments = this.generalFormGroup.get('shipments') as FormArray;
    this.shipments.push(this.createItem());
  }

  removeShipment(i: number) {
    this.shipments = this.generalFormGroup.get('shipments') as FormArray;
    this.shipments.removeAt(i);
  }

  createItem(): import('@angular/forms').AbstractControl {
    return this._formBuilder.group({
      idForwarder: this._formBuilder.control('', Validators.required),
      shipmentCost: this._formBuilder.control('', Validators.required),
      deliveryExtimatedTime: this._formBuilder.control('', Validators.required)
    });
  }

  changeValue(value) {
    this.isFreeShipment = !value;
    if (this.isFreeShipment) {
      this.generalFormGroup.get('is_free_shipment').setValue(true);
    } else {
      this.generalFormGroup.get('is_free_shipment ').setValue(false);
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  ngOnDestroy() {
    console.log('componente Distrutto');
  }

}
