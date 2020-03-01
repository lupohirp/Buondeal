
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PagesRoutingModule } from './pages-routing.module';
import { MatsModule } from '../../shared/modules/mats.module';
import { FormsModule } from '@angular/forms';
import { Version1Component } from './comingsoon/version1/version1.component';

import { Counter } from './comingsoon/counter.service';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    PagesRoutingModule,
    MatsModule,

    FormsModule
  ],
  declarations: [
    Version1Component
  ],
  providers: [Counter],
})
export class PagesModule { }
