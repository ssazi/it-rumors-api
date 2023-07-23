<script setup lang="ts">
import { isRegDialogOpen, isSigninDialogOpen } from '@/composables/dialog'
</script>

<template>
  <ModalDialog v-model="isSigninDialogOpen" title="欢迎来到IT传闻" cls="w-100">
    <Login />
  </ModalDialog>

  <ModalDialog v-model="isRegDialogOpen" title="注册" cls="w-100">
    <Reg />
  </ModalDialog>
</template>
