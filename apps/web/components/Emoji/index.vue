<script lang="ts" setup>
import emojis from './emojis.json'

const tab = ref(0)
const arr = ref<number[]>([])
const tabArr = ref<number[]>([])
const face = ref<HTMLDivElement>()

function onScroll(e: any) {
  const scrollTop = e.target.scrollTop
  arr.value.forEach((item, index) => {
    if (scrollTop >= 0 && scrollTop <= arr.value[0]) {
      // 第一个
      tab.value = 0
    }
    if (scrollTop >= arr.value[index - 1] && scrollTop <= item) {
      // 第N个
      tab.value = index
    }
  })
}
function onTab(index: number) {
  tab.value = index
  face.value?.scrollTo(0, tabArr.value[index])
}

onMounted(() => {
  const tablist = document.querySelectorAll('.emoji-title')
  const tabBox = document.querySelectorAll('.emoji-box')
  const top = face.value?.getBoundingClientRect().top
  const firstHeight = tabBox[0].getBoundingClientRect().height + tablist[0].getBoundingClientRect().height
  tabBox.forEach(item => {
    arr.value.push(item.getBoundingClientRect().bottom - top! - firstHeight)
  })
  tablist.forEach(item => {
    tabArr.value.push(item.getBoundingClientRect().top - top!)
  })
})
</script>

<template>
  <div w-72 bg-white>
    <div flex border="~ b #eff3f4" cursor-pointer>
      <div v-for="(item, i) in emojis" :key="i" relative w-9 text-center text-2xl leading-9 :class="{ grayscale: tab === i }" @click="onTab(i)">
        {{ item.name }}
        <div h-1 w-full rounded-full :class="{ 'bg-#1d9bf0': tab === i }" />
      </div>
    </div>
    <div ref="face" max-h-60 overflow-y-auto @scroll="onScroll">
      <template v-for="item in emojis" :key="item.title">
        <div text="#536471" py-3 pl-4 class="emoji-title">
          {{ item.title }}
        </div>
        <div flex flex-wrap cursor-pointer break-words pl-2.5 text-center class="emoji-box">
          <div v-for="(icon, i) in item.icons" :key="i" hover:bg="#000/3" h-9 w-9 text-2xl leading-9 hover:rounded-full>
            {{ icon }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
