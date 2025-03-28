import type { Media } from "~/types/blocks/Media"
import type { RichText } from "~/types/blocks/RichText"
import type { Seo } from "~/types/blocks/Seo"

type Block = Media | RichText | Seo

export interface Post {
    documentId: string
    title: string
    description: string
    excerpt: string
    publishedAt: string
    updatedAt: string
    slug: string
    featuredImage?: {
        url: string
        alternativeText: string
        width: number
        height: number
    }
    category?: {
        name: string
    }
    author?: {
        name: string
        avatar?: {
            url: string
            alternativeText: string
        }
    }
    content: string
    blocks?: Block[]
}