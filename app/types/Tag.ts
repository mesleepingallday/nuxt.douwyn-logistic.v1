import type {Post} from "~/types/Post";

export interface Tag {
  name: string
  slug: string
  description: string
  posts: Post[]
}
