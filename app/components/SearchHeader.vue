<script setup lang="ts">
const { t } = useI18n()

const isActiveSearch = ref(false)
const searchValue = ref("")
const searchPlaceholder = computed(() => `${t('search')}...`);

const toggleSearch = (): void => {
    isActiveSearch.value = !isActiveSearch.value
}
</script>

<template>
  <UIcon
    name="i-lucide-search"
    class="size-5"
    @click="toggleSearch"
  />

  <UInput
    v-if="isActiveSearch"
    v-model="searchValue"
    size="md"
    variant="outline"
    :placeholder="searchPlaceholder"
  />

  <UIcon
    v-if="isActiveSearch"
    name="lucide:x"
    class="size-5"
    @click="searchValue = ''"
  />
</template>

<style scoped>

</style>
