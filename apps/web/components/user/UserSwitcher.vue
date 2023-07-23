<script setup lang="ts">
const emit = defineEmits<{
  (event: 'click'): void
}>()

const user = useUserStore()

const router = useRouter()
function clickUser() {
  router.push(`/user/${curUser.value?.id}`)
}
</script>

<template>
  <div mxa max-w-100vw py2 sm:min-w-80 flex="~ col" @click="emit('click')">
    <button
      flex cursor-pointer rounded hover:bg-active px4 py3 text-left transition-100
      aria-label="Switch user"
      @click="clickUser()"
    >
      <AccountInfo :account="curUser" :hover-card="false" square />
      <div flex-auto />
      <div i-ri:check-line mya text-2xl text-primary />
    </button>
    <div border="t base" pt2>
      <button
        v-if="curUser?.id"
        w-full flex cursor-pointer select-none items-center gap-3 hover-bg-active px4 py3
        aria-label="登出"
        @click="user.signOut"
      >
        <div i-ri:logout-box-line />
        <div flex="~ col">
          <div text-15px>
            登出
          </div>
        </div>

        <div flex-auto />
      </button>
    </div>
  </div>
</template>
