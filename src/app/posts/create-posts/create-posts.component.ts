import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {PostsService} from "../posts.service";
import {select, Store} from "@ngrx/store";
import {selectAppState} from "../../store/app.selector";
import {setAPIStatus} from "../../store/app.action";
import {invokeSavePostAPI} from "../state/posts.actions";
import {AppState} from "../../store/app.state";
import {selectTags} from "../../tags/state/tags.selector";
import {invokedTagsAction} from "../../tags/state/tags.actions";

@Component({
  selector: 'app-create-posts',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.css']
})


export class CreatePostsComponent implements OnInit{

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreatePostsComponent>,
    private postsService: PostsService,
    private store:Store,
    private appStore:Store<AppState>
  ) {}

  postForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    tags:['']
  })

  tags$ = this.store.select(selectTags);
  ngOnInit(): void { this.store.dispatch(invokedTagsAction()); }
  tags = new FormControl('');

  onSubmit() {
    // console.log(this.tags.value)
    this.postForm.get('tags').setValue(this.tags.value);

    // console.log(this.postForm.get('tags').value)
    this.store.dispatch(invokeSavePostAPI({post:this.postForm.value} ))
    let appStatus$=this.appStore.pipe(select(selectAppState))
    appStatus$.subscribe((data)=>{
      if(data.apiStatus==='success'){
        this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}));
        this.dialogRef.close();
      }
    })
  }
}
