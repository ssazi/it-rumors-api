<template>
  <div flex flex-col gap-2 px-4 py-3>
    <div flex gap-4>
      <div>
        <div h-12 w-12 rounded-full class="skeleton-loading-bg" />
      </div>
      <div flex="~ col 1 gap-2" min-w-0 pb2>
        <div class="skeleton-loading-bg" h-5 w-20 flex rounded />
        <div class="skeleton-loading-bg" h-4 w-full flex rounded />
        <div class="skeleton-loading-bg" w="4/5" h-4 flex rounded />
        <div class="skeleton-loading-bg" w="2/5" h-4 flex rounded />
      </div>
    </div>
  </div>
</template>
