<script setup>
const avatar = ref()
const switcher = ref()
</script>

<template>
  <UPopover v-if="isHydrated && curUser?.id" sm:hidden>
    <div style="-webkit-touch-callout: none;">
      <AccountAvatar
        ref="avatar"
        :account="curUser"
        :draggable="false"
        square h-8 w-8
      />
    </div>
    <template #panel>
      <UserSwitcher ref="switcher" />
    </template>
  </UPopover>
  <template v-else>
    <button px-2 py-1 text-center text-sm btn-solid xl:hidden @click="openSigninDialog()">
      登录
    </button>
  </template>
</template>
