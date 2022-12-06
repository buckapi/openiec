import { Component, Input,OnInit } from '@angular/core';
import { Butler } from '@app/services/butler.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { AuthRESTService } from '@services/authREST.service';
import { ACTIONS } from '@shared/constants/constant';
import { ApiError, User, UserCredentials } from '@supabase/gotrue-js';
import { ToastrService } from 'ngx-toastr';
import {CARDS} from '@app/services/cards.service';
import { UserInterface } from '@interfaces/user-interface';

export interface OptionsForm {
  id: string;
  label: string;
}
interface UserReponse extends User, ApiError { }
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    public user : UserInterface ={
    name:"",
    email:"",
    password:""
  };
  ngFormLogin: FormGroup;
  submitted = false;
  public isError = false;
  public isLogged =false;
  authForm !: FormGroup;
  signIn = ACTIONS.signIn;
  @Input() options!: OptionsForm;
  public cards:any=[];
  size=0;
  constructor(
    private readonly authSvc: AuthService,
    private readonly authRestSvc: AuthRESTService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    public _butler:Butler,
    private readonly toastSvc: ToastrService,
  ) {
    this.cards=CARDS
   }

  ngOnInit(): void {
    this.initForm();
    }

  onLogin(){
      this.submitted = true;
      if (this.ngFormLogin.invalid) {
      return;
        } 
      return this.authRestSvc.loginUser(
        this.ngFormLogin.value.email!, 
        this.ngFormLogin.value.password!
        ).subscribe( 
        data => {
          //console.log(data);
              this.authRestSvc.setUser(data.user);
              const token = data.id;
              this.authRestSvc.setToken(token);
              this._butler.userd=data.user.id;
              this._butler.name=data.user.email;
              this.router.navigate(['/account']);
              this.isError = false;
        },
         error => this.onIsError()
      ); 
  }   

  get fval() {
    return this.ngFormLogin.controls;
  }

  onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }

  private initForm(): void {
    this.ngFormLogin = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]]
    })
  }

}
