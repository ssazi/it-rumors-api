import { request } from '@umijs/max'
import type { IListResponse, IPage, ISpu } from '@itrumors/types'

/** 获取产品详情 GET /backend/spu/:id */
export async function spuDetail(options?: Record<string, any>) {
  return request<{ data: ISpu }>('/backend/spu/:id', {
    method: 'GET',
    ...(options || {})
  })
}

/** 获取是否有重名 GET /backend/spu/getName */
export async function spuName(params: { name: string;id?: number }) {
  return request<{ data: ISpu }>('/backend/spu/getName', {
    method: 'GET',
    params
  })
}

/** 获取产品列表 GET /backend/spu/list */
export async function spuList(params: IPage) {
  return request<IListResponse<ISpu>>('/backend/spu/list', {
    method: 'GET',
    params: {
      ...params
    }
  })
}

/** 添加/编辑产品 POST /api/spu/add */
export async function spuAdd(body: ISpu) {
  return request<{ data: ISpu; status: number; message: string }>('/backend/spu/add', {
    method: 'POST',
    data: body
  })
}

/** 删除产品 DELETE /api/spu/delete */
export async function spuDelete(options?: Record<string, any>) {
  return request<Record<string, any>>('/backend/spu/delete', {
    method: 'DELETE',
    ...(options || {})
  })
}
