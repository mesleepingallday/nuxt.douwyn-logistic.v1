<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'
import type { Post } from '~/types/Post'

const { t, locale } = useI18n()
const route = useRoute()
const { find } = useStrapi()

const page = ref(1)
const pageSize = ref(15)

const items = ref<BreadcrumbItem[]>([
  {
    label: t('home'),
    to: '/'
  },
  {
    label: 'Blogs Douwyn Logistics'
  }
])

const { data, status, error, refresh } = await useAsyncData<{ data: Post[] }>(
  'blogs-page-' + locale.value + '-' + page.value,
  () => find('posts', {
    sort: 'publishedAt:desc',
    populate: {
      featured_image: {
        fields: ['url', 'alternativeText', 'caption']
      },
      category: {
        fields: ['name', 'slug']
      },
      author: {
        fields: ['name', 'email']
      }
    }
  }), {
    watch: [locale, page]
  })

watch(() => locale.value, () => {
  refresh()
})
</script>

<template>
  <div id="app">
    <div class="container mx-auto px-4 py-8">
      <UBreadcrumb :items="items" />

      <h1 class="text-4xl font-semibold text-gray-800 mt-4">
        360° Logistic
      </h1>
      <p class="text-gray-600 mt-2">
        Perspectives on issues that are reshaping supply chain.
      </p>

      <div class="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div class="relative flex items-center w-full md:w-1/3">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-400"
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
            class="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Search in the blog"
          >
        </div>

        <div class="relative w-full md:w-1/3">
          <select
            class="block appearance-none w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          >
            <option selected>
              Solutions
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
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
            class="block appearance-none w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          >
            <option selected>
              Activities
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
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
        class="inline-block mt-4 text-sm text-gray-600 hover:underline"
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
        <button
          class="bg-white border border-gray-200 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
        >
          <svg
            class="w-5 h-5 mr-2 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
          Sustainability
        </button>
        <button
          class="bg-white border border-gray-200 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
        >
          <svg
            class="w-5 h-5 mr-2 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
          Supply Chain Performance
        </button>
        <button
          class="bg-white border border-gray-200 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
        >
          <svg
            class="w-5 h-5 mr-2 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
          Consumer and market trends
        </button>
        <button
          class="bg-white border border-gray-200 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
        >
          <svg
            class="w-5 h-5 mr-2 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
          Innovation
        </button>
      </div>

      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="md:col-span-1">
          <img
            src="https://placehold.co/600x400/png"
            alt="A hand touching a digital screen with a map and location pins"
            class="rounded-lg shadow-md"
          >
        </div>
        <div class="md:col-span-1">
          <div class="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full inline-block mb-2">
            Supply
            Chain Performance
          </div>
          <h2 class="text-2xl font-semibold text-gray-800">
            Top strategies driving the future of transportation
            management
          </h2>
          <p class="text-gray-600 mt-2">
            Effective transportation management is key for the cost-efficient and timely
            delivery of goods - which is critical for maintaining customer satisfaction.
          </p>
          <p class="text-gray-500 text-sm mt-4">
            On February 17, 2025
          </p>
        </div>
      </div>

      <h2 class="text-2xl font-semibold text-gray-800 mt-12">
        {{ t('latest-articles-header') }}
      </h2>

      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <BlogPost
          v-for="post in data.data"
          :key="post.documentId"
          :post="post"
        />

        <!-- Fallback if no posts -->
        <div v-if="!data.data.length" class="col-span-3 text-center py-8 text-gray-500">
          No blog posts found
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-8 space-x-2">
        <a
          href="#"
          class="px-3 py-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600"
        >1</a>
        <a
          href="#"
          class="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >2</a>
        <a
          href="#"
          class="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >3</a>
        <a
          href="#"
          class="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >4</a>
        <a
          href="#"
          class="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >...</a>
        <a
          href="#"
          class="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >8</a>
        <a
          href="#"
          class="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
