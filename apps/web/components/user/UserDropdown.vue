<script setup lang="ts">
const mask = useMask()
const user = useUserStore()
</script>

<template>
  <UPopover>
    <button btn-action-icon aria-label="切换账号">
      <div :class="{ 'hidden xl:block': curUser?.id }" i-ri:more-2-line />
      <AccountAvatar v-if="curUser?.id" :account="curUser" square h-9 w-9 xl:hidden />
    </button>
    <template #panel>
      <UserSwitcher />
    </template>
  </UPopover>
</template>
