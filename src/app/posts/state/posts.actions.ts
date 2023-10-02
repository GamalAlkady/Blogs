import { createAction, props } from "@ngrx/store";
import { Post } from "../../models/posts.model";


export const invokedPostsAction = createAction(
  "[Post API] invoke Posts Fetch API",
  props<{ tagId:any }>()
);

export const invokedPostsActionBy = createAction(
  "[Post API] invoke Posts Fetch API",
  props<{ search:string }>()
);

export const postsFetchAPISuccess = createAction(
  "[Post API]  posts fetch api success",
  // (allCategories:ReadonlyArray<Post>)=>allCategories
  props<{ posts: any }>()
)

// fetch post by id
export const invokedPostById=createAction(
  "[Post API]  invoked fetch post by id ",
  props<{id:number}>()
)

export const fetchPostById=createAction(
  "[Post API]  posts fetch by id",
  props<{post:any}>()
)

// save post
export const invokeSavePostAPI = createAction(
  "[Post API] invoke save posts  API",
  props<{ post: any}>()
)

export const savePostAPI = createAction(
  "[Post API] save post  API Success",
  props<{ post: Post }>()
)

// update post

export const invokeUpdatePostAPI = createAction(
  "[Post API] invoke update posts  API",
  props<{ post: any }>()
)

export const updatePostAPI = createAction(
  "[Post API] update post  API Success",
  props<{ response: any }>()
)

// delete post
export const invokeDeletePostAPI = createAction(
  "[Post API] invoke delete posts  API",
  props<{ id: number}>()
)

export const deletePostAPI = createAction(
  "[Post API] delete post  API Success",
  props<{ id: number }>()
)
