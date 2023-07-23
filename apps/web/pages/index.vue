<script setup lang="ts">
import { APP_NAME } from '~/constants'

const el = ref<HTMLElement>()
const feed = useFeedStore()
await feed.list({ current: 1 })
const { items, update, state, endAnchor, error, onLike } = usePaginator(feed.feedList)
console.log(state.value, 'state')
useHead({
  title: () => APP_NAME
})
</script>

<template>
  <div ref="el" pos="relative">
    <Chat />
    <DynamicScroller
      :items="items"
      :min-item-size="200"
      :prerender="20"
      page-mode
    >
      <template #default="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :data-index="index"
          tag="article"
        >
          <Feed :data="item" :action="{ onLike }" />
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
    <div ref="endAnchor" />
    <template v-if="state === 'loading'">
      <TimelineSkeleton />
    </template>
  </div>
</template>

<style>
.scroller {
  height: 100%;
}
</style>
