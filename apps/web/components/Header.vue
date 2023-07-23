<script setup lang="ts">
const router = useRouter()
const back = ref<any>('')

onMounted(() => {
  back.value = router.options.history.state.back
})
router.afterEach(() => {
  back.value = router.options.history.state.back
})
</script>

<template>
  <div flex justify-between>
    <NuxtLink to="/" flex items-end gap-4 px-5 py2 text-2xl focus-visible:ring="2 current">
      <div hidden xl:block>
        番组 <sup mt-1 text-sm italic text-secondary>beta</sup>
      </div>
    </NuxtLink>
    <div
      me-8 mt-2 hidden items-center xl:flex class="group"
      :class="{ 'pointer-events-none op40': !back, 'xl:flex': $route.name !== 'tag' }"
    >
      <NuxtLink
        aria-label="返回"
        @click="$router.go(-1)"
      >
        <div i-ri:arrow-left-line class="rtl-flip" btn-text />
      </NuxtLink>
    </div>
  </div>
</template>
