<script lang="ts" setup>
import type { IFeed } from '@itrumor/types'
import { FeedType, sidName } from '@itrumor/types/enum'

const { data } = defineProps<{ data: IFeed & { [key: string]: any } }>()

const sid = data.sid as keyof typeof sidName
const model = sidName[sid]
</script>

<template>
  <div flex justify="between">
    <div flex="~ col 1" min-w-0>
      <div flex items-center space-x-1>
        <AccountHoverWrapper :account="data.user">
          <NuxtLink
            :to="`/user/${data.user?.id}`"
            flex="~ col" md:flex="~ row gap-2"
            min-w-0 text-link-rounded md:items-center
          >
            <b text="warm-gray-700" hover="text-primary">{{ data.user?.nickname || data.user?.username }}</b> @{{ data.user?.username }}
          </NuxtLink>
        </AccountHoverWrapper>
        <span mx-1>{{ FeedType[data.type] }}</span>
        <span text="warm-gray-700" @click.stop="go(model, data?.[model]?.id)">{{ data?.[model]?.name || '动态' }}</span>
        <div flex-auto />
        <div text="gray-500 sm">
          <!-- <span>web</span>
          <span mx-1>·</span> -->
          <span hover="text-primary" @click.stop="go('feed', data?.id)">{{ data.time }}</span>
        </div>
      </div>
    </div>
    <StatusActionsMore :status="data" me--2 />
  </div>
</template>
