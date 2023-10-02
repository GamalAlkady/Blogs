import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService as AuthGuard} from './auth/auth-guard.service';
import {LoginComponent} from "./auth/login/login.component";
import {ListPostsComponent} from "./posts/list-posts/list-posts.component";
import {RegisterComponent} from "./auth/register/register.component";
import {ListTagsComponent} from "./tags/list-tags/list-tags.component";
import {ShowPostComponent} from "./posts/show-post/show-post.component";


const routes: Routes = [
  // {path:'**', redirectTo:'login',pathMatch:'full'},
  { path: '', component: ListPostsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tags', component: ListTagsComponent,canActivate:[AuthGuard] },
  { path: 'posts', component: ListPostsComponent,canActivate:[AuthGuard] },
  { path: 'posts-tag/:tagId', component: ListPostsComponent,canActivate:[AuthGuard] },
  {path:'show-post/:id',component:ShowPostComponent,canActivate:[AuthGuard]},
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
