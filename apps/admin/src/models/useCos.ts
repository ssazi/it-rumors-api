import { useCallback, useState } from 'react'
import type { ISts } from '@itrumors/types'
import { stsInit } from '@/services'

export default function useMcat() {
  const [sts, setSts] = useState<ISts>()

  const getSts = useCallback(async () => {
    const res = await stsInit()
    setSts(res.data)
  }, [])

  return {
    sts,
    getSts
  }
}
