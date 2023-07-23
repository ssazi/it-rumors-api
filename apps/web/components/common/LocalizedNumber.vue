<script setup lang="ts">
const { count, keypath } = defineProps<{
  count: number
  keypath: string
}>()

const text = computed(() => keypath.split('{0}').map(item => item.trim()))
</script>

<template>
  <span class="flex gap-x-1">
    {{ text[0] }}
    <CommonTooltip v-if="count > 10000" :content="count" placement="bottom">
      <span sr-only>{{ formatNumber(count) }}</span>
    </CommonTooltip>
    <span v-else v-bind="$attrs">{{ count }}</span>
    {{ text[1] }}
  </span>
</template>
