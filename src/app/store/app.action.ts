import { createAction, props } from "@ngrx/store";
import { AppState } from "./app.state";

export const setAPIStatus = createAction(
  "[API] success or failur status",
  props<{ apiStatus: AppState }>()
)
