import {Injectable} from "@angular/core";
import {act, Actions, createEffect, ofType} from '@ngrx/effects'

import {EMPTY, map, switchMap, withLatestFrom} from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { setAPIStatus } from "src/app/store/app.action";
import {invokedRegisterUser, RegisterUser} from "./registers.actions";
import {AuthService} from "../../auth.service";

@Injectable()
export class RegistersEffects {
  constructor(private actions$:Actions,
              private authService:AuthService,
              private store:Store,
              private appStore:Store<AppState>) {}



  registerUser$=createEffect(()=>
    this.actions$.pipe(
      ofType(invokedRegisterUser),
      switchMap((action)=>{
        // console.log(action)
        this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:''}}))
        return this.authService
          .register(action.user)
          .pipe(
            map((data)=>{
              this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'',apiStatus:'success'}}));
              return RegisterUser({user:data});
            })
          )
      })
    )
  )

}
