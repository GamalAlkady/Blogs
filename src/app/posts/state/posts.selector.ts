import { createFeatureSelector, createSelector } from "@ngrx/store";
import {Post} from "../../models/posts.model";

export const selectPosts = createFeatureSelector<Post[]>("myPosts");

// export const selectPostById=createSelector()
export const selectPostById = (postId: any) => {
  return createSelector(
    selectPosts,
    (posts: Post[]) => {
      var postById = posts.filter(_ => _.id === postId);
      // console.log(posts)
      if (postById.length == 0) {
        return null;
      }

      return postById[0];
    }
  );
}

export const selectPostsByTag = (tagId: any=null) => {
  return createSelector(
    selectPosts,
    (posts: Post[]) => {
      if (tagId===null) {
        console.log(posts)
        return posts;
      }
      var postsByTag = posts.filter(_ => {
        console.log(_.tags.findIndex(t=>{
          console.log(t.id==tagId)
          return t;
        }))
        if (_.tags.find(t=>t.id===tagId)!==undefined)
          return true;
        return false;
      });
      console.log(postsByTag)
      if (postsByTag.length == 0) {
        return null;
      }

      return postsByTag;
    }
  );
}
