import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CheckoutComponent
  ],
  imports: [
 FormsModule,
    CommonModule,
    CheckoutRoutingModule,
    ReactiveFormsModule
  ]
})
export class CheckoutModule { }
