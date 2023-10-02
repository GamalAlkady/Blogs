import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { CreatePostsComponent } from './create-posts/create-posts.component';
import { UpdatePostsComponent } from './update-posts/update-posts.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {postsReducer} from "./state/posts.reducer";
import {PostsEffects} from "./state/posts.effects";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {LayoutModule} from "../layout/layout.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    ListPostsComponent,
    CreatePostsComponent,
    UpdatePostsComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature("myPosts", postsReducer),
    EffectsModule.forFeature([PostsEffects]),
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    RouterModule,
  ]
})
export class PostsModule { }
