import type { ICaptcha, IDataListResponse, IDigg, IFavourite, IFeed, IProduct, IUser, PageResult } from '@itrumor/types'
import { STORAGE_KEY_TOKEN } from '~/constants'

/**
 * 封装请求
 * @param url 接口地址
 * @param params 参数
 * @param method 请求方式
 * @returns Promise
 */
function _fetch<T = any>(url: string, params: Record<string, string | number | undefined>, method: 'POST' | 'GET' = 'GET', baseURL: string, token: string) {
  const param = method === 'POST' ? { body: params } : { params }
  const headers = { Authorization: `Bearer ${token}` }
  return $fetch<PageResult<T>>(url, {
    baseURL,
    method,
    headers,
    ...param
  })
}

/**
 * 封装请求
 * @param url 接口地址
 * @param params 参数
 * @param method 请求方式
 * @returns Promise
 */
async function fetch<T>(url: string, params: Record<string, string | number | undefined> = {}, method: 'POST' | 'GET' = 'GET') {
  const { $getAuth } = useNuxtApp()
  const baseURL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:7001/api/' : 'https://d.vv.chat/api/'
  const res = await _fetch<T>(url, params, method, baseURL, $getAuth!)
  if (res.status !== 200) {
    if (process.client) {
      const toast = useToast()
      toast.add({ title: res.message })
      if (res.status === 10003)
        globalThis.localStorage.removeItem(STORAGE_KEY_TOKEN)
    }

    return Promise.reject(res)
  }
  else {
    return res
  }
}

/**
 * 获取剧集列表
 * @param params { current: number, pageSize: number }
 * @returns
 */
export function getList(params = {}) {
  return fetch<IDataListResponse<IProduct>>('product/list', params)
}

/**
 * 获取剧集详情
 * @param id string | number
 * @returns ISubject
 */
export function getSubjectData(id: string) {
  return fetch<IProduct>(`product/${id}`)
}

/**
 * 登录
 * @param params { username: string, password: string }
 * @returns token
 */
export function login(params = {}) {
  return fetch<string>('user/login', params, 'POST')
}

/**
 * 注册
 * @param params { username: string; password: string; email: string }
 * @returns token
 */
export function reg(params = {}) {
  return fetch<IUser>('user/add', params, 'POST')
}

/**
 * 获取用户信息
 * @param id 用户id
 * @returns IUser
 */
export function getUserId(id: string) {
  return fetch<IUser>(`user/${id}`)
}

/**
 * 退出登录
 * @returns boolean
 */
export function logout() {
  return fetch<boolean>('user/logout', {}, 'POST')
}

/**
 * 获取验证码
 * @returns data {token: string; img: string}
 */
export function captcha() {
  return fetch<ICaptcha>(`captcha/init?v=${Math.random()}`)
}

/**
 * 获取用户信息
 * @returns IUser
 */
export function getUserInfo(params = {}) {
  return fetch<IUser>('user/info', params, 'GET')
}

/**
 * 获取动态列表
 * @param params { page: number, pageSize: number }
 * @returns IFeed[]
 */
export function getFeedList(params = {}) {
  return fetch<IDataListResponse<IFeed>>('feed/list', params)
}

/**
 * 获取动态
 * @param id string
 * @returns IFeed
 */
export function getFeed(id: string) {
  return fetch<IFeed>(`feed/${id}`)
}

/**
 * 添加喜欢
 * @param 参数
 * @returns IFavourite
 */
export function addFavourite(params = {}) {
  return fetch<IFavourite>('favourite/add', params, 'POST')
}

/**
 * 点赞
 * @param 参数
 * @returns IDigg
 */
export function addDigg(params = {}) {
  return fetch<IDigg>('digg/add', params, 'POST')
}

/**
 * 发表动态
 * @param 参数
 * @returns IPin
 */
export function addPin(params = {}) {
  return fetch<IFeed>('pin/add', params, 'POST')
}
