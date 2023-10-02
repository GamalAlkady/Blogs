import { createFeatureSelector, createSelector } from "@ngrx/store";
import {Tag} from "../../models/_tags.model";

export const selectTags = createFeatureSelector<Tag[]>("myTags");

export const selectTagById = (TagId: number) => {
  return createSelector(
    selectTags,
    (Tags: Tag[]) => {
      var TagById = Tags.filter(_ => _.id === TagId);
      if (TagById.length == 0) {
        return null;
      }

      return TagById[0];
    }
  );
}
