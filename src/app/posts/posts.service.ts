import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import {Post} from "../models/posts.model";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  baseUrl = 'https://blogs.kingofkey.net/api/posts';

   httpOptions = {
    headers: new HttpHeaders({
      "Authorization": "Bearer " + localStorage.getItem("token")
    })
  };

  constructor(private http: HttpClient) { }


  get(tagId=0) {
    if (tagId!==0)
      return this.http.get<Post[]>(this.baseUrl+"?tag="+tagId);
    return this.http.get<Post[]>(this.baseUrl);
  }

  getBy(postBy:any) {
    console.log(postBy)
      return this.http.get<Post[]>(this.baseUrl+"?"+postBy);
  }

  getOne(id:number){
    return this.http.get<Post>(this.baseUrl+"/"+id);
  }

  create(post: any) {
    return this.http.post<any>(this.baseUrl, post,this.httpOptions);
  }

  update(post: any) {
    console.log(post)
    return this.http.put<any>(this.baseUrl+'/'+post.id, post,this.httpOptions);
  }


  delete(id: number) {
    return this.http.delete(this.baseUrl+'/'+id,this.httpOptions);
  }
}
