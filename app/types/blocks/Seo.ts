import type { FormatImage } from "~/types/FormatImage"

export interface Seo {
    __component: 'shared.seo'
    id: number
    keywords: string
    metaDescription: string
    metaTitle: string
    shareImage?: {
      alternativeText: string
      url: string
      width: number
      height: number
      size: number
      formats: FormatImage
    }
}