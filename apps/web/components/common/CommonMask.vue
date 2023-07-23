<script setup lang="ts">
const {
  zIndex = 100,
  background = 'transparent'
} = $defineProps<{
  zIndex?: number
  background?: string
}>()
</script>

<template>
  <div fixed bottom-0 left-0 right-0 top-0 :style="{ background, zIndex }" />
</template>
