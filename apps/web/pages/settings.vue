<script lang="ts" setup>
definePageMeta({
  wideLayout: true
})

useHead({
  title: () => '设置'
})

const route = useRoute()

const isRootPath = computedEager(() => route.name === 'settings')
</script>

<template>
  <div min-h-screen flex>
    <div border="e base" :class="isRootPath ? 'block lg:flex-none flex-1' : 'hidden lg:block'">
      <MainContent>
        <template #title>
          <div flex items-center gap-2 timeline-title-style @click="$scrollToTop">
            <div i-ri:settings-3-line />
            <span>设置</span>
          </div>
        </template>
        <div w-full lg:w-78 xl:w-97>
          <SettingsItem
            command
            icon="i-ri:user-line"
            text="个人资料"
            to="/settings/profile"
            :match="$route.path.startsWith('/settings/profile/')"
          />
          <SettingsItem
            command
            icon="i-ri-compasses-2-line"
            text="外观"
            to="/settings/interface"
            :match="$route.path.startsWith('/settings/interface/')"
          />
          <SettingsItem
            command
            icon="i-ri:notification-badge-line"
            text="通知"
            to="/settings/notifications"
            :match="$route.path.startsWith('/settings/notifications/')"
          />
          <SettingsItem
            command
            icon="i-ri-equalizer-line"
            text="首选项"
            to="/settings/preferences"
            :match="$route.path.startsWith('/settings/preferences/')"
          />
          <SettingsItem
            command
            icon="i-ri-group-line"
            text="当前用户"
            to="/settings/users"
            :match="$route.path.startsWith('/settings/users/')"
          />
          <SettingsItem
            command
            icon="i-ri:information-line"
            text="关于"
            to="/settings/about"
            :match="$route.path.startsWith('/settings/about/')"
          />
        </div>
      </MainContent>
    </div>
    <div flex-1 :class="isRootPath ? 'hidden lg:block' : 'block'">
      <ClientOnly>
        <NuxtPage />
      </ClientOnly>
    </div>
  </div>
</template>
