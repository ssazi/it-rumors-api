<script setup lang="ts">
defineProps<{
  /** Show the back button on small screens */
  backOnSmallScreen?: boolean
  /** Show the back button on both small and big screens */
  back?: boolean
  /** Do not applying overflow hidden to let use floatable components in title */
  noOverflowHidden?: boolean
}>()

const route = useRoute()
const wideLayout = computed(() => route.meta.wideLayout ?? false)
</script>

<template>
  <div>
    <div
      sticky top-0 z10 backdrop-blur
      pt="[env(safe-area-inset-top,0)]"
      border="b base" bg="[rgba(var(--rgb-bg-base),0.7)]"
      class="native:lg:w-[calc(100vw-5rem)] native:xl:w-[calc(135%+(100vw-1200px)/2)]"
    >
      <div flex justify-between px5 py2 xl:hidden class="native:xl:flex">
        <div :overflow-hidden="!noOverflowHidden ? '' : false" w-full flex items-center gap-3 py2>
          <NuxtLink
            v-if="backOnSmallScreen || back" flex="~ gap1" items-center p-0 btn-text xl:hidden
            aria-label="返回"
            @click="$router.go(-1)"
          >
            <div i-ri:arrow-left-line class="rtl-flip" />
          </NuxtLink>
          <div :truncate="!noOverflowHidden ? '' : false" data-tauri-drag-region w-full flex class="native-mac:justify-center native-mac:text-center native-mac:sm:justify-start">
            <slot name="title" />
          </div>
          <div h-7 w-1px sm:hidden />
        </div>
        <div flex flex-shrink-0 items-center gap-x-2>
          <slot name="actions" />
          <NavUser v-if="isHydrated" />
          <NavUserSkeleton v-else />
        </div>
      </div>
      <slot name="header" />
    </div>
    <div :class="isHydrated && wideLayout ? 'xl:w-full sm:max-w-600px' : 'sm:max-w-600px md:shrink-0'" m-auto>
      <div hidden :class="{ 'xl:block': $route.name !== 'tag' && !$slots.header }" h-6 />
      <slot />
    </div>
  </div>
</template>
