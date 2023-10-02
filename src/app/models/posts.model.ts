import {User} from "./users.model";
import {Tag} from "./_tags.model";

export interface Post {
  id: number,
  title: string,
  description: string,
  user:User,
  tags:Tag[]
}
