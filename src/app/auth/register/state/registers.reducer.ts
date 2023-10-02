import { createReducer, on } from '@ngrx/store';
import {RegisterUser} from "./registers.actions";
import {User} from "../../../models/users.model";

export const initialState: ReadonlyArray<User> = [];

export const registersReducer = createReducer(
  initialState,
  on(RegisterUser, (state, { user }) => {
    console.log(user)
    return user;
  })
)
