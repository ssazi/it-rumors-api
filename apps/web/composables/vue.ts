export const isHydrated = ref(false)

export function onHydrated(cb: () => unknown) {
  watchOnce(isHydrated, () => cb(), { immediate: isHydrated.value })
}

/**
 * ### Whether the current component is running in the background
 *
 * for handling problems caused by the keepalive function
 */
export function useDeactivated() {
  const deactivated = ref(false)
  onActivated(() => deactivated.value = false)
  onDeactivated(() => deactivated.value = true)

  return deactivated
}
