export interface ConfirmDialogLabel {
  title: string
  description?: string
  confirm?: string
  cancel?: string
}
export type ConfirmDialogChoice = 'confirm' | 'cancel'
export const confirmDialogLabel = ref<ConfirmDialogLabel>()
export const confirmDialogChoice = ref<ConfirmDialogChoice>()

export const isSigninDialogOpen = ref(false)
export const isConfirmDialogOpen = ref(false)
export const dialogDraftKey = ref<string>()
export const isPublishDialogOpen = ref(false)
export const lastPublishDialogStatus = ref<any>(null)

export function openSigninDialog() {
  isSigninDialogOpen.value = true
}

export function closeSigninDialog() {
  isSigninDialogOpen.value = false
}

export const isRegDialogOpen = ref(false)
export function openRegDialog() {
  isRegDialogOpen.value = true
}

export function closeRegDialog() {
  isRegDialogOpen.value = false
}

export async function openConfirmDialog(label: ConfirmDialogLabel | string): Promise<ConfirmDialogChoice> {
  confirmDialogLabel.value = typeof label === 'string' ? { title: label } : label
  confirmDialogChoice.value = undefined
  isConfirmDialogOpen.value = true

  await until(isConfirmDialogOpen).toBe(false)

  return confirmDialogChoice.value!
}

export async function openPublishDialog(draftKey = 'dialog', overwrite = false): Promise<void> {
  dialogDraftKey.value = draftKey

  isPublishDialogOpen.value = true

  await until(isPublishDialogOpen).toBe(false)
}
