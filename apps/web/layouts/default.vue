<script setup lang="ts">
const user = useUserStore()
const route = useRoute()
const wideLayout = computed(() => route.meta.wideLayout ?? false)

watchEffect(() => {
  const { $getAuth } = useNuxtApp()
  $getAuth && user.getCurrentUserInfo()
})

const menu = [
  { name: '首页', icon: 'i-ri:home-7-fill', path: '/home' },
  { name: '最新', icon: 'i-ri-loader-3-line', path: '/new' },
  { name: '热门', icon: 'i-ri:fire-line', path: '/hot' },
  { name: '关注', icon: 'i-ri-user-follow-line', path: '/follow' },
  { name: '番组', icon: 'i-ri:tv-line', path: '/subject' },
  { name: '话题', icon: 'i-ri:hashtag', path: '/topic' },
  { name: '喜欢', icon: 'i-ri:heart-3-line', path: '/favorites' },
  { name: '书签', icon: 'i-ri-bookmark-line', path: '/bookmarks' },
  { name: '撰写', icon: 'i-ri:quill-pen-line', path: '/write' },
  { name: '设置', icon: 'i-ri:settings-3-line', path: '/settings' }
]
</script>

<template>
  <main mxa w-full flex lg:max-w-80rem>
    <aside class="hidden w-1/8 justify-end lg:w-1/5 md:w-1/6 xl:w-1/4 sm:flex" border-aside-r>
      <div flex="~ col" sticky top-0 z-1 h-screen w-20 xl:w-100 lt-xl-items-center>
        <div flex="~ col" mt-5 h-full max-w-full justify-between overflow-y-auto>
          <Header />
          <nav flex="~ col gap2" mt-4 shrink text-size-base leading-normal sm:px3 md:text-lg>
            <SearchWidget hidden lg:me-5 lg:ms-1 xl:block />
            <NuxtLink v-for="item in menu" :key="item.name" :to="item.path" mx3 w-fit flex items-center gap4 rounded-3 px2 py-2 transition-100 sm:mxa xl="ml0 mr5 px5 w-auto" cursor="pointer" hover="bg-active text-#1d9bf0 dark:bg-warm-gray-900 dark:text-white" :class="{ 'bg-#1d9bf0/10 text-#1d9bf0': route.path.includes(item.path) }" group-focus-visible:ring="2 current">
              <i :class="item.icon" /><span block select-none xl:block sm:hidden>{{ item.name }}</span>
            </NuxtLink>
          </nav>
          <div flex-auto />
          <div v-if="isHydrated" sticky bottom-0 flex flex-col bg-base>
            <div hidden xl-block>
              <div v-if="!curUser?.id" lg:flex="~ col gap2" hidden p8>
                <div flex items-center justify-center rounded-full btn-primary @click="openSigninDialog">
                  登录
                </div>
              </div>
            </div>
            <div v-if="curUser?.id" w-full p6 pb8>
              <div hidden xl-block>
                <div flex="~" items-center justify-between>
                  <NuxtLink :to="`/user/${curUser?.id}`" hidden w-full cursor-pointer rounded-3 text-start text-primary transition-100 xl:block hover:bg-gray-100>
                    <AccountInfo :account="curUser" :hover-card="false" square />
                  </NuxtLink>
                  <UserDropdown />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
    <div :class="isHydrated && wideLayout ? 'xl:w-full sm:w-600px' : 'sm:w-600px md:shrink-0'" min-h-screen w-full border-base>
      <div min-h="[calc(100vh-3.5rem)]" sm:min-h-screen>
        <slot />
      </div>
    </div>
    <aside v-if="isHydrated && !wideLayout" class="native:w-full zen-hide sm:none hidden xl:block lg:w-1/5 xl:w-1/4">
      <div flex="~ col" sticky top-0 h-screen gap-2 py3 border="l gray-100 dark:warm-gray-800">
        <div flex-auto />
        <Footer />
      </div>
    </aside>
    <ModalContainer />
  </main>
</template>
