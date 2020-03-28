import { Component, OnInit, ViewChild, ViewChildren, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { environment } from 'src/environments/environment';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { AuthorizationService } from 'src/app/shared/services/security/authorization.service';
import { ErrorDialogComponent } from './error-dialog/error-dialog/error-dialog.component';
import { Variants, Product, Subcategory } from 'src/app/app.models';
import { Router, ActivatedRoute } from '@angular/router';
import { VariantsComponent } from './variants/variants.component';
import { GeneralComponent } from './general/general.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss']
})
export class ECommerceComponent implements OnInit, OnDestroy {

  @ViewChild(MatStepper, { static: true }) stepper: MatStepper;
  @ViewChild(VariantsComponent, { static: true }) variantsComponent: VariantsComponent;
  @ViewChild(GeneralComponent, { static: true }) generalComponent: GeneralComponent;

  /**
   *
   * FormGroup Area
   */

  generalFormGroup: FormGroup;
  anagVariants: Array<Variants> = [];





  constructor(private _breakpointObserver: BreakpointObserver, private _formBuilder: FormBuilder, private _activatedRoute: ActivatedRoute, private _dialog: MatDialog, private _http: HttpService, private _snackbar: MatSnackBar, private _authorizationService: AuthorizationService, private _router: Router) { }


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
      shipments: this._formBuilder.array([], Validators.required),
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
      this._http.sendPostReqeust(environment.backend_url + 'api/v1/products/', this.generalFormGroup.value, true).pipe(untilDestroyed(this)).subscribe(
        result => {
          this._router.navigate(['manage-buondeal/sell/success']);
        },
        error => {
          console.log(error);
          this._router.navigate(['manage-buondeal/sell/error']);
        });
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

  // openDialog(): void {
  //   const dialogRef = this._dialog.open(ErrorDialogComponent, {
  //     width: '300px',
  //     data: {}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (!this.isGeneralValid()) {
  //       this.stepper.selectedIndex = 0;
  //     } else if (!this.isVariantsValid()) {
  //       this.stepper.selectedIndex = 1;
  //     } else if (!this.isShipmentValid()) {
  //       this.stepper.selectedIndex = 2;
  //     }
  //   });
  // }


  ngOnDestroy() {
    console.log('Component Destroyed');
  }

}
