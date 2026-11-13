// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devServer: {
    https: {
      key: './certs/localhost+2-key.pem',
      cert: './certs/localhost+2.pem'
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://localhost:7005'
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],

  css:['~/assets/css/main.css'],

  vite: { 
    plugins: [
      tailwindcss()
    ]
  },

  typescript:{
    strict: true,
    typeCheck: true
  },
})
