import { request } from '@umijs/max'
import type { ICategory } from '@itrumors/types'

/** 栏目列表 GET /backend/category/list */
export async function list(options?: Record<string, any>) {
  return request<{ data: ICategory[] }>('/backend/category/list', {
    method: 'GET',
    params: { ...(options || {}) }
  })
}

/** 添加栏目 POST /backend/category/add */
export async function listAdd(body: ICategory, options?: Record<string, any>) {
  return request<{ data: ICategory[]; status: number; message: string }>('/backend/category/add', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}
/** 获取栏目详情 GET /backend/category/:id */
export async function listDeatil(
  params: {
    id?: string
  },
  options?: Record<string, any>
) {
  return request<{ data: ICategory }>(`/backend/category/${params.id}`, {
    method: 'GET',
    ...(options || {})
  })
}
