import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealComponent } from './deal/deal.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { DealsComponent } from './deals.component';
import { ImgZoomComponent } from '../products/product/ImgZoom/ImgZoom.component';
import { ProductZoomComponent } from '../products/product/product-zoom/product-zoom.component';
import { ImgZoomDealsComponent } from './deal/ImgZoom/ImgZoom.component';
import { DealZoomComponent } from './deal/product-zoom/product-zoom.component';


export const routes = [
  { path: '', component: DealsComponent, pathMatch: 'full' },
  { path: '/search/:name', component: DealsComponent },
  { path: ':id', component: DealComponent }
];

@NgModule({
  declarations: [DealComponent, DealsComponent, ImgZoomDealsComponent, DealZoomComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    NgxPaginationModule,
    SharedModule,
    PipesModule
  ],
  entryComponents: [
    ImgZoomDealsComponent,
    DealZoomComponent
  ]
})
export class DealsModule { }
