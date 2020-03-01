import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageBuondealComponent } from './manage-buondeal.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuard } from 'src/app/shared/services/authguard/auth.guard';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { GeneralComponent } from './e-commerce/general/general.component';
import { VariantsComponent } from './e-commerce/variants/variants.component';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorInternational } from 'src/app/shared/intl/MatPaginatorInternational';
import { ShipmentComponent } from './e-commerce/shipment/shipment.component';
import { DisableControlDirective } from 'src/app/shared/directives/disable_control_directive';
import { ErrorDialogComponent } from './e-commerce/error-dialog/error-dialog/error-dialog.component';
import { TwoDigitDecimaNumberDirective } from 'src/app/shared/directives/two_digits_number_directive';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { SuccesfulsaleComponent } from './e-commerce/succesfulsale/succesfulsale.component';
import { ErrorsaleComponent } from './e-commerce/errorsale/errorsale.component';
import { NgxPicaModule } from '@digitalascetic/ngx-pica';
import { ImagesInfoDialogComponent } from './e-commerce/images-info-dialog/images-info-dialog.component';
import { WrongFileDialogComponent } from './e-commerce/wrong-file-dialog/wrong-file-dialog.component';
import { SeoDefinerComponent } from './e-commerce/seo-definer/seo-definer.component';
import { CouponComponent } from './coupon/coupon.component';
import { GeneralCouponComponent } from './coupon/general/general.component';
import { VariantsCouponComponent } from './coupon/variants/variants.component';
import { SeoDealsDefinerComponent } from './coupon/seo-definer/seo-definer.component';




export const routes = [
  {
    path: '',
    component: ManageBuondealComponent, canActivateChild: [AuthGuard], children: [
      {
        path: 'sell', component: ECommerceComponent
      },
      { path: 'deals', component: CouponComponent },
      { path: 'events', component: ECommerceComponent },
      { path: 'sell/success', component: SuccesfulsaleComponent },
      { path: 'sell/error', component: ErrorsaleComponent }
    ]
  }
];

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  },
};



@NgModule({

  declarations: [
    ManageBuondealComponent,
    ECommerceComponent,
    GeneralComponent,
    VariantsComponent,
    ShipmentComponent,
    DisableControlDirective,
    TwoDigitDecimaNumberDirective,
    ErrorDialogComponent,
    SuccesfulsaleComponent,
    ErrorsaleComponent,
    ImagesInfoDialogComponent,
    WrongFileDialogComponent,
    SeoDefinerComponent,
    SeoDealsDefinerComponent,
    CouponComponent,
    GeneralCouponComponent,
    VariantsCouponComponent
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CKEditorModule,
    NgxPicaModule
  ],
  entryComponents: [
    ErrorDialogComponent,
    ImagesInfoDialogComponent,
    WrongFileDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorInternational },
    { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
})
export class ManageBuondealModule { }
