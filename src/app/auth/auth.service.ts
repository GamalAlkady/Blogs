import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/users.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://blogs.kingofkey.net/api/';

  constructor(
    private http:HttpClient,
    private router: Router) {}

  proceedLogin(userCred:FormData){
    return this.http.post(this.baseUrl+"login",userCred);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false

    // return !this.jwtHelper.isTokenExpired(token);

    console.log(token)
    if (token!=='' && token!==null)
      return true;
    return false;
  }

  public logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  register(user:any){
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + localStorage.getItem("token")
      })}

    const res=this.http.post<User>(this.baseUrl+"register",user);
    console.log(res)
    return res;
  }
}
