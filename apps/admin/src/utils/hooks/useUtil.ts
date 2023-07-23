import { useEffect } from 'react'
import { useModel } from '@umijs/max'

/**
 * 格式化分类列表
 * @param list 分类列表
 * @returns array
 */

type IValue = number | string
export function useCategory() {
  const { categoryList, getCategoryList } = useModel('useList')

  useEffect(() => {
    getCategoryList()
  }, [getCategoryList])

  const data: { value: IValue; label: string; children?: { value: IValue; label: string }[] }[] = []
  categoryList.forEach(item => {
    if (item.pid === '0')
      data.push({ value: item.id!, label: item.name!, children: [] })
  })
  categoryList.forEach(item => {
    if (item.pid !== '0') {
      data.forEach(i => {
        if (String(i.value) === item.pid)
          i.children!.push({ value: item.id!, label: item.name! })
      })
    }
  })

  return data
}
