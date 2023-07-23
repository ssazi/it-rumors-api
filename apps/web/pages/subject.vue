<script setup lang="ts">
definePageMeta({
  name: 'subject',
  key: route => route.fullPath
})
const route = useRoute()
const subject = useSubjectStore()
const id = $(computedEager(() => route.params.id as string))
await subject.getSubject(id)
const { subjectData: data } = subject
useHead({
  title: () => `${data?.name} | 番组`
})
</script>

<template>
  <MainContent :key="data?.id">
    <template #title>
      <div flex items-center gap-2 timeline-title-style @click="$scrollToTop">
        <div i-ri:settings-3-line />
        <span>{{ data?.name }}</span>
      </div>
    </template>
    <div flex="~ col" ml-5 pt-5>
      <div mr-4 w-52>
        <NuxtImg
          v-if="data?.poster?.file_path"
          width="200"
          format="webp"
          :src="data?.poster?.file_path"
          :alt="data?.name"
          contain-layout h-full w-full object-cover
          :style="{ 'view-transition-name': `item-${data?.id}` }"
        />
        <h1>{{ data?.name }}</h1>
        222
      </div>
      <div flex="grow">
        <NuxtPage />
      </div>
    </div>
  </MainContent>
</template>
