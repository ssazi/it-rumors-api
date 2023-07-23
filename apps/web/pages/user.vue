<script setup lang="ts">
import { DEFAULT_AVATART } from '~/constants'

definePageMeta({
  name: 'user',
  key: route => route.fullPath
})
const route = useRoute()
const id = $(computedEager(() => route.params.id as string))
const user = useUserStore()
await user.getUserIdInfo(id)
const { userInfo: data } = user
useHead({
  title: () => `用户中心 | ${data?.nickname || data?.username}`
})
</script>

<template>
  <MainContent :key="data?.id">
    <template #title>
      <div flex items-center gap-2 timeline-title-style @click="$scrollToTop">
        <div i-ri:settings-3-line />
        <span>用户中心</span>
      </div>
    </template>
    <div flex="~ col">
      <div bg="gray-100" mt-2 h-40>
        222
      </div>
      <div flex="~ col">
        <div mt-4 flex justify="between" items-center>
          <div flex items-center>
            <NuxtImg
              width="80"
              height="80"
              format="webp"
              :src="data?.avatar_path?.file_path || DEFAULT_AVATART"
              :alt="data?.nickname"
              mr-4 h-20 w-20 rounded-full object-cover
            />
            <div flex-1>
              <h1>{{ data?.username }}</h1>
              <p>{{ data?.created_at }}</p>
            </div>
          </div>
          <div>
            <button flex items-center justify-center rounded-full btn-primary>
              关注
            </button>
          </div>
        </div>
        <div h-10>
          menu
        </div>
        <NuxtPage />
      </div>
    </div>
  </MainContent>
</template>
