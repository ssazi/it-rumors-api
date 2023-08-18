import type { ICategory } from '@itrumors/types'
import { useCallback, useState } from 'react'
import { categoryList } from '@/services'

export default function useList() {
  const [data, setData] = useState<ICategory[]>([])

  const getCategoryList = useCallback(async (params?: { pid?: number; sid?: number }) => {
    const res = await categoryList(params)
    setData(res.data)
  }, [])

  return {
    categoryList: data,
    getCategoryList
  }
}
