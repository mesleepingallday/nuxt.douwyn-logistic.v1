// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxtjs/strapi'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  mdc: {
    highlight: {
      noApiRoute: false
    }
  },

  routeRules: {
    '/': { prerender: true }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    vueI18n: './i18n.config.ts',
    locales: [
      {
        code: 'en',
        language: 'en',
        name: 'English',
        file: 'en.json',
        isCatchallLocale: true
      },
      {
        code: 'vi',
        language: 'vi',
        name: 'Tiếng Việt',
        file: 'vi.json'
      }
    ],
    defaultLocale: 'en',
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      redirectOn: 'root'
    }
  }
})
