<script setup lang="ts">
useHead({
  title: () => '外观 | 设置'
})
</script>

<template>
  <MainContent back-on-small-screen>
    <template #title>
      <div flex items-center gap-2 text-lg font-bold @click="$scrollToTop">
        <span>外观</span>
      </div>
    </template>
    <div p6 flex="~ col gap6">
      <label space-y-2>
        <p font-medium>字号</p>
        <SettingsFontSize select-settings />
      </label>
      <div space-y-2>
        <p font-medium>
          颜色
        </p>
        <SettingsColorMode />
      </div>
      <div space-y-2>
        <p font-medium>
          主题颜色
        </p>
        <SettingsThemeColors />
      </div>
    </div>
  </MainContent>
</template>
