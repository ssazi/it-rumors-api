<script lang="ts" setup>
import type { IFeed } from '@itrumors/types'

const { data, action } = defineProps<{ data: IFeed; action: any }>()
</script>

<template>
  <div flex p="5" border="b gray-100 dark:warm-gray-800" cursor="pointer">
    <div w-12>
      <AccountHoverWrapper :account="data?.user">
        <AccountBigAvatar :account="data?.user" shrink-0 />
      </AccountHoverWrapper>
    </div>
    <div flex="grow" ml-4>
      <Uesr :data="data" />
      <Subject v-if="data?.subject" :subject="data?.subject" />
      <Pin v-if="data?.pin" :pin="data?.pin" />
      <FeedBar :data="data" :action="{ ...action }" />
    </div>
  </div>
</template>
