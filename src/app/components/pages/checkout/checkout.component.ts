import { Component, OnInit } from '@angular/core';
import { Butler } from '@services/butler.service';
import { Router } from '@angular/router';
import {LOCATIONS} from '@app/services/locations.service';
import { AuthRESTService } from '@services/authREST.service';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataApiService } from '@app/services/data-api.service'; 
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
    form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl(''),
    lastname: new FormControl(''),
    identification: new FormControl(''),
    address: new FormControl(''),
    notes: new FormControl(''),
  });
  fee:any=0;
    locations: any = [
      {
        prov: '',
        cities: [{city:'',tax:0}]
      }
    ]; 

    public showMethod:any=false;
      submitted = false;
public isError = false;
public waiting = false;
public seter1 = false;
public seter2 = false;
public message = '';

 public citiesList:any=[];
 public user:any={};
 public card:any={};
 public citySelected:any=[];
 public indexProvincia:any=999; 
 provSelected:any=false;
 cityObjSelected:any=false;
  constructor(
    private readonly router: Router,
    public _butler:Butler,
    private formBuilder: FormBuilder,
    public dataApiService: DataApiService,


    private readonly toastSvc: ToastrService,
    public AuthRESTService:AuthRESTService
    ) {
      this.locations=LOCATIONS
     }
      get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  public setProv(index:any){
  this.provSelected=true;
  this.seter1=true;
  let size = this.locations[index].cities.length;
  this.indexProvincia=index;
  for (let j =0;j<size;j++){
    this.citiesList.push(this.locations[index].cities[j]);
  }
}
  public onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.user.email=this.form.value.email;
    this.user.password=this.form.value.password; 
    this.card.name=this.user.name;
    this.card.lastname=this.form.value.lastname;
    this.card.address=this.form.value.address;
    this.card.identification=this.form.value.identification;
    this.card.notes=this.form.value.notes;
    this.card.province=this.provSelected;
    this.card.city=this.citySelected;
    this.register();
  }

  public register(){  
 //  this.toastSvc.success(this.mensaje, 'Usuaio registrado');
   // this.ticket.status="completed";   
    this.AuthRESTService
        .registerUser( 
          this.user.email, 
          this.user.password 
        //  this.user.password, 
        //  this.user.status, 
        //  this.user.userType
          )
        .subscribe(
          user => {    
        //  this._uw.card=user;
          this.AuthRESTService.setUser(user);
          const token = user.id;
         this.card.userd='p'+token;
         this._butler.userd=this.card.userd;  
          this.AuthRESTService.setToken(token);
          this.dataApiService.saveCard(this.card).subscribe(card =>{
            this.toastSvc.success("Registro exitoso!");
            this.showMethod=true;
             // this.router.navigate(['']);
          });
          }, 
          error => {
                if(error.status==422){
                this.isError = true;
                this.waiting=false;
                this.message="La dirección de correo ya se encuentra registrada";
              }
          }
        );
/*
     this.dataApiService.saveTicket(this.ticket)
   .subscribe((res:any) => {
     this._butler.ticket=[];
       this.ticket=null;
       this.setSerialT();
       this.router.navigate(['/labceltransactions']);
     });*/  

     //console.log(JSON.stringify(this.options));
}
  public setCity(i:any){
    this.seter2=true;
  this.cityObjSelected=true;
  this.citySelected=this.locations[this.indexProvincia].cities[i];
  this.fee=this.locations[this.indexProvincia].cities[i].tax;
}
  ngOnInit(): void {
      this.form = this.formBuilder.group(
      {        
        email: ['', Validators.required],
        password: ['', Validators.required],
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        identification: ['', Validators.required],
        address: ['', Validators.required],
        notes: ['']
      }    
    );
  }
}
