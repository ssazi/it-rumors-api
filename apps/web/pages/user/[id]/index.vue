<script setup lang="ts">
definePageMeta({
  key: route => route.fullPath
})
const route = useRoute()
const router = useRouter()
</script>

<template>
  <div>
    index
    <a @click="router.back()">
      返回
    </a>
  </div>
</template>
