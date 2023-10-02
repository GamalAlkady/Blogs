import { createAction, props } from "@ngrx/store";
import { Tag } from "../../models/_tags.model";


export const invokedTagsAction = createAction("[Tag API] invoke Tags Fetch API");

export const tagsFetchAPISuccess = createAction(
  "[Tag API]  tags fetch api success",
  // (allCategories:ReadonlyArray<Tag>)=>allCategories
  props<{ tags: any }>()
)

// save tag
export const invokeSaveTagAPI = createAction(
  "[Tag API] invoke save tags  API",
  props<{ tag: any}>()
)

export const saveTagAPI = createAction(
  "[Tag API] save tag  API Success",
  props<{ tag: Tag }>()
)

// update tag

export const invokeUpdateTagAPI = createAction(
  "[Tag API] invoke update tags  API",
  props<{ formData: FormData }>()
)

export const updateTagAPI = createAction(
  "[Tag API] update tag  API Success",
  props<{ response: any }>()
)

// delete tag
export const invokeDeleteTagAPI = createAction(
  "[Tag API] invoke delete tags  API",
  props<{ id: number, photo: string }>()
)

export const deleteTagAPI = createAction(
  "[Tag API] delete tag  API Success",
  props<{ id: number }>()
)
