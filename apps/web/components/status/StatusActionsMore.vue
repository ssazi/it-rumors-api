<script setup lang="ts">
import type { IFeed } from '@itrumor/types'

const props = defineProps<{
  status: IFeed
  details?: boolean
  command?: boolean
}>()

const emit = defineEmits<{
  (event: 'afterEdit'): void
}>()

const { details, command, status } = $(props)

const clipboard = useClipboard()
const router = useRouter()
const route = useRoute()

const isAuthor = $computed(() => status.user?.id === curUser.value?.id)

async function copyLink(url: string) {
  if (url)
    await clipboard.copy(url)
}

async function copyOriginalLink(url: string) {
  if (url)
    await clipboard.copy(url)
}

const { share, isSupported: isShareSupported } = useShare()
async function shareLink(url: string) {
  if (url)
    await share({ url })
}

async function deleteStatus() {
  if (await openConfirmDialog({
    title: '你确定要删除这条帖文吗？',
    confirm: '删除',
    cancel: '取消'
  }) !== 'confirm')
    return

  // await client.v1.statuses.remove(status.id) 调用接口

  if (route.name === 'status')
    router.back()
}

async function deleteAndRedraft() {
  // TODO confirm to delete
  if (process.dev) {
    // eslint-disable-next-line no-alert
    const result = confirm('[DEV] Are you sure you want to delete and re-draft this post?')
    if (!result)
      return
  }

  // await client.v1.statuses.remove(status.id) 调用接口
  await openPublishDialog('dialog', true)

  // Go to the new status, if the page is the old status
  if (lastPublishDialogStatus.value && route.name === 'status')
    router.push('/')
}

function reply() {
  if (details) {
    // TODO focus to editor
  }
}

async function editStatus() {
  await openPublishDialog(`edit-${status.id}`, true)
  emit('afterEdit')
}

const items = [
  [{
    label: 'Profile',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    }
  }], [{
    label: '编辑',
    icon: 'i-ri:edit-line',
    click: () => {
      console.log('Edit')
      editStatus()
    }
  }, {
    label: isAuthor ? '取消置顶' : '置顶在个人资料上',
    icon: 'i-ri:pushpin-line'
  }, {
    label: '回复',
    icon: 'i-ri:chat-1-line',
    click: () => {
      console.log('Edit')
      reply()
    }
  }, {
    label: '删除',
    icon: 'i-ri:delete-bin-line',
    click: () => {
      console.log('Edit')
      deleteStatus()
    }
  }, {
    label: '删除并重新编辑',
    icon: 'i-ri:eraser-line',
    click: () => {
      console.log('Edit')
      deleteAndRedraft()
    }
  }, {
    label: '回复',
    icon: 'i-ri:chat-1-line',
    disabled: true
  }], [{
    label: '转发',
    icon: 'i-ri:repeat-fill'
  }, {
    label: '喜欢',
    icon: isAuthor ? 'i-ri:heart-3-fill' : 'i-ri:heart-3-line'
  },
  {
    label: '喜欢',
    icon: isAuthor ? 'i-ri:bookmark-fill' : 'i-ri:bookmark-line'
  }
  ], [{
    label: '复制这篇帖文的链接',
    icon: 'i-ri:link',
    click: () => {
      copyLink('url')
    }
  }, {
    label: '复制这篇贴文的原始链接',
    icon: 'i-ri:links-fill',
    click: () => {
      copyOriginalLink('url')
    }
  }, {
    label: '分享这条帖文',
    icon: 'i-ri:share-line',
    click: () => {
      isShareSupported && shareLink('url')
    }
  }]
]
</script>

<template>
  <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
    <CommonTooltip placement="bottom" content="更多">
      <div w-fit flex cursor-pointer select-none items-center gap-1 rounded text-secondary transition-all focus:outline-none>
        <div hover="text-primary" my--2 rounded-full p2>
          <div i-ri:more-line />
        </div>
      </div>
    </CommonTooltip>
  </UDropdown>
</template>
