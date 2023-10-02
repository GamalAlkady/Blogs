import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {filter, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {selectPostById} from "../state/posts.selector";
import {Post} from "../../models/posts.model";
import {invokedPostsAction} from "../state/posts.actions";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.css']
})
export class ShowPostComponent implements OnInit{
  post$: Post;
  constructor(public activatedRoute: ActivatedRoute,
              private store:Store) {}


  id=this.activatedRoute.paramMap.subscribe(param=>{
    // console.log(parseInt(param.get('id').toString()))
    this.store.select(selectPostById(parseInt(param.get('id').toString()))).subscribe((data)=>{
      // console.log(data)
      this.post$=data;
     return data;
   });
    // console.log(this.post$)

    return param.get('id');
  })



  ngOnInit() {
    this.store.dispatch(invokedPostsAction({tagId:0}));
  }

}
