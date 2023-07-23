import { message } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { getVideo } from '@/services'

export default () => {
  const [doubanLoading, setDoubanLoading] = useState(false)
  const getDoubanDetail = async (id: string, findMcid: any) => {
    setDoubanLoading(true)
    if (!id) {
      setDoubanLoading(false)
      return message.warning('豆瓣ID未填')
    }
    const res = await getVideo({ title: 'douban', id })
    setDoubanLoading(false)
    if (res) {
      const {
        title,
        original_title,
        intro,
        languages,
        actors,
        aka,
        countries,
        directors,
        pubdate,
        year,
        durations,
        genres,
        episodes_count,
        rating
      } = res.data
      const first_date = pubdate?.[0]?.split('(')?.[0] || null
      const params: any = {
        name: title,
        aliases: aka.join(','),
        foreign: original_title,
        content: intro,
        language: languages[0] === '汉语普通话' ? '国语' : languages[0],
        star: actors.map((item: { name: string }) => item.name).join(','),
        area: countries[0],
        director: directors.map((item: { name: string }) => item.name).join(','),
        first_date,
        year,
        length: durations[0].match(/^(\d)*/)?.[0],
        mcid: findMcid(genres),
        total: episodes_count || null,
        tag: `${title}${aka.length ? `,${aka.join(',')}` : ''}`,
        gold: rating.value || null,
        weekday: first_date ? [String(dayjs(first_date).day())] : null
      }
      return params
    }
  }

  return {
    doubanLoading,
    getDoubanDetail
  }
}
