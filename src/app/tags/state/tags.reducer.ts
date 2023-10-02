import { createReducer, on } from '@ngrx/store';
import {Tag} from "../../models/_tags.model";
import {deleteTagAPI, tagsFetchAPISuccess, saveTagAPI, updateTagAPI} from "./tags.actions";

export const initialState: ReadonlyArray<Tag> = [];

export const tagsReducer = createReducer(
  initialState,
  on(tagsFetchAPISuccess, (state, { tags }) => {
    // console.log(tags)

    let newTags=tags['data'];

    // console.log(tags['data'])
    return newTags;
  }),
  on(saveTagAPI, (state, { tag }) => {
    let newState = [...state];
    // console.log(tag['data'])
    newState.unshift(tag['data']);
    return newState;
  }),
  on(deleteTagAPI, (state, { id }) => {
    let newState = state.filter(_ => _.id !== id);
    console.log(id)
    return newState;
  }),
  on(updateTagAPI, (state, { response }) => {
    // let index=state.findIndex(_=>_.id===response.id);
    // let newState = [...state];
    // newState[index]=response;
    let newState = state.map((item) => {
      if (item.id === response.id)
        return response;
      return item;
    });

    return newState;
  })
)
