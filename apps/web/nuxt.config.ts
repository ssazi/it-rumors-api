import { isDevelopment, isWindows } from 'std-env'
import { pwa } from './config/pwa'
import { APP_DESCRIPTION } from './constants'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/image-edge',
    '@nuxthq/ui',
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@vue-macros/nuxt',
    '@vite-pwa/nuxt',
    ...((isDevelopment || isWindows) ? [] : ['nuxt-security'])
  ],

  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true
  },

  css: [
    '@unocss/reset/tailwind.css',
    '~/styles/default-theme.css',
    '~/styles/vars.css',
    '~/styles/global.css',
    '~/styles/scrollbars.css'
  ],

  imports: {
    dirs: [
      './composables/settings'
    ],
    injectAtEnd: true
  },

  vite: {
    build: {
      target: 'esnext'
    }
  },

  postcss: {
    plugins: {
      'postcss-nested': {}
    }
  },

  runtimeConfig: {
    public: {
      privacyPolicyUrl: '',
      translateApi: '',
      defaultServer: 'itrumors.com',
      singleInstance: false
    },
    tmdb: {
      apiKey: process.env.TMDB_API_KEY || ''
    }
  },

  routeRules: {
    // Static generation
    '/': { prerender: true },
    '/settings/**': { prerender: false }
  },

  colorMode: {
    classSuffix: ''
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    },
    prerender: {
      crawlLinks: true
    }
  },

  sourcemap: isDevelopment,

  app: {
    keepalive: true,
    head: {
      viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
      bodyAttrs: {
        class: 'overflow-x-hidden'
      },
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ],
      meta: [
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        // open graph social image
        { property: 'og:title', content: APP_DESCRIPTION },
        { property: 'og:description', content: APP_DESCRIPTION },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/logo.png' },
        { property: 'og:image:width', content: '3800' },
        { property: 'og:image:height', content: '1900' },
        { property: 'og:site_name', content: APP_DESCRIPTION },
        { property: 'twitter:site', content: '' },
        { property: 'twitter:card', content: 'summary_large_image' }
      ]
    }
  },

  // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
  // @ts-ignore nuxt-security is conditional
  security: {
    headers: {
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        value: {
          'default-src': ['\'self\''],
          'base-uri': ['\'self\''],
          'connect-src': ['\'self\'', 'https:', 'http:', 'wss:', 'ws:'],
          'font-src': ['\'self\''],
          'form-action': ['\'none\''],
          'frame-ancestors': ['\'none\''],
          'img-src': ['\'self\'', 'https:', 'http:', 'data:'],
          'media-src': ['\'self\'', 'https:', 'http:'],
          'object-src': ['\'none\''],
          'script-src': ['\'self\'', '\'unsafe-inline\'', '\'wasm-unsafe-eval\''],
          'script-src-attr': ['\'none\''],
          'style-src': ['\'self\'', '\'unsafe-inline\''],
          'upgrade-insecure-requests': true
        },
        route: '/**'
      }
    },
    rateLimiter: false
  },

  pwa,

  devtools: {
    enabled: true
  }
})
