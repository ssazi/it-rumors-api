import type { IBrand } from '@itrumors/types'
import { useCallback, useState } from 'react'
import { brandList } from '@/services'

export default function useBrand() {
  const [data, setData] = useState<IBrand[]>([])

  const getCategoryList = useCallback(async (params?: { pid?: number; sid?: number }) => {
    const res = await brandList(params)
    setData(res.data)
  }, [])

  return {
    brandList: data,
    getCategoryList
  }
}
