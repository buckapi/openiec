import { Component,OnInit, ElementRef,ViewChild, Inject} from '@angular/core';
import { BikersService } from './services';
import { Butler } from './services/butler.service';
import { Router } from '@angular/router';
import { ScriptService } from '@app/services/script.service';
import { ScriptStore } from '@app/services/script.store';
import { SwiperOptions } from 'swiper';
//import { DOCUMENT } from '@angular/common'; 
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

@ViewChild('modal1')  modal1: ElementRef ;
  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };
  title = 'motogo';
   // public tixToAdd=[];
element:any;
public quantity : number=1; 
public sent : boolean=false; 
public subTotalGral : number=0; 
public preview :any={
  quantity:1,
  image:"",
  subTotal:0,
  product:"",

}; public tixToAdd :any={
  quantity:1,
  image:"",
  subTotal:0,
  product:"",

}; 
  constructor(
//    @Inject(DOCUMENT) document: Document,
    public script:ScriptService,
    public bikersScript:BikersService,
    public _butler:Butler,
    public router:Router,
   private elementRef: ElementRef
  ){
    document.getElementById('modal1');
     this.script.load(     
       'glightbox',
          'swiper'
      )
      .then(data => {
      //  console.log('loaded from shop', data);
      })
      .catch(error => console.log(error));
  }
public minus(){
  if (this.quantity>1){
    this.quantity=this.quantity-1;
  }
}
public plus(){
  this.quantity=this.quantity+1;
}
public calculate(){
  this.subTotalGral=0;
  let indice = this._butler.car.length;
    for (let i = 0; i < indice; i++){
      this.subTotalGral=this.subTotalGral+this._butler.car[i].subTotal;
      this._butler.subTotalGral=this.subTotalGral;
  
    }
    this.sent=true;
       this.router.navigate(['/shop']);
}
  public addToBag(quantity:any){
    //console.log(quantity);
     this._butler.numProd=this._butler.numProd+1;
       this.tixToAdd.onCar=true;
     if(this._butler.numProd>=3){
       this.tixToAdd.onCar=false;
this._butler.hidden=true;
     }
       this.tixToAdd.quantity=quantity;
       this.tixToAdd.name=this._butler.preview.name;
       this.tixToAdd.price=this._butler.preview.price;
       this.tixToAdd.images=this._butler.preview.images;
  //   this.tixToAdd=this._butler.preview;
     this._butler.subTotal=this._butler.subTotal+(quantity*this._butler.preview.price);
   // console.log(JSON.stringify(this.tixToAdd));
     this._butler.car.push(this.tixToAdd);
        $('#modal1').removeClass("is-visible");

 this.preview.product=this._butler.preview;
  this.preview.quantity=this.quantity;
  this.preview.image=this._butler.imagePreviewProduct;
  this.preview.subTotal=this.quantity*this.preview.product.price;
//  this._butler.car.push(this.preview);
  this.calculate();
  this.tixToAdd={};
  this.quantity=1;


    }

  ngOnInit(): void {
    // this.bikersScript.getUserLocation();
    
  }
}
