import {Injectable} from "@angular/core";
import {act, Actions, createEffect, ofType} from '@ngrx/effects'

import {EMPTY, map, switchMap, withLatestFrom} from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { setAPIStatus } from "src/app/store/app.action";
import {TagsService} from "../tags.service";
import {
  deleteTagAPI,
  invokeDeleteTagAPI,
  invokedTagsAction,
  invokeSaveTagAPI,
  invokeUpdateTagAPI,
  tagsFetchAPISuccess,
  saveTagAPI, updateTagAPI
} from "./tags.actions";
import {selectTags} from "./tags.selector";

@Injectable()
export class TagsEffects {
  constructor(private actions$:Actions,
              private tagService:TagsService,
              private store:Store,
              private appStore:Store<AppState>) {}


  loadAllTags$=createEffect(()=>
    this.actions$.pipe(
      ofType(invokedTagsAction),
      withLatestFrom(this.store.select(selectTags)),
      switchMap(([,tagsFromStore])=>{
        if(tagsFromStore.length>0){
          return EMPTY;
        }
        return this.tagService.get()
          .pipe(
            map((data)=> tagsFetchAPISuccess({tags:data}))
          )
      })
    )
  )


  saveNewTag$=createEffect(()=>
    this.actions$.pipe(
      ofType(invokeSaveTagAPI),
      switchMap((action)=>{
        // console.log(action)
        this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
        return this.tagService
          .create(action.tag)
          .pipe(
            map((data)=>{
              this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'}}));
              return saveTagAPI({tag:data});
            })
          )
      })
    )
  )


  updateTag$=createEffect(()=>
    this.actions$.pipe(
      ofType(invokeUpdateTagAPI),
      switchMap((action)=>{
        // console.log(action)
        this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
        return this.tagService
          .update(action.formData)
          .pipe(
            map((data)=>{
              this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'}}));
              return updateTagAPI({response:data});
            })
          )
      })
    )
  )


  deleteTag$=createEffect(()=>
    this.actions$.pipe(
      ofType(invokeDeleteTagAPI),
      switchMap((action)=>{
        // console.log(action)
        this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}));
        return this.tagService
          .delete(action.id,action.photo)
          .pipe(
            map((data)=>{
              this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'}}))
              return deleteTagAPI({id:action.id});
            })
          )
      })
    )
  )

  // deleteTag$=createEffect(()=>{
  //   this.actions$.pipe(
  //     ofType(invokeDeleteTagAPI),
  //     switchMap((action)=>{
  //       return this.tagService
  //         .delete(action.id).pipe(
  //           map((data)=>{
  //             return deleteTagAPI({id:action.id});
  //           })
  //       )
  //     })
  //   )
  // })



}
