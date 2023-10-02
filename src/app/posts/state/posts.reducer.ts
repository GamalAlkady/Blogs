import { createReducer, on } from '@ngrx/store';
import {Post} from "../../models/posts.model";
import {deletePostAPI, fetchPostById, postsFetchAPISuccess, savePostAPI, updatePostAPI} from "./posts.actions";

export const initialState: ReadonlyArray<Post> = [];

export const postsReducer = createReducer(
  initialState,
  on(postsFetchAPISuccess, (state, { posts }) => {
    // console.log(posts['data']['data'])

    let newPosts=posts['data']['data'];
    return newPosts;
  }),
  on(fetchPostById,(state,{post})=>{
    return post;
  }),
  on(savePostAPI, (state, { post }) => {
    let newState = [...state];
    // console.log(post['data'])
    newState.unshift(post['data']);
    return newState;
  }),
  on(deletePostAPI, (state, { id }) => {
    let newState = state.filter(_ => _.id !== id);
    console.log(id)
    return newState;
  }),
  on(updatePostAPI, (state, { response }) => {
    // let index=state.findIndex(_=>_.id===response.id);
    // let newState = [...state];
    // newState[index]=response;
    const post=response['data'];
    // console.log(response['data'])
    let newState = state.map((item) => {
      if (item.id === post.id)
        return post;
      return item;
    });

    return newState;
  })
)
