<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'
import { defineWebPage, defineItemList, defineBreadcrumb } from 'nuxt-schema-org/schema'
import { useSchemaOrg } from '@unhead/schema-org/vue'
import type { Post } from '~/types/Post'
import HeadingPost from '~/components/Blog/HeadingPost.vue'

const { t, locale } = useI18n<StrapiLocale | null | undefined>()
const localePath = useLocalePath()
const appConfig = useAppConfig()
const { find } = useStrapi()
const route = useRoute()

const page = ref(1)
const pageSize = ref(9)
const homeBreadcrumb = ref(t('home'))
const items = ref<BreadcrumbItem[]>([
  {
    label: homeBreadcrumb.value,
    to: '/'
  },
  {
    label: 'Blogs Douwyn Logistics'
  }
])

const { data, refresh } = await useAsyncData<{ data: Post[] }>(
  'blogs-page-' + locale.value + '-' + page.value,
  () => find('posts', {
    sort: 'publishedAt:desc',
    populate: {
      featured_image: {
        fields: ['url', 'name']
      },
      category: {
        fields: ['name', 'slug']
      },
      author: {
        fields: ['name', 'email']
      }
    },
    locale: locale.value === 'zh-CN' ? 'zh' : locale.value,
    pagination: {
      page: page.value,
      pageSize: pageSize.value
    }
  }), {
    watch: [locale, page]
  })

// Data
const posts = computed<Post[] | []>(() => data.value?.data || [])
const totalPages = computed(() => data.value?.meta?.pagination.total || 1)

// SEO

const i18nHead = useLocaleHead()

useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang
  },
  title: t('blogs.list') + ' - ' + appConfig.name || '',
  meta: [
    { name: 'description', content: t('blogs.listDescription') || '' },
    ...(i18nHead.value.meta || [])
  ],
  link: [...(i18nHead.value.link || [])]
})

useSeoMeta({
  title: t('blogs.list') + ' - ' + appConfig.name || '',
  description: t('blogs.listDescription') || '',
  ogUrl: appConfig.baseUrl + route.path,
  ogTitle: t('blogs.list') + ' - ' + appConfig.name || '',
  ogDescription: t('blogs.listDescription') || '',
  ogImage: 'https://douwyn.com/social-card.png',
  ogType: 'website',
  twitterTitle: t('blogs.list') + ' - ' + appConfig.name || '',
  twitterDescription: t('blogs.listDescription') || '',
  twitterImage: 'https://douwyn.com/social-card.png',
  twitterCard: 'summary_large_image'
})

useSchemaOrg([
  defineWebPage({
    name: t('blogs.list') + ' - ' + appConfig.name || '',
    description: t('blogs.listDescription') || '',
    inLanguage: ['en', 'vi', 'zh'],
    about: {
      '@id': '#identity'
    },
    datePublished: new Date(2024, 12, 8),
    image: 'https://douwyn.com/logo.jpg',
    primaryImageOfPage: {
      '@id': 'https://douwyn.com/logo.jpg'
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
      }
    ]
  }),
  defineItemList({
    itemListElement: posts.value.map((post, index) => ({
      '@type': 'ListItem',
      '@id': localePath('/blogs/' + post.slug, locale.value),
      'position': index + 1,
      'url': localePath('/blogs/' + post.slug, locale.value),
      'name': post.title,
      'description': post.description
    })),
    itemListOrder: 'Descending',
    numberOfItems: posts.value.length
  }),
  {
    '@type': 'Blog',
    '@id': localePath('/blogs', locale.value),
    'name': t('blogs.list') + ' - ' + appConfig.name || '',
    'description': t('blogs.listDescription') || '',
    'inLanguage': ['en', 'vi'],
    'about': {
      '@id': 'https://douwyn.com/#identity'
    },
    'datePublished': new Date(2024, 12, 8)
  }
])

watch(() => locale.value, () => {
  refresh()
})
</script>

<template>
  <div id="app" class="dark:bg-gray-900 dark:text-white">
    <div class="container mx-auto px-4 py-8">
      <UBreadcrumb :items="items" />

      <h1 class="text-4xl font-semibold text-gray-800 dark:text-gray-200 mt-4">
        360° Logistic
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        {{ t('blogs.description') }}
      </p>

      <div class="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div class="relative flex items-center w-full md:w-1/3">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            class="block w-full p-3 pl-10 text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Search in the blog"
          >
        </div>

        <div class="relative w-full md:w-1/3">
          <select
            class="block appearance-none w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-500 dark:focus:border-green-500 p-3"
          >
            <option selected>
              Solutions
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-500">
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        <div class="relative w-full md:w-1/3">
          <select
            class="block appearance-none w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-500 dark:focus:border-green-500 p-3"
          >
            <option selected>
              Activities
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-500">
            <svg
              class="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <a
        href="#"
        class="inline-block mt-4 text-sm text-gray-600 dark:text-gray-400 hover:underline"
      >
        <svg
          class="w-4 h-4 inline-block align-middle mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m-15.357-2A8.003 8.003 0 0119.416 15m0 0h-4"
          />
        </svg>
        Reset filters
      </a>

      <div class="mt-6 flex space-x-4">
        <ULink
          to="/blogs/category/sustainability"
        >
          <UButton
            class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center hover:cursor-pointer"
          >
            <UIcon
              name="material-symbols:double-arrow-rounded"
              class="size-6 mr-2 text-green-500"
            />
            {{ t('sustainability') }}
          </UButton>
        </ULink>

        <ULink
          to="/blogs/category/supply-chain-performance"
        >
          <UButton
            class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center hover:cursor-pointer"
          >
            <UIcon
              name="material-symbols:double-arrow-rounded"
              class="size-6 mr-2 text-green-500"
            />
            {{ t('supplyChain') }}
          </UButton>
        </ULink>

        <ULink
          to="/blogs/category/consumer-market-trends"
        >
          <UButton
            class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center hover:cursor-pointer"
          >
            <UIcon
              name="material-symbols:double-arrow-rounded"
              class="size-6 mr-2 text-green-500"
            />
            {{ t('consumerAndMarket') }}
          </UButton>
        </ULink>

        <ULink
          to="/blogs/category/innovation"
        >
          <UButton
            class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center hover:cursor-pointer"
          >
            <UIcon
              name="material-symbols:double-arrow-rounded"
              class="size-6 mr-2 text-green-500"
            />
            {{ t('innovation') }}
          </UButton>
        </ULink>
      </div>

      <HeadingPost :post="posts[0] as Post" />

      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-12">
        {{ t('latest-articles-header') }}
      </h2>

      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <BlogPost
          v-for="post in posts.slice(1)"
          :key="post.documentId"
          :post="post"
        />

        <!-- Fallback if no posts -->
        <div
          v-if="!posts.slice(1).length"
          class="col-span-3 text-center py-8 text-gray-500 dark:text-gray-400"
        >
          No blog posts found
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-8 space-x-2">
        <UPagination
          v-model:page="page"
          :items-per-page="pageSize"
          :total="totalPages"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
