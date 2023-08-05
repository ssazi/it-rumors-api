<script setup lang="ts">
import type { IUser } from '@itrumors/types'
import { DEFAULT_AVATART } from '~/constants'

defineProps<{
  account: IUser
  square?: boolean
}>()

const loaded = $ref(false)
const error = $ref(false)
</script>

<template>
  <NuxtImg
    :key="account?.avatar"
    width="200"
    height="200"
    select-none
    format="webp"
    :src="(error || !loaded) ? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' : account?.avatar_path?.file_path || DEFAULT_AVATART"
    :alt="account?.nickname || account?.username"
    loading="lazy"
    object-cover
    :class="(loaded ? 'bg-base' : 'bg-gray:10') + (square ? ' ' : ' rounded-full')"
    :style="{ 'clip-path': square ? `url(#avatar-mask)` : 'none' }"
    v-bind="$attrs"
    @load="loaded = true"
    @error="error = true"
  />
</template>
