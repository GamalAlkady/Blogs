import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {isComponent} from "@ngrx/store/src/meta-reducers/utils";
import {invokeSavePostAPI} from "../../posts/state/posts.actions";
import {select, Store} from "@ngrx/store";
import {selectAppState} from "../../store/app.selector";
import {setAPIStatus} from "../../store/app.action";
import {AppState} from "../../store/app.state";
import {Router} from "@angular/router";
import {invokedRegisterUser} from "./state/registers.actions";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  isPasswordSame:boolean=true;

  constructor(
    private store:Store,
    private appStore:Store<AppState>,
    private router:Router
  ) {
  }
  registerForm=new FormGroup({
    name:new FormControl('gamal',Validators.required),
    email:new FormControl("g@gmail.com",[Validators.required,Validators.email]),
    password:new FormControl("123456",Validators.required),
    password_confirmation:new FormControl("123456",Validators.required),
  })

  checkPassword(event){
    console.log(this.registerForm.value.password.indexOf(this.registerForm.value.password_confirmation))
    if (this.registerForm.value.password.indexOf(this.registerForm.value.password_confirmation)==-1)
      this.isPasswordSame=false;
    else this.isPasswordSame=true;
  }

  registerUser(){
    console.log(this.registerForm.value)
    this.store.dispatch(invokedRegisterUser({user:this.registerForm.value} ))
    let appStatus$=this.appStore.pipe(select(selectAppState))
    appStatus$.subscribe((data)=>{
      // console.log(data)
      if(data.apiStatus==='success'){
        this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}));
        this.router.navigate(['login']);
      }
    })
  }
}
