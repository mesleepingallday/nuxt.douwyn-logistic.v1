<script setup lang="ts">
import type { Post } from '~/types/Post'

const { t } = useI18n()
const { formatDate } = useDate()

const props = defineProps({
  post: {
    type: Object as () => Post,
    required: true
  }
})

const blogCoverUrl = computed(() => {
  const post = props.post

  if (!post) {
    return
  }

  return post?.featured_image?.url.startsWith('/uploads')
    ? post?.featured_image?.url.slice(8)
    : post?.featured_image?.url
})
</script>

<template>
  <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="md:col-span-1">
      <NuxtLink
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
        :to="`/blogs/${post?.slug}`"
      >
        <NuxtImg
          provider="strapi"
          :src="blogCoverUrl"
          :alt="post.title"
          class="rounded-lg shadow-md"
        />
      </NuxtLink>
    </div>
    <div class="md:col-span-1">
      <NuxtLink
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
        :to="`/blogs/category/${post.category.slug}`"
      >
        <div class="bg-purple-100 dark:bg-purple-700 text-purple-700 dark:text-purple-100 text-sm font-medium px-3 py-1 rounded-full inline-block mb-2">
          {{ post.category.name }}
        </div>
      </NuxtLink>
      <NuxtLink
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
        :to="`/blogs/${post.slug}`"
      >
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          {{ post.title }}
        </h2>
      </NuxtLink>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        {{ post.excerpt }}
      </p>
      <p class="text-gray-500 dark:text-gray-300 text-sm mt-4">
        {{ t('on') }} {{ formatDate(post.publishedAt) }}
      </p>
    </div>
  </div>
</template>

<style scoped>
</style>
