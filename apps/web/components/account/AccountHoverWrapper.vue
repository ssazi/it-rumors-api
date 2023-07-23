<script setup lang="ts">
import type { IUser } from '@itrumor/types'

defineOptions({
  inheritAttrs: false
})
const props = defineProps<{
  account?: IUser
  handle?: string
  disabled?: boolean
}>()
const account = props.account
</script>

<template>
  <UPopover v-if="!disabled && account" mode="hover" v-bind="$attrs">
    <slot />
    <template #panel>
      <AccountHoverCard v-if="account" :account="account" />
    </template>
  </UPopover>
  <slot v-else />
</template>
