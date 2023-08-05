import { AES, enc } from 'crypto-js'
import dayjs from 'dayjs'
import { sidName } from '@itrumors/types'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn') // 全局使用
dayjs.extend(relativeTime)

const multipliers = [0x1000000, 0x10000, 0x100, 1]
export default class Tool {
  ip2long(ip: string) {
    let longValue = 0
    ip.split('.').forEach((part, i) => {
      longValue += +part * multipliers[i]
    })
    return longValue
  }

  long2ip(longValue: number) {
    return multipliers
      .map(multiplier => {
        return Math.floor((longValue % (multiplier * 0x100)) / multiplier)
      })
      .join('.')
  }

  encrypt(data: string, key: string) {
    return AES.encrypt(data, key).toString()
  }

  decrypt(crypted: string, key: string) {
    const bytes = AES.decrypt(crypted, key)
    return bytes.toString(enc.Utf8)
  }

  modelName(sid: number) {
    const name: string = sidName[sid]
    return name.substring(0, 1).toUpperCase() + name.substring(1, 100)
  }

  formatDate(date: string, fmt = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(date).format(fmt)
  }

  fromNow(date: string) {
    return dayjs(date).fromNow()
  }
}
