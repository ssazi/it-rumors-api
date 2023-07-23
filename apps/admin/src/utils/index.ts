import type { IList } from '@itrumor/types'
import { modelName } from '@itrumor/types'

/**
 * 格式化分类列表
 * @param list 分类列表
 * @returns array
 */

export function getList<T extends IList>(list: T[]) {
  const data: ({ sub?: T[] } & T)[] = []
  list.forEach(item => {
    if (+item.pid! === 0)
      data.push({ ...item, sub: [] })
  })
  data.forEach(item => {
    const arr = list.filter(s => +s.pid! === +item.id!)
    if (arr.length)
      item.sub = arr
  })
  return data
}

/**
 * 判断是否是数字
 * @param val 参数
 * @returns boolean
 */

export function isRealNum(val: any) {
  // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除，
  if (val === '' || val == null)
    return false

  if (!Number.isNaN(val) && typeof val === 'number')
    return true

  else
    return false
}

/**
 * 把id转成string
 * @param data 需要转换的数据
 * @returns 返回id转成string
 */
export function idToStr(data: any[]) {
  data?.forEach(item => {
    if (isRealNum(item.id))
      item.id = String(item.id)

    if (isRealNum(item.pid))
      item.pid = String(item.pid)

    if (isRealNum(item.cid))
      item.cid = String(item.cid)

    if (isRealNum(item.mid))
      item.mid = String(item.mid)

    if (isRealNum(item.sid))
      item.sid = String(item.sid)
  })
  return data
}

export const sidObj = [
  { label: '动漫', value: modelName.PRODUCT },
  { label: '新闻', value: modelName.NEWS },
  { label: '收藏', value: modelName.FAVOURITE },
  { label: '标签', value: modelName.TAG },
  { label: '动态', value: modelName.PIN },
  { label: '转发', value: modelName.FORWARD },
  { label: '评论', value: modelName.COMMENT },
  { label: '回复', value: modelName.REPLY },
  { label: '动态', value: modelName.FEED },
  { label: '话题', value: modelName.TOPIC },
  { label: '用户', value: modelName.USER }
]
/**
 * 格式模型
 * @returns 返回模型名称
 */
export function sidEnum() {
  let obj = {}
  sidObj.forEach(item => {
    obj = {
      ...obj,
      [item.value!]: {
        text: item.label
      }
    }
  })
  return obj
}
