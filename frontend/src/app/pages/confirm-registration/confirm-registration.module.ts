import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmRegistrationComponent } from './confirm-registration.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';


export const routes = [
  { path: '', component: ConfirmRegistrationComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [ConfirmRegistrationComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class ConfirmRegistrationModule { }
