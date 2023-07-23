<script setup lang="ts">
definePageMeta({
  key: route => route.fullPath
})
const route = useRoute()
const router = useRouter()
</script>

<template>
  <div>
    3333
    <a @click="router.back()">
      返回
    </a>
  </div>
</template>
