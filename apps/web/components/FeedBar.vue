<script lang="ts" setup>
import { sidName } from '@itrumor/types/enum'
import type { IFeed } from '@itrumor/types'

const { data, action } = defineProps<{ data: IFeed & { [key: string]: any }; action: any }>()
const sid = data.sid as keyof typeof sidName
const model = sidName[sid]
async function onAction(type: string) {
  if (type === 'like') {
    const res = await action.onLike({ sid, aid: data[model]?.id, type: 'like' })
    console.log(res)
  }
}
</script>

<template>
  <div justify="between" relative mt-2 flex class="-left-2">
    <div flex items-center class="group" justify="center" title="评论" @click.stop="onAction('comment')">
      <div flex="~" justify="center" h-9 w-9 items-center rounded-full group-hover="bg-blue/10 text-primary" group-focus-visible="bg-blue/10" group-focus-visible:ring="2 current">
        <i i-ri:chat-3-line h-5 w-5 />
      </div>
      <div group-hover="text-primary" ml-1 text="sm">
        {{ data?.[model]?.comment_count || '' }}
      </div>
    </div>
    <div flex items-center class="group" title="转发" @click.stop="onAction('forward')">
      <div flex="~" justify="center" h-9 w-9 items-center rounded="full" group-hover="bg-green/10 text-green">
        <i i-ri-repeat-2-line h-5 w-5 />
      </div>
      <div group-hover="text-green" ml-1 text="sm">
        {{ data?.[model]?.forward_count || '' }}
      </div>
    </div>
    <div flex items-center class="group" title="喜欢" @click.stop="onAction('like')">
      <div flex="~" justify="center" h-9 w-9 items-center rounded="full" group-hover="bg-rose/10 text-rose">
        <i i-ri:heart-3-line h-5 w-5 />
      </div>
      <div group-hover="text-rose" ml-1 text="sm">
        {{ data?.[model]?.favourite_count || '' }}
      </div>
    </div>
    <div flex items-center class="group" title="书签" @click.stop="onAction('bookmark')">
      <div flex="~" justify="center" h-9 w-9 items-center rounded="full" group-hover="bg-yellow/10 text-yellow">
        <i i-ri-bookmark-line h-5 w-5 />
      </div>
      <div group-hover="text-yellow" ml-1 text="sm">
        {{ data?.[model]?.bookmark_count || '' }}
      </div>
    </div>
    <div flex items-center class="group" title="分享" @click.stop="onAction('share')">
      <div flex="~" justify="center" h-9 w-9 items-center rounded="full" group-hover="bg-blue/10 text-primary" group-focus-visible="bg-blue/10" group-focus-visible:ring="2 current">
        <i i-ri-share-box-line h-5 w-5 />
      </div>
    </div>
  </div>
</template>
