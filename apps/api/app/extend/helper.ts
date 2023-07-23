import crypto from 'node:crypto'
import { pinyin } from 'pinyin-pro'
import type { Context } from 'egg'

export interface IRes {
  message?: string
  status?: number
  data?: any
}

export default {
  // 处理成功请求后的响应
  success(ctx: Context, { data = {}, status = 200, message = '' }: IRes) {
    ctx.body = {
      data,
      status: 200,
      message: message || ctx.errCodes[status]
    }
  },
  // 处理失败请求后的响应
  fail(ctx: Context, data?: IRes) {
    const { message = '', status = 404 } = data || {}
    ctx.body = {
      status: status || 500,
      message: message || ctx.errCodes[status]
    }
  },
  md5(data: string) {
    return crypto.createHash('md5').update(data).digest('hex')
  },
  // 汉字转拼音
  h2p(data: string) {
    return pinyin(data, { pattern: 'pinyin', toneType: 'none', v: true })
  },
  randomString(len: number) {
    len = len || 32
    const chars = 'ABCDEFGHIJKLMONPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789'
    const maxPos = chars.length
    let pwd = ''
    for (let i = 0; i < len; i++)
      pwd += chars.charAt(Math.floor(Math.random() * maxPos))

    return pwd
  },
  deleleParams(obj: any) {
    // delete obj.hits;
    delete obj.hits_day
    delete obj.hits_week
    delete obj.hits_month
    delete obj.hits_lasttime
  }
}
