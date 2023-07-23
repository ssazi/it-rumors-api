<script lang="ts" setup>
import { modelName } from '@itrumor/types/enum'
import { ref } from 'vue'
import { DEFAULT_AVATART } from '~/constants'

const { textarea, input } = useTextareaAutosize()
const msg = ref('')
const image = ref([])
const feed = useFeedStore()
const items = [[{ label: '公开' }, { label: '仅粉丝' }, { label: '仅自己' }]]
const bar = [{ icon: 'i-carbon-link', key: 'link', disabled: false }, { icon: 'i-carbon-hashtag', key: 'topic', disabled: true }, { icon: 'i-carbon-at', key: 'at', disabled: true }]
const cur = ref('公开')
async function onOK(name: string) {
  console.log(name)
  cur.value = name
}
function onInput() {
  msg.value = input.value
}
async function onSubmit() {
  console.log(input.value)
  const res = await feed.add({ sid: modelName.PIN, content: input.value })
  if (res) {
    input.value = ''
    msg.value = ''
  }
}
function onImage(data: any) {
  console.log(data)
  image.value = data
}
</script>

<template>
  <div class="mt-4 flex px-4" border="b gray-100 dark:warm-gray-800">
    <div mr-3 flex basis-12>
      <div h-12 w-12 overflow-hidden rounded-full>
        <img :src="DEFAULT_AVATART">
      </div>
    </div>
    <div class="relative flex-1">
      <textarea ref="textarea" v-model="input" h-12 w-full select-text whitespace-pre-wrap break-words break-all p-3 leading-6 text-base outline-none bg="base dark:#121212" placeholder="有什么新鲜事？" class="resize-none placeholder-.light:text-#536471" @input="onInput" />
      <div mb-3 mt-3 flex justify-between pt-3 border="t gray-100 dark:warm-gray-800">
        <div class="relative h-9 flex items-center text-primary">
          <Popover>
            <template #open>
              <div relative h-9 w-9 flex cursor-pointer items-center justify-center rounded-full hover:bg="blue/10">
                <div i-carbon-face-satisfied h-5 w-5 />
              </div>
            </template>
            <template #default>
              <Emoji />
            </template>
          </Popover>
          <Popover>
            <template #open>
              <div relative h-9 w-9 flex cursor-pointer items-center justify-center rounded-full hover:bg="blue/10">
                <div i-carbon-image h-5 w-5 />
              </div>
            </template>
            <template #default>
              <AddImage @onImage="onImage" />
            </template>
          </Popover>
          <template v-for="item in bar" :key="item.icon">
            <div relative h-9 w-9 flex cursor-pointer items-center justify-center rounded-full hover:bg="blue/10" :class="{ 'pointer-events-none': item.disabled }">
              <div h-5 w-5 :class="item.icon" />
            </div>
          </template>
        </div>
        <div relative flex>
          <div mr-2 flex items-center text="secondary">
            {{ msg && msg.length }}
          </div>
          <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
            <div mr-2 flex cursor-pointer items-center rounded-full px-3 py-2 text-sm font-bold text="primary" hover:bg="blue/10">
              {{ cur }}
              <div i-carbon-chevron-sort ml-2 h-4 w-4 />
            </div>
          </UDropdown>
          <button flex items-center justify-center rounded-full btn-primary :class="msg ? '' : 'opacity-50 cursor-auto'" :disabled="!msg" @click="onSubmit">
            发送
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
