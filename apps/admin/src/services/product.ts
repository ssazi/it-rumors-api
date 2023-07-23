import { request } from '@umijs/max'
import type { IListResponse, IProduct } from '@itrumor/types'

/** 获取剧集详情 GET /backend/product/:id */
export async function productDetail(options?: Record<string, any>) {
  return request<{
    data: IProduct
  }>('/backend/product/:id', {
    method: 'GET',
    ...(options || {})
  })
}

/** 获取是否有重名 GET /backend/product/getName */
export async function productName(
  params: {
    name: string
    id?: number
  },
  options?: Record<string, any>
) {
  return request<{
    data: IProduct
  }>('/backend/product/getName', {
    method: 'GET',
    params,
    ...(options || {})
  })
}

/** 获取剧集列表 GET /backend/product/list */
export async function productList(
  params: {
    // query
    /** 当前的页码 */
    current?: number
    /** 页面的容量 */
    pageSize?: number
  },
  options?: Record<string, any>
) {
  return request<IListResponse<IProduct>>('/backend/product/list', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** 添加/编辑剧集 POST /api/product/add */
export async function productAdd(body: IProduct, options?: Record<string, any>) {
  return request<{ data: IProduct; status: number; message: string }>('/backend/product/add', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}

/** 更新剧集剧照 POST /api/product/editCover */
export async function productEditCover(body: { id?: number; cover?: number }, options?: Record<string, any>) {
  return request<{ data: IProduct; status: number; message: string }>('/backend/product/editCover', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}

/** 删除剧集 DELETE /api/product/delete */
export async function productDelete(options?: Record<string, any>) {
  return request<Record<string, any>>('/backend/product/delete', {
    method: 'DELETE',
    ...(options || {})
  })
}
