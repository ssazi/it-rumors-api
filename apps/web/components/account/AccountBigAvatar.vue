<script setup lang="ts">
import type { IUser } from '@itrumors/types'

// Avatar with a background base achieving a 3px border to be used in status cards
// The border is used for Avatar on Avatar for reblogs and connecting replies

defineProps<{
  account: IUser
  square?: boolean
}>()
</script>

<template>
  <div :key="account?.avatar" v-bind="$attrs" :style="{ 'clip-path': square ? `url(#avatar-mask)` : 'none' }" :class="{ 'rounded-full': !square }" h-54px w-54px flex items-center justify-center bg-base>
    <AccountAvatar :account="account" h-48px w-48px :square="square" />
  </div>
</template>
