import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  responseData:any;
  constructor(
    private service:AuthService,
    private route:Router) {}

  login=new FormGroup({
    email:new FormControl("osama.moh.almamari@gmail.com",Validators.required),
    password:new FormControl("123456",Validators.required),
  })

  proceedLogin(){

    if (this.login.valid){
      const formData=new FormData();
      formData.append('login','');
      formData.append('email',this.login.value.email.toString());
      formData.append('password',this.login.value.password.toString());

      this.service.proceedLogin(formData).subscribe(result=>{
        if (result!=null){
          this.responseData=result;
          console.log(result);
          localStorage.setItem('token',this.responseData.data.token);
          this.route.navigate(['posts'])
        }
      },error => {
        this.responseData='error';
        localStorage.setItem('token','');
      })
    }
  }
}
