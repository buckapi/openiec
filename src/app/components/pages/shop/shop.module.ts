import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

@NgModule({
  declarations: [
    ShopComponent
  ],
  imports: [
    CommonModule,
    NgxUsefulSwiperModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
