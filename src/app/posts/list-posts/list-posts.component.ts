import { Component } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {MatDialog} from "@angular/material/dialog";
import {PostsService} from "../posts.service";
import {selectPostById, selectPosts, selectPostsByTag} from "../state/posts.selector";
import {invokeDeletePostAPI, invokedPostsAction, invokedPostsActionBy} from "../state/posts.actions";
import {ConfirmDeleteComponent} from "../../confirm-delete/confirm-delete.component";
import {selectAppState} from "../../store/app.selector";
import {setAPIStatus} from "../../store/app.action";
import {CreatePostsComponent} from "../create-posts/create-posts.component";
import {selectTags} from "../../tags/state/tags.selector";
import {Post} from "../../models/posts.model";
import {FormControl, FormGroup} from "@angular/forms";
import {UpdatePostsComponent} from "../update-posts/update-posts.component";
import {invokedTagsAction} from "../../tags/state/tags.actions";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})

export class ListPostsComponent {

  _search:any=null;

  constructor(
    private store: Store,
    private appStore: Store<AppState>,
    public dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
    private postServices: PostsService) { }

  posts$ = this.store.select(selectPosts);
  tags$ = this.store.select(selectTags);


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param=>{
      if (param.get('tagId'))
        this.store.dispatch(invokedPostsAction({tagId:parseInt(param.get('tagId'))}));
      else
        this.store.dispatch(invokedPostsAction({tagId:0}));
    })

    this.store.dispatch(invokedTagsAction());
  }

  searchPost(event){
    this.store.dispatch(invokedPostsActionBy({search:this._search}));
    let appStatus$=this.appStore.pipe(select(selectAppState))
    appStatus$.subscribe((data)=>{
      // console.log(data)
      if(data.apiStatus==='success'){
        this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}));
        this._search=null;
      }
    })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CreatePostsComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration
    });
  }

  editPost(post: Post) {
    const dialogRef = this.dialog.open(UpdatePostsComponent, {
      data: { ...post },
      width: '50%'
    });
  }

  deletePost(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, { data: "post" });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.store.dispatch(invokeDeletePostAPI({ id: id}));
        let appStatus$ = this.appStore.pipe(select(selectAppState))
        appStatus$.subscribe((data) => {
          if (data.apiStatus === 'success') {
            this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } }));
          }
        })
      }
    });
  }

}
