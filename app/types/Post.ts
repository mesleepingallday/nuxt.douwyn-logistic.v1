import type { Media } from '~/types/blocks/Media'
import type { RichText } from '~/types/blocks/RichText'
import type { Seo } from '~/types/blocks/Seo'

type Block = Media | RichText | Seo

export interface Post {
  documentId: string
  title: string
  slug: string
  // content: string
  excerpt: string
  featured_image: string
  category?: {
    name: string
    slug: string
  }
  author?: {
    name: string
    avatar?: {
      url: string
      alternativeText: string
    }
  }
  tags?: [{
    name: string
    url: string
  }]
  description: string
  publishedAt: string
  updatedAt: string
  blocks?: Block[]
  // Optional SEO field if you want dedicated SEO for posts
  seo?: Omit<Seo, '__component' | 'id'>
}
