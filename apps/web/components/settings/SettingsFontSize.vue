<script lang="ts" setup>
import { DEFAULT_FONT_SIZE } from '~/constants'
import type { FontSize } from '~~/composables/settings/definition'
import { useUserSettings } from '~~/composables/settings/storage'

const userSettings = useUserSettings()

const sizes = (Array.from({ length: 11 })).fill(0).map((x, i) => `${10 + i}px`) as FontSize[]

function setFontSize(e: Event) {
  if (e.target && 'valueAsNumber' in e.target)
    userSettings.value.fontSize = sizes[e.target.valueAsNumber as number]
}
</script>

<template>
  <div flex items-center space-x-4>
    <span text-xs text-secondary>Aa</span>
    <div relative flex flex-1 items-center>
      <input
        :value="sizes.indexOf(userSettings.fontSize)"
        :aria-valuetext="`${userSettings.fontSize}${userSettings.fontSize === DEFAULT_FONT_SIZE ? ` （默认）` : ''}`"
        :min="0"
        :max="sizes.length - 1"
        :step="1"
        type="range"

        w-full cursor-pointer appearance-none bg-transparent focus:outline-none
        @change="setFontSize"
      >
      <div pointer-events-none absolute w-full flex items-center justify-between>
        <div
          v-for="i in sizes.length" :key="i"

          relative h-3 w-3 rounded-full bg-secondary-light
        >
          <div
            v-if="(sizes.indexOf(userSettings.fontSize)) === i - 1"
            class="-left-1 -top-1"
            absolute h-5 w-5 rounded-full bg-primary
          />
        </div>
      </div>
    </div>
    <span text-xl text-secondary>Aa</span>
  </div>
</template>

<style>
  input[type=range]::-webkit-slider-runnable-track {
    --at-apply: bg-secondary-light rounded-full h1 op60;
  }
  input[type=range]:focus:-webkit-slider-runnable-track {
    --at-apply: outline-2 outline-red;
  }
  input[type=range]::-webkit-slider-thumb {
    --at-apply: w3 h3 bg-primary -mt-1 outline outline-3 outline-primary rounded-full cursor-pointer appearance-none;
  }
  input[type=range]::-moz-range-track {
    --at-apply: bg-secondary-light rounded-full h1 op60;
  }
  input[type=range]:focus::-moz-range-track {
    --at-apply: outline-2 outline-red;
  }
  input[type=range]::-moz-range-thumb {
    --at-apply: w3 h3 bg-primary -mt-1 outline outline-3 outline-primary rounded-full cursor-pointer appearance-none border-none;
  }
</style>
