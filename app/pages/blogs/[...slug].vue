<script lang="ts" setup>
import { defineWebPage, defineArticle, defineBreadcrumb } from 'nuxt-schema-org/schema'
import { useSchemaOrg } from '@unhead/schema-org/vue'
import type { Post } from '~/types/Post'
import type { RichText } from '~/types/blocks/RichText'
import type { Seo } from '~/types/blocks/Seo'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const { findOne } = useStrapi()
const appConfig = useAppConfig()
const route = useRoute()

const split = route.path.split('/')
let slug = split[split.length - 1]
if (slug === undefined) {
  slug = split[split.length - 2]
}

const { data, status, error, refresh } = await useAsyncData<{ data: Post[] }>('blog-' + locale.value + '-' + slug, () => findOne('posts', {
  locale: locale.value,
  filters: {
    slug
  },
  populate: {
    blocks: {
      populate: '*'
    },
    cover: {
      populate: '*'
    },
    category: {
      fields: [
        'name',
        'slug'
      ]
    },
    author: {
      fields: [
        'name',
        'email',
        'documentId'
      ]
    }
  }
}), {
  watch: [locale]
})

const page = computed<Post | null>(() => data.value?.data[0] || null)
const richText = computed<RichText | null>(() => {
  return page.value?.blocks?.find(block => block.__component === 'shared.rich-text') as RichText | null
})
const seo = computed<Seo | null>(() => {
  return page.value?.blocks?.find(block => block.__component === 'shared.seo') as Seo | null
})
const renderMarkdownContent = computed(() => renderMarkdown(richText.value?.body || ''))

const links = [
  { label: t('home'), to: '/' },
  { label: t('blogs.breadcrumb'), to: '/blogs' },
  { label: page.value?.title || '' }
]

const i18nHead = useLocaleHead()

useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang
  },
  title: seo.value?.metaTitle || '',
  meta: [
    { name: 'description', content: seo.value?.metaDescription || '' },
    { name: 'keywords', content: seo.value?.keywords || '' },
    ...(i18nHead.value.meta || [])
  ],
  link: [...(i18nHead.value.link || [])]
})

useSeoMeta({
  title: seo.value?.metaTitle || '',
  description: seo.value?.metaDescription || '',
  ogUrl: appConfig.baseUrl + route.path,
  ogTitle: seo.value?.metaTitle || '',
  ogDescription: seo.value?.metaDescription || '',
  ogImage: appConfig.strapi.appUrl + page.value?.featured_image?.url || '',
  ogType: 'article',
  twitterTitle: seo.value?.metaTitle || '',
  twitterDescription: seo.value?.metaDescription || '',
  twitterImage: appConfig.strapi.appUrl + page.value?.featured_image?.url || '',
  twitterCard: 'summary_large_image'
})

useSchemaOrg([
  defineWebPage({
    name: seo.value?.metaTitle || '',
    description: seo.value?.metaDescription || '',
    inLanguage: ['en', 'vi'],
    about: {
      '@id': '#identity'
    },
    datePublished: page.value?.publishedAt || new Date(2024, 12, 8),
    primaryImageOfPage: {
      '@id': appConfig.strapi.appUrl + page.value?.featured_image?.url || ''
    }
  }),
  defineBreadcrumb({
    itemListElement: [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': t('home'),
        'item': localePath('/', locale.value)
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': t('blogs.breadcrumb'),
        'item': localePath('/blogs', locale.value)
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': page.value?.title || '',
        'item': localePath('/blogs/' + slug, locale.value)
      }
    ]
  }),
  defineArticle({
    '@type': 'BlogPosting',
    '@id': localePath('/blogs/' + slug, locale.value),
    'headline': page.value?.category?.name || '',
    'image': appConfig.strapi.appUrl + page.value?.featured_image?.url || '',
    'description': seo.value?.metaDescription || '',
    'datePublished': page.value?.publishedAt || new Date(2024, 12, 8),
    'dateModified': page.value?.updatedAt || new Date(2024, 12, 8),
    'inLanguage': locale.value,
    'publisher': {
      '@id': '#identity'
    },
    'author': {
      '@id': '#identity'
    }
  })
])

watch(() => locale.value, () => {
  refresh()
})
</script>

<template>
  <UMain class="grid grid-cols-1 lg:grid-cols-3 md:space-x-5 md:space-y-5 px-5 mb-10">
    <div class="space-y-5 col-span-2 lg:px-10 py-5">
      <UBreadcrumb
        divider="/"
        :links="links"
        class="py-2"
      />
      <UPage>
        <NuxtImg
          :src="page?.featured_image?.url"
          :alt="page?.featured_image?.alternativeText"
          :width="page?.featured_image?.width"
          :height="page?.featured_image?.height"
          provider="strapi"
          loading="lazy"
          class="mb-5 rounded-lg"
        />
        <div v-if="status === 'success'">
          <UPageHeader
            :headline="page?.category?.name"
            :title="page?.title"
            :description="seo?.metaDescription"
          />
          <UPageBody prose>
            <div
              class="markdown"
              v-html="renderMarkdownContent"
            />
          </UPageBody>
        </div>
        <div v-else-if="status === 'error'">
          <UPageError>
            <p>Error: {{ error?.message }}</p>
          </UPageError>
        </div>
        <div v-else>
          Waiting for about...
        </div>
      </UPage>
    </div>
    <aside class="">
      <!--      <LazyBlogAsideComponent /> -->
    </aside>
  </UMain>
</template>
