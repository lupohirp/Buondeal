import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ɵangular_packages_router_router_n } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AccountComponent } from './account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InformationComponent } from './information/information.component';
import { AddressesComponent } from './addresses/addresses.component';
import { OrdersComponent } from './orders/orders.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuard } from 'src/app/shared/services/authguard/auth.guard';
import { BecomePartnerComponent } from './become-partner/become-partner.component';
import { AwaitPartnerConfirmationComponent } from './await-partner-confirmation/await-partner-confirmation.component';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';



export const routes = [
  {
    path: '',
    component: AccountComponent, canActivateChild: [AuthGuard], children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'information', component: InformationComponent },
      { path: 'addresses', component: AddressesComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'become-partner', component: BecomePartnerComponent },
      { path: 'await-partner-confirm', component: AwaitPartnerConfirmationComponent },


    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    AccountComponent,
    DashboardComponent,
    InformationComponent,
    AddressesComponent,
    OrdersComponent,
    ChangePasswordComponent,
    BecomePartnerComponent,
    AwaitPartnerConfirmationComponent
  ],
  providers: [
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'auto' } }
  ]
})
export class AccountModule { }
