// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  "app": {
    "head": {
      "viewport": "width=device-width, initial-scale=1",
      "title": "Nore",
      "meta": [
          { "name": "description", "content": "這是 Nore" },
          { "property": "og:title", "content": "這是 Nore" },
          { "property": "og:description", "content": "這是 Nore" },
      ]
    }
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
