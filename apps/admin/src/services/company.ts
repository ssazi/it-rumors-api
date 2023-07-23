import { request } from '@umijs/max'
import type { ICompany, IListResponse } from '@itrumor/types'

/** 添加公司 POST /backend/company/add */
export async function companyAdd(body: ICompany, options?: Record<string, any>) {
  return request<{ data: ICompany; status: number; message: string }>('/backend/company/add', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}

/** 添加多个公司 POST /backend/company/adds */
export async function companyAdds(body: ICompany[], options?: Record<string, any>) {
  return request<{ data: ICompany[]; status: number; message: string }>('/backend/company/adds', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}

/** 删除公司 POST /backend/company/delete */
export async function companyDelete(body: { id: number }, options?: Record<string, any>) {
  return request<{ data: ICompany; status: number; message: string }>('/backend/company/delete', {
    method: 'DELETE',
    data: body,
    ...(options || {})
  })
}

/** 获取公司列表 GET /backend/country/list */
export async function companyList(
  params: {
    // query
    /** 当前的页码 */
    current?: number
    /** 页面的容量 */
    pageSize?: number
    [key: string]: any
  },
  options?: Record<string, any>
) {
  return request<IListResponse<ICompany>>('/backend/company/list', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}
