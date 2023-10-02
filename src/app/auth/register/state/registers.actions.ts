import { createAction, props } from "@ngrx/store";
import {User} from "../../../models/users.model";

export const invokedRegisterUser = createAction(
  "[Register API] invoke register user  API",
  props<{ user: any}>()
)

export const RegisterUser = createAction(
  "[Register API] register user  API Success",
  props<{ user: any }>()
)
