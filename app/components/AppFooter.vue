<script setup lang="ts">
const { t } = useI18n()

const items = [
  {
    label: 'Legal Notices',
    to: '#'
  },
  {
    label: 'Data Protection Policy',
    to: '#'
  },
  {
    label: 'Code of Conduct',
    to: '#'
  },
  {
    label: 'Business Partner',
    to: '#'
  }
]

const columns = [{
  label: 'Solutions',
  children: [{
    label: 'Warehousing'
  }, {
    label: 'Docs'
  }, {
    label: 'Roadmap'
  }, {
    label: 'Changelog'
  }]
}, {
  label: 'About Us',
  children: [{
    label: 'Affiliates'
  }, {
    label: 'Portal'
  }, {
    label: 'Jobs'
  }, {
    label: 'Sponsors'
  }]
}, {
  label: 'Activities',
  children: [{
    label: 'About'

  }, {
    label: 'Pricing'
  }, {
    label: 'Careers'
  }, {
    label: 'Blog'
  }]
}, {
  label: 'Follow Us',
  children: [{
    label: 'About'
  }, {
    label: 'Pricing'
  }, {
    label: 'Careers'
  }, {
    label: 'Blog'
  }]
}
]
</script>

<template>
  <USeparator
    icon="i-simple-icons-nuxtdotjs"
    class="h-px"
  />

  <UFooter :ui="{ top: 'border-b border-(--ui-border)' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns">
          <template #left>
            <NuxtLink to="/">
              <UColorModeImage
                light="/logos/bosch-light.svg"
                dark="/logos/bosch.svg"
                class="w-auto h-6 shrink-0"
              />
            </NuxtLink>
            <p class="mt-4 text-sm text-(--ui-text-muted) max-w-[300px]">
              {{ t('description') }}
            </p>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-sm text-(--ui-text-muted)">
        Copyright Douwyn Logistics © {{ new Date().getFullYear() }}. All rights reserved.
      </p>
    </template>

    <template #right>
      <UNavigationMenu
        :items="items"
        variant="link"
      />
    </template>
  </UFooter>
</template>
