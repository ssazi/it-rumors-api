import type { RouteLocationNormalized } from 'vue-router'

export default defineNuxtRouteMiddleware(to => {
  if (process.server)
    return

  if (isHydrated.value)
    return handleAuth(to)

  onHydrated(() => handleAuth(to))
})

function handleAuth(to: RouteLocationNormalized) {
  if (!curUser.value?.id) {
    if (to.path === '/home' && to.query['share-target'] !== undefined)
      return navigateTo('/share-target')
    else
      return navigateTo('/subject')
  }
  if (to.path === '/')
    return navigateTo('/')
}
