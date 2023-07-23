<script setup>
import { APP_NAME } from '~/constants'

useHead({
  title: APP_NAME
})
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications w-96! />
  <VitePwaManifest />
  <!-- Avatar Mask -->
  <svg absolute op0 width="0" height="0">
    <defs>
      <clipPath id="avatar-mask" clipPathUnits="objectBoundingBox">
        <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5" />
      </clipPath>
    </defs>
  </svg>
</template>

<style>
* {
  box-sizing: border-box;
}
html, body , #__nuxt{
  font-family: system-ui, -apple-system, BlinkMacSystemFont,
    'SF Pro SC', 'SF Pro Display', 'PingFang SC', 'Microsoft YaHei',
    'Lucida Grande', 'Helvetica Neue', 'Segoe UI', Helvetica, Arial, Verdana, sans-serif;
  height: 100vh;
  margin: 0;
  padding: 0;
}
html.dark {
  background-color: #121212;
}
</style>
