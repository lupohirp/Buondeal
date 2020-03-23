import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AwaitConfirmComponent } from './await-confirm.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

export const routes = [
  { path: '', component: AwaitConfirmComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [AwaitConfirmComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ]
})
export class AwaitConfirmModule { }
