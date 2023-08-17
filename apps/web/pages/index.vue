<script setup lang="ts">
import { APP_NAME } from '~/constants'

const el = ref<HTMLElement>()
const feed = useFeedStore()
await feed.list({ current: 1 })
const { items, update, state, endAnchor, error, onLike } = usePaginator(feed.feedList || [])
useHead({
  title: () => APP_NAME
})
</script>

<template>
  <div ref="el" pos="relative">
    <Chat />
    <Feed v-for="item in items" :key="item.id" :data="item" :action="{ onLike }" />
    <!-- <DynamicScroller
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
        />
      </template>
    </DynamicScroller> -->
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
