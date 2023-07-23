<script setup lang="ts">
import type { ColorMode } from '~~/composables/settings/definition'

const colorMode = useColorMode()

function setColorMode(mode: ColorMode) {
  colorMode.preference = mode
}
</script>

<template>
  <div flex="~ gap4 wrap" w-full>
    <button
      flex="~ gap-1 center" border="~ base rounded" flex-1 ws-nowrap bg-base p4 btn-text
      :tabindex="colorMode.preference === 'dark' ? 0 : -1"
      :class="colorMode.preference === 'dark' ? 'pointer-events-none' : 'filter-saturate-0'"
      @click="setColorMode('dark')"
    >
      <div i-ri:moon-line />
      深色
    </button>
    <button
      flex="~ gap-1 center" border="~ base rounded" flex-1 ws-nowrap bg-base p4 btn-text
      :tabindex="colorMode.preference === 'light' ? 0 : -1"
      :class="colorMode.preference === 'light' ? 'pointer-events-none' : 'filter-saturate-0'"
      @click="setColorMode('light')"
    >
      <div i-ri:sun-line />
      浅色
    </button>
    <button
      flex="~ gap-1 center" border="~ base rounded" flex-1 ws-nowrap bg-base p4 btn-text
      :tabindex="colorMode.preference === 'system' ? 0 : -1"
      :class="colorMode.preference === 'system' ? 'pointer-events-none' : 'filter-saturate-0'"
      @click="setColorMode('system')"
    >
      <div i-ri:computer-line />
      跟随系统
    </button>
  </div>
</template>
