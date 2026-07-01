const { API_URL } = process.env;

export default defineNuxtConfig({
  ssr: false,

  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    'shadcn-nuxt',
  ],

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },

  i18n: {
    locales: [{ code: 'ru', language: 'ru-RU', file: 'ru.json' }],
    defaultLocale: 'ru',
    langDir: 'locales/',
    strategy: 'no_prefix',
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      apiBase: API_URL,
    },
  },

  typescript: {
    strict: true,
  },
});
