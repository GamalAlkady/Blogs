import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Tag} from "../models/_tags.model";
// import {Tag} from "../models/tags.model";

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  baseUrl = 'https://blogs.kingofkey.net/api/tags';

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Tag[]>(this.baseUrl);
  }

  create(tag: any) {
    // const formData: FormData = new FormData();
    // formData.append('add_tag', '');
    // formData.append('tag', JSON.stringify(tag));
    // formData.append('photo', image, image.name);
    //
    // console.log(formData);

    // console.log(tag,image)

    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + localStorage.getItem("token")
      })
    };
    return this.http.post<any>(this.baseUrl, tag,httpOptions);
  }

  update(formData: FormData) {
    return this.http.post<any>(this.baseUrl, formData);
  }


  delete(id: number, photo: string) {
    const url = `${this.baseUrl}?delete_tag=${id}&photo=${photo}`; // DELETE api/tag

    let httpParams = new HttpParams()
      .set('delete_tag', id)
    // .set('photo', photo);

    let options = { params: httpParams };

    return this.http.delete(url);
    // .pipe(
    //   tap(()=>{
    //     this.refreshRequired.next(false);
    //   }),
    //   // catchError(this.handleError('deleteHero'))
    // );
  }

}
