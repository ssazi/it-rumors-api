import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Ref } from 'vue'
import type { IUser } from '@itrumor/types'
import { STORAGE_KEY_TOKEN, STORAGE_KEY_USERS } from '~~/constants'

function initializeUsers(): Ref<IUser> {
  let defaultUsers = []

  if (globalThis?.localStorage) {
    const usersOnLocalStorageString = globalThis.localStorage.getItem(STORAGE_KEY_USERS)
    if (usersOnLocalStorageString)
      defaultUsers = JSON.parse(usersOnLocalStorageString)
  }

  return ref<IUser>(defaultUsers)
}

export const curUser = initializeUsers()

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<IUser>()
  const currentUser = ref<IUser>()

  async function getUserIdInfo(id: string) {
    const { data } = await getUserId(id)
    if (data)
      userInfo.value = data
  }

  async function getCurrentUserInfo(token?: string) {
    const { data } = await getUserInfo({ token })
    if (data) {
      currentUser.value = data
      curUser.value = data
      if (process.client)
        globalThis.localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(data))
    }
  }

  async function signIn(params: any) {
    return await login(params)
  }

  async function signUp(params: any) {
    const { data } = await reg(params)
    if (data) {
      currentUser.value = data
      curUser.value = data
      globalThis.localStorage.setItem(STORAGE_KEY_TOKEN, data?.token || '')
    }
    return data
  }

  const signOut = async () => {
    const res = await logout()
    if (res.data) {
      globalThis.localStorage.removeItem(STORAGE_KEY_TOKEN)
      globalThis.localStorage.removeItem(STORAGE_KEY_USERS)
      currentUser.value = undefined
      curUser.value = {} as IUser
    }
  }

  return {
    userInfo,
    currentUser,
    signOut,
    signIn,
    signUp,
    getUserIdInfo,
    getCurrentUserInfo
  }
})

export function checkLogin() {
  if (!curUser.value?.id) {
    openSigninDialog()
    return false
  }
  return true
}

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
