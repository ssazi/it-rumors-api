<script setup lang="ts">
import type { ISubject } from '@itrumor/types'

const { subject } = defineProps<{ subject: ISubject }>()
</script>

<template>
  <div flex>
    <div mt-2 inline-block w-20 @click.stop="go('subject', subject?.id)">
      <NuxtImg
        v-if="subject?.poster?.file_path"
        width="200"
        format="webp"
        :src="subject?.poster?.file_path"
        :alt="subject?.name"
        loading="lazy"
        h-full w-full object-cover
      />
    </div>
  </div>
</template>
