import { request } from '@umijs/max'
import type { IBrand } from '@itrumors/types'

/** 品牌列表 GET /backend/brand/list */
export async function brandList(options?: Record<string, any>) {
  return request<{ data: IBrand[] }>('/backend/brand/list', {
    method: 'GET',
    params: { ...(options || {}) }
  })
}

/** 添加品牌 POST /backend/brand/add */
export async function brandAdd(body: IBrand, options?: Record<string, any>) {
  return request<{ data: IBrand[]; status: number; message: string }>('/backend/brand/add', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}
/** 获取品牌详情 GET /backend/brand/:id */
export async function brandDeatil(
  params: {
    id?: string
  },
  options?: Record<string, any>
) {
  return request<{ data: IBrand }>(`/backend/brand/${params.id}`, {
    method: 'GET',
    ...(options || {})
  })
}

/** 删除 POST /backend/brand/delete */
export async function brandDelete(body: { id: number }, options?: Record<string, any>) {
  return request<{ data: IBrand; status: number; message: string }>('/backend/brand/delete', {
    method: 'DELETE',
    data: body,
    ...(options || {})
  })
}
