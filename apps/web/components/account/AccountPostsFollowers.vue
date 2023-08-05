<script setup lang="ts">
import type { IUser } from '@itrumors/types'

defineProps<{
  account: IUser
}>()
</script>

<template>
  <div flex gap-5>
    <NuxtLink
      to="/"
      replace
      text-secondary
      exact-active-class="text-primary"
    >
      <template #default="{ isExactActive }">
        <CommonLocalizedNumber
          keypath="{0} 条帖文"
          :count="2"
          font-bold
          :class="isExactActive ? 'text-primary' : 'text-base'"
        />
      </template>
    </NuxtLink>
    <NuxtLink
      to="/"
      replace
      text-secondary exact-active-class="text-primary"
    >
      <template #default="{ isExactActive }">
        <CommonLocalizedNumber
          keypath="正在关注 {0} 人"
          :count="3"
          font-bold
          :class="isExactActive ? 'text-primary' : 'text-base'"
        />
      </template>
    </NuxtLink>
    <NuxtLink
      to="/"
      replace text-secondary
      exact-active-class="text-primary"
    >
      <template #default="{ isExactActive }">
        <CommonLocalizedNumber
          keypath="被 {0} 人关注"
          :count="4"
          font-bold
          :class="isExactActive ? 'text-primary' : 'text-base'"
        />
      </template>
    </NuxtLink>
  </div>
</template>
