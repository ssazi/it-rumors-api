import type { ITopic } from '@itrumor/types'
import { useCallback, useState } from 'react'
import { topicList } from '@/services'

export default function useList() {
  const [data, setdData] = useState<ITopic[]>()

  const getTopicList = useCallback(async () => {
    const res = await topicList({ pageSize: 100 })
    setdData(res.data?.list)
  }, [])

  return {
    topicList: data,
    getTopicList
  }
}
