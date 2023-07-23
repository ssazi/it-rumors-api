<script setup lang="ts">
import type { IUser } from '@itrumor/types'

const { account, as = 'div' } = defineProps<{
  account: IUser
  as?: string
  hoverCard?: boolean
  square?: boolean
}>()
</script>

<template>
  <component :is="as" flex gap-3 v-bind="$attrs">
    <AccountHoverWrapper :disabled="!hoverCard" :account="account">
      <AccountBigAvatar :account="account" shrink-0 :square="square" />
    </AccountHoverWrapper>
    <div flex="~ col" h-full shrink select-none justify-center overflow-hidden pt-1 leading-none>
      <div flex="~" gap-2>
        <div line-clamp-1 ws-pre-wrap break-all text-lg font-bold>
          {{ account?.nickname || account?.username || '' }}
        </div>
      </div>
      <p line-clamp-1 whitespace-pre-wrap break-all leading-tight text-secondary-light dir="ltr">
        <span text-secondary>@{{ account?.username }}</span>
      </p>
    </div>
  </component>
</template>
