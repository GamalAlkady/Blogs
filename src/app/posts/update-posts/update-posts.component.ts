import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {selectTags} from "../../tags/state/tags.selector";
import {invokedTagsAction} from "../../tags/state/tags.actions";
import {selectAppState} from "../../store/app.selector";
import {setAPIStatus} from "../../store/app.action";
import {AppState} from "../../store/app.state";
import {invokeUpdatePostAPI} from "../state/posts.actions";

@Component({
  selector: 'app-update-posts',
  templateUrl: './update-posts.component.html',
  styleUrls: ['./update-posts.component.css']
})
export class UpdatePostsComponent implements OnInit{

  _tags=[];
  constructor(
    private store:Store,
    private appStore:Store<AppState>,
    public dialogRef:MatDialogRef<UpdatePostsComponent>,
    @Inject(MAT_DIALOG_DATA) public post:any
  ) {
    post.tags.forEach((t)=>{
      this._tags.push(t.id)
    })
  }

  tags$ = this.store.select(selectTags);
  ngOnInit(): void { this.store.dispatch(invokedTagsAction()); }
  tags = new FormControl(this._tags);


  postForm=new FormGroup({
    id:new FormControl(this.post.id),
    title:new FormControl(this.post.title,Validators.required),
    description:new FormControl(this.post.description,Validators.required),
    tags:this.tags
  })


  onSubmit(){
    this.store.dispatch(invokeUpdatePostAPI({ post: this.postForm.value }))
    let appStatus$ = this.appStore.pipe(select(selectAppState))
    appStatus$.subscribe((data) => {
      if (data.apiStatus === 'success') {
        this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } }));
        this.dialogRef.close();
      }
    })
  }
}
