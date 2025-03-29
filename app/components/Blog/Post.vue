<script setup lang="ts">
import type { Post } from '~/types/Post'

defineProps({
  post: {
    type: Object as () => Post,
    required: true
  }
})
</script>

<template>
  <ULink
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
    :to="`/blogs/${post.slug}`"
  >
    <NuxtImg
      :src="post.featured_image?.url || 'https://placehold.co/400x250/png'"
      :alt="post.title"
      class="w-full h-56 object-cover"
    />
    <div class="p-4">
      <!-- Only show category if it exists -->
      <div v-if="post.category" class="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full inline-block mb-2">
        {{ post.category.name }}
      </div>
      <h3 class="text-lg font-semibold text-gray-800 line-clamp-2">
        {{ post.title }}
      </h3>
      <p class="text-gray-600 mt-1 line-clamp-2">
        {{ post.excerpt }}
      </p>
      <p class="text-gray-500 text-sm mt-2">
        {{ post.publishedAt }}
      </p>
    </div>
  </ULink>
</template>

<style scoped>

</style>
