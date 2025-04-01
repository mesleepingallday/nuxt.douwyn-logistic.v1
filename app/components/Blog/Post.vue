<script setup lang="ts">
import type { Post } from '~/types/Post'
import { useDate } from '~/composables/useDate'

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
  return post?.featured_image?.url.startsWith('/uploads')
    ? post?.featured_image?.url.slice(8)
    : post?.featured_image?.url
})
</script>

<template>
  <ULink
    class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
    :to="`/blogs/${post.slug}`"
  >
    <NuxtImg
      provider="strapi"
      :src="blogCoverUrl"
      :alt="post.title"
      class="w-full h-56 object-cover"
      loading="lazy"
    />
    <div class="p-4">
      <ULink
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
        :to="`/blogs/category/${post.category.slug}`"
      >
        <div
          v-if="post.category"
          class="bg-purple-100 dark:bg-purple-700 text-purple-700 dark:text-purple-100 text-sm font-medium px-3 py-1 rounded-full inline-block mb-2"
        >
          {{ post.category.name }}
        </div>
      </ULink>
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">
        {{ post.title }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
        {{ post.excerpt }}
      </p>
      <p class="text-gray-500 dark:text-gray-300 text-sm mt-2">
        {{ t('on') }} {{ formatDate(post.publishedAt) }}
      </p>
    </div>
  </ULink>
</template>

<style scoped>
</style>
