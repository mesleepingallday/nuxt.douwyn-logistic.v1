import type { FormatImage } from "~/types/FormatImage";

export interface Media {
  __component: 'shared.media'
  id: number
  file?: {
    url: string
    alternativeText: string
    width: number
    height: number
    formats: FormatImage
  }
}
