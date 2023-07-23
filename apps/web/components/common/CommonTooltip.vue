<script setup lang="ts">
export interface Props {
  content?: string
}

defineProps<Props>()
</script>

<template>
  <UTooltip :text="content" v-bind="$attrs">
    <slot />
  </UTooltip>
</template>
