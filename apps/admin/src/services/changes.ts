import { request } from '@umijs/max'
import type { IChanges, IListResponse } from '@itrumor/types'

/** 删除记录 POST /backend/changes/delete */
export async function changesDelete(body: { id: number }, options?: Record<string, any>) {
  return request<{ data: IChanges; status: number; message: string }>('/backend/changes/delete', {
    method: 'DELETE',
    data: body,
    ...(options || {})
  })
}

/** 获取记录列表 GET /backend/changes/list */
export async function changesList(
  params: {
    // query
    /** 当前的页码 */
    current?: number
    /** 页面的容量 */
    pageSize?: number
  },
  options?: Record<string, any>
) {
  return request<IListResponse<IChanges>>('/backend/changes/list', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}
