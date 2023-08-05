<script lang="ts" setup>
import type { IPin } from '@itrumors/types'

const { pin } = defineProps<{ pin: IPin }>()
const content = computed(() => pin?.content)
</script>

<template>
  <div break-words break-all>
    {{ content }}
  </div>
</template>
