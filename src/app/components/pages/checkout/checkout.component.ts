import { Component, OnInit } from '@angular/core';
import { Butler } from '@services/butler.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(
  private readonly router: Router,
    public _butler:Butler
    ) { }

  ngOnInit(): void {
  }

}
