<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue'

const { title, cls = 'min-w-md' } = defineProps<{ title?: string; cls?: string }>()

const emits = defineEmits<{
  (event: 'show'): void
  (event: 'close'): void
}>()

const { modelValue: visible } = defineModels<{
  modelValue: boolean
}>()

function closeModal() {
  visible.value = false
  emits('close')
}
function openModal() {
  visible.value = true
  emits('show')
}

defineExpose({
  closeModal,
  openModal
})
</script>

<template>
  <TransitionRoot appear :show="visible" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="min-h-full flex items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle text-sm shadow-xl transition-all" :class="cls"
            >
              <DialogTitle
                as="h3"
                class="mb-4 text-lg font-medium text-gray-900"
              >
                {{ title }}
                <div
                  i-carbon-close absolute right-2 top-2 z-10 h-6 w-6 cursor-pointer text="gray-600 lg dark:white" @click.stop="closeModal"
                />
              </DialogTitle>
              <slot />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
