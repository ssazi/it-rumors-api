<script setup lang="ts">
import type { IUser } from '@itrumor/types'

const { account } = defineProps<{
  account: IUser
}>()

const relationship = account.id
</script>

<template>
  <div v-show="relationship" flex="~ col gap2" z-100 max-w-120 min-w-90 overflow-hidden rounded p-4>
    <div flex="~ gap2" items-center>
      <NuxtLink :to="`/user/${account.id}`" me-a flex-auto rounded-full hover:bg-active pe5 transition-100>
        <AccountInfo :account="account" />
      </NuxtLink>
      <button text-sm :account="account" :relationship="relationship">
        关注
      </button>
    </div>
    <div v-if="account.identity" max-h-100 overflow-y-auto>
      <div text-4 text-secondary>
        {{ account.identity }}
      </div>
    </div>
    <AccountPostsFollowers text-sm :account="account" />
  </div>
</template>
