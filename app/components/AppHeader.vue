<script setup lang="ts">
import { en, vi, zh_cn } from '@nuxt/ui/locale'

const nuxtApp = useNuxtApp()
const { activeHeadings, updateHeadings } = useScrollspy()
const { t } = useI18n()

const itemsRight = computed(() => [{
  label: t('news'),
  to: '/blog',
  active: activeHeadings.value.includes('features') && !activeHeadings.value.includes('pricing')
}, {
  label: t('contact'),
  to: '/contact',
  active: activeHeadings.value.includes('pricing')
}])

const { locale } = useI18n()

nuxtApp.hooks.hookOnce('page:finish', () => {
  updateHeadings([
    document.querySelector('#features'),
    document.querySelector('#pricing'),
    document.querySelector('#testimonials')
  ].filter(Boolean) as Element[])
})
</script>

<template>
  <UHeader>
    <template #left>
      <ULocaleSelect v-model="locale" :locales="[en, vi, zh_cn]" />
    </template>

    <template #right>
      <div class="flex flex-row gap-3 items-center">
        <UColorModeButton />

        <SearchHeader />
      </div>
    </template>
  </UHeader>

  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <NuxtImg src="/logos/bosch.svg" class="w-auto h-6 shrink-0"/>
      </NuxtLink>

    </template>

    <template #right>
      <UNavigationMenu
        :items="itemsRight"
        variant="link"
        class="hidden lg:block"
      />


    </template>

    <template #body>
      <UNavigationMenu
        :items="itemsRight"
        orientation="vertical"
        class="-mx-2.5"
      />
      <UButton
        class="mt-4"
        label="Download App"
        variant="subtle"
        block
      />
    </template>
  </UHeader>
</template>
