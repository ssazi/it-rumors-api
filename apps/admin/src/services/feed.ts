import { request } from '@umijs/max'
import type { IFeed, IListResponse } from '@itrumors/types'

/** 添加动态 POST /backend/feed/add */
export async function feedAdd(body: IFeed, options?: Record<string, any>) {
  return request<{ data: IFeed; status: number; message: string }>('/backend/feed/add', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}

/** 删除 POST /backend/feed/delete */
export async function feedDelete(body: { id: number }, options?: Record<string, any>) {
  return request<{ data: IFeed; status: number; message: string }>('/backend/feed/delete', {
    method: 'DELETE',
    data: body,
    ...(options || {})
  })
}

/** 获取动态列表 GET /backend/feed/list */
export async function feedList(
  params: {
    // query
    /** 当前的页码 */
    current?: number
    /** 页面的容量 */
    pageSize?: number
  },
  options?: Record<string, any>
) {
  return request<IListResponse<IFeed>>('/backend/feed/list', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}
