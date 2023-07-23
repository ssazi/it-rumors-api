import { request } from '@umijs/max'
import type { IAttachment, IAttachmentTable, IListResponse, ISts } from '@itrumor/types'

/** 异步获取临时密钥 GET /backend/sts/init */
export async function stsInit(params?: { prefix?: string }, options?: Record<string, any>) {
  return request<{ data: ISts }>('/backend/sts/init', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}

/** 获取剧集详情 GET /backend/attachment/:id */
export async function attachmentDetail(options?: Record<string, any>) {
  return request<{
    data: IAttachment
  }>('/backend/attachment/:id', {
    method: 'GET',
    ...(options || {})
  })
}

/** 添加附件 POST /backend/attachment/add */
export async function attachmentAdd(body: IAttachment, options?: Record<string, any>) {
  return request<{ data: IAttachment; status: number; message: string }>('/backend/attachment/add', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}

/** 更新附件 POST /backend/attachment/edit */
export async function attachmentEdit(body: IAttachment, options?: Record<string, any>) {
  return request<{ data: IAttachment; status: number; message: string }>('/backend/attachment/edit', {
    method: 'POST',
    data: body,
    ...(options || {})
  })
}

/** 删除 POST /backend/attachment/delete */
export async function attachmentDelete(body: { id: number }, options?: Record<string, any>) {
  return request<{ data: IAttachment; status: number; message: string }>('/backend/attachment/delete', {
    method: 'DELETE',
    data: body,
    ...(options || {})
  })
}

/** 获取附件列表 GET /backend/attachment/list */
export async function attachmentList(
  params: {
    // query
    /** 当前的页码 */
    current?: number
    /** 页面的容量 */
    pageSize?: number
  },
  options?: Record<string, any>
) {
  return request<IListResponse<IAttachmentTable>>('/backend/attachment/list', {
    method: 'GET',
    params: {
      ...params
    },
    ...(options || {})
  })
}
