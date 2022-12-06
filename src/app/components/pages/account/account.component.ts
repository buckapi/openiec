import { Component, OnInit } from '@angular/core';
import { Butler } from '@services/butler.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(

    public _butler:Butler
    ) { }

  ngOnInit(): void {
  }

}
