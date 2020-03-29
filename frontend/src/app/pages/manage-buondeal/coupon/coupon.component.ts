import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatHorizontalStepper } from '@angular/material/stepper';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Variants, Product } from 'src/app/app.models';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { AuthorizationService } from 'src/app/shared/services/security/authorization.service';
import { environment } from 'src/environments/environment';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ErrorDialogComponent } from '../e-commerce/error-dialog/error-dialog/error-dialog.component';
import { VariantsCouponComponent } from '../coupon/variants/variants.component';
import { GeneralCouponComponent } from './general/general.component';
import { NgxPicaService } from '@digitalascetic/ngx-pica';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {

  @ViewChild(VariantsCouponComponent, { static: true }) variantsComponent: VariantsCouponComponent;
  @ViewChild(GeneralCouponComponent, { static: true }) generalComponent: GeneralCouponComponent;

  /**
   *
   * FormGroup Area
   */

  generalFormGroup: FormGroup;
  anagVariants: Array<Variants> = [];
  smallScreen: boolean;



  constructor(private _breakpointObserver: BreakpointObserver, private _formBuilder: FormBuilder, private _ngxPicaService: NgxPicaService, private _activatedRoute: ActivatedRoute, private _dialog: MatDialog, private _http: HttpService, private _snackbar: MatSnackBar, private _authorizationService: AuthorizationService, private _router: Router) {
    _breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium
    ]).subscribe(result => {
      this.smallScreen = result.matches;
    });
  }

  ngOnInit() {

    this.initializeGeneralFormGroup();

    if (this._activatedRoute.snapshot.params['product']) {

      let params = {
        'product_id': atob(this._activatedRoute.snapshot.params['product'])
      }

      this._http.sendGetReqeust(environment.backend_url + 'api/v1/products/', params, true).pipe(untilDestroyed(this)).subscribe(
        result => {

          let product: Product = <Product>result;

          this.generalComponent.ngOnInit();
          this.generalComponent.loadSubcategories(product.category.id);

          this.generalFormGroup.patchValue({
            title: product.title,
            category_id: product.category.id,
            subcategory_id: product.subCategory.id

          });


        });
    }

  }


  initializeGeneralFormGroup() {
    this.generalFormGroup = this._formBuilder.group({
      title: this._formBuilder.control('', Validators.required),
      category_id: this._formBuilder.control('', Validators.required),
      subcategory_id: this._formBuilder.control('', Validators.required),
      description: this._formBuilder.control('', Validators.required),
      is_free_shipment: this._formBuilder.control(''),
      variants: this._formBuilder.array([], Validators.required),
      images: this._formBuilder.array([]),
      seo_title: this._formBuilder.control(''),
      seo_description: this._formBuilder.control(''),
    });
  }



  isGeneralValid() {
    return this.generalFormGroup.get('title').valid && this.generalFormGroup.get('category_id').valid && this.generalFormGroup.get('subcategory_id').valid && this.generalFormGroup.get('description').valid;
  }

  isVariantsValid() {
    return this.generalFormGroup.get('variants').valid;
  }

  isShipmentValid() {
    return this.generalFormGroup.get('shipments').valid;
  }


  saveObject() {
    if (this.generalFormGroup.valid) {
      this.generalFormGroup.value['userid'] = this._authorizationService.getUser()['id'];
      this.generalFormGroup.value['typeOp'] = 1;

      this.generalFormGroup.value['variants'].forEach(element => {
        element.couponStartDate = element.couponStartDate.valueOf();
        element.couponEndDate = element.couponEndDate.valueOf();
      });



      this._http.sendPostReqeust(environment.backend_url + 'api/v1/deals/', this.generalFormGroup.value, true).pipe(untilDestroyed(this)).subscribe(
        result => {
          this._router.navigate(['manage-buondeal/sell/success']);
        },
        error => {
          console.log(error);
          this._router.navigate(['manage-buondeal/sell/error']);
        });
    } else {
      this.openDialog();
    }
  }

  loadVariants() {
    if (this.generalFormGroup.controls.category_id.value && this.generalFormGroup.controls.subcategory_id.value) {
      const params = {
        'cat_id': this.generalFormGroup.controls.category_id.value,
        'subcat_id': this.generalFormGroup.controls.subcategory_id.value
      };

      this._http.sendGetReqeust(environment.backend_url + 'api/v1/anag_variants/', params, true).pipe(untilDestroyed(this)).subscribe(
        result => {
          this.anagVariants = result;
          if (!this.variantsComponent.alreadyVariantsLoaded) {
            for (let i in this.variantsComponent.selectableVariants) {
              this.variantsComponent.selectableVariants[i][0] = result;
              this.variantsComponent.alreadyVariantsLoaded = true;
            }
          }
        },
        error => {
          this._snackbar.open('Errore Generico', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
          console.log(error);
        });

    }
  }

  openDialog(): void {
    const dialogRef = this._dialog.open(ErrorDialogComponent, {
      width: '300px',
      data: {}
    });


  }

  selectionChange($event) {
    if ($event.selectedIndex === 1) {
      this.loadVariants();
    }
  }

  ngOnDestroy() {
    console.log('Component Destroyed');
  }


}
