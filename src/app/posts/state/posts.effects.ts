import {Injectable} from "@angular/core";
import {act, Actions, createEffect, ofType} from '@ngrx/effects'

import {EMPTY, map, switchMap, withLatestFrom} from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { setAPIStatus } from "src/app/store/app.action";
import {PostsService} from "../posts.service";
import {
  deletePostAPI, fetchPostById,
  invokeDeletePostAPI, invokedPostById,
  invokedPostsAction, invokedPostsActionBy,
  invokeSavePostAPI,
  invokeUpdatePostAPI,
  postsFetchAPISuccess,
  savePostAPI, updatePostAPI
} from "./posts.actions";
import {selectPosts} from "./posts.selector";

@Injectable()
export class PostsEffects {
  constructor(private actions$:Actions,
              private postService:PostsService,
              private store:Store,
              private appStore:Store<AppState>) {}


  loadAllPosts$=createEffect(()=>
    this.actions$.pipe(
      ofType(invokedPostsAction),
      withLatestFrom(this.store.select(selectPosts)),
      switchMap(([action,postsFromStore])=>{
        if(postsFromStore.length>0){
          return EMPTY;
        }
         return this.postService.get(action.tagId)
         .pipe(
           map((data)=> postsFetchAPISuccess({posts:data}))
         )
      })
    )
  )

  loadPostsBy$=createEffect(()=>
    this.actions$.pipe(
      ofType(invokedPostsActionBy),
      switchMap((action)=>{
        this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
        return this.postService.getBy("search="+action.search)
          .pipe(
            map((data)=> {
              this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'}}));
              return postsFetchAPISuccess({posts:data})
            })
          )
      })
    )
  )

  getOnePost$=createEffect(()=>
    this.actions$.pipe(
      ofType(invokedPostById),
      switchMap((action)=>{
        return this.postService.getOne(action.id)
          .pipe(
            map((data)=>fetchPostById({post:data}))
          )
      })
    )
  )

  saveNewPost$=createEffect(()=>
    this.actions$.pipe(
      ofType(invokeSavePostAPI),
      switchMap((action)=>{
        // console.log(action)
        this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
        return this.postService
          .create(action.post)
          .pipe(
            map((data)=>{
              this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'}}));
              return savePostAPI({post:data});
            })
          )
      })
    )
  )


  updatePost$=createEffect(()=>
    this.actions$.pipe(
      ofType(invokeUpdatePostAPI),
      switchMap((action)=>{
        // console.log(action)
        this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
        return this.postService
          .update(action.post)
          .pipe(
            map((data)=>{
              this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'}}));
              return updatePostAPI({response:data});
            })
          )
      })
    )
  )


  deletePost$=createEffect(()=>
    this.actions$.pipe(
      ofType(invokeDeletePostAPI),
      switchMap((action)=>{
        // console.log(action)
        this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}));
        return this.postService
          .delete(action.id)
          .pipe(
            map((data)=>{
              this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'}}))
              return deletePostAPI({id:action.id});
            })
          )
      })
    )
  )

  // deletePost$=createEffect(()=>{
  //   this.actions$.pipe(
  //     ofType(invokeDeletePostAPI),
  //     switchMap((action)=>{
  //       return this.postService
  //         .delete(action.id).pipe(
  //           map((data)=>{
  //             return deletePostAPI({id:action.id});
  //           })
  //       )
  //     })
  //   )
  // })



}
