import { STORAGE_KEY_TOKEN } from '~~/constants'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      getAuth: (() => process.client ? globalThis.localStorage.getItem(STORAGE_KEY_TOKEN) : null)()
    }
  }
})
