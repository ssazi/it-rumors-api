<script setup lang="ts">
import { version } from '../package.json'
</script>

<template>
  <footer p4 text-sm text-secondary-light flex="~ col">
    <div flex="~ gap2" mb4 items-center>
      <DarkToggle />
    </div>
    <div>
      版本: <NuxtLink
        external
        href="https://github.com/dxhuii/itrumors"
        target="_blank"
        font-mono
      >
        v{{ version }}
      </NuxtLink>
    </div>
    <div>
      <NuxtLink to="/">
        关于
      </NuxtLink> &middot; <NuxtLink
        external
        href="https://github.com/dxhuii/itrumors"
        target="_blank"
        font-mono
      >
        Github
      </NuxtLink>
    </div>
  </footer>
</template>
