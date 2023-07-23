<script setup lang="ts">
const query = ref('')
const index = ref(0)

const el = ref<HTMLElement>()
const input = ref<HTMLInputElement>()
const router = useRouter()
const { focused } = useFocusWithin(el)

defineExpose({
  input
})

const results = computed(() => {
  if (query.value.length === 0)
    return []

  const results = [
    { to: '', id: '' }
  ]

  return results
})

// Reset index when results change
watch([results, focused], () => index.value = -1)

function shift(delta: number) {
  return index.value = (index.value + delta % results.value.length + results.value.length) % results.value.length
}

function activate() {
  const currentIndex = index.value

  if (query.value.length === 0)
    return

  // Disable redirection until search page is implemented
  if (currentIndex === -1) {
    index.value = 0
    // router.push(`/search?q=${query.value}`)
    return
  }

  (document.activeElement as HTMLElement).blur()
  index.value = -1

  router.push(results.value[currentIndex].to)
}
</script>

<template>
  <div ref="el" group relative>
    <div border="~ base" flex="~ row" relative h10 items-center gap-3 rounded-3 bg-base px-4 focus-within:box-shadow-outline>
      <div i-ri:search-2-line pointer-events-none text-secondary mt="1px" class="rtl-flip" />
      <input
        ref="input"
        v-model="query"

        outline="focus:none"

        placeholder="搜索"
        pb="1px"
        ml-1 h-full w-full rounded-3 bg-transparent pe-4 placeholder-text-secondary
        @keydown.down.prevent="shift(1)"
        @keydown.up.prevent="shift(-1)"
        @keypress.enter="activate"
      >
    </div>
  </div>
</template>
