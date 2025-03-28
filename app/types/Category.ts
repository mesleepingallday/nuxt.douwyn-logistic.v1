import type { Post } from '~/types/Post'

export interface Category {
  id: number
  name: string
  slug: string
  description: string
  publishedAt: string
  updatedAt: string
  locale: string

  // relation --maybe
  posts: Post[]
}
