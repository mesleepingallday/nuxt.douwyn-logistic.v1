import type {Post} from "~/types/Post";

export interface Author {
  name: string
  avatar: string
  email: string
  posts: Post[]
}
