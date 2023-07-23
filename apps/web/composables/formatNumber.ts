/**
 * 格式化数字
 * @param {number} value
 * @param {string} type
 * @returns
 */
export function formatNumber(value: number, type?: string) {
  const newValue = ['', '', '']
  let fr = 1000
  let num = 3
  let text1 = ''
  let text2 = ''
  let fm = 1
  if (value == null || Number.isNaN(value))
    return !type ? newValue : ''

  if (value < 0) {
    value = Math.abs(value)
    text2 = '-'
  }
  while (value / fr >= 1) {
    fr *= 10
    num += 1
    // console.log('数字', value / fr, 'num:', num)
  }
  if (num <= 4) { // 千
    newValue[0] = value.toString()
    newValue[1] = ''
  }
  else if (num <= 8) { // 万
    // text1 = parseInt(num - 4) / 3 > 1 ? '千万' : '万'
    text1 = '万'
    // tslint:disable-next-line:no-shadowed-variable
    fm = text1 === '万' ? 10000 : 10000000
    if (value % fm === 0)
      newValue[0] = `${Number.parseInt((value / fm).toString())}`

    else
      newValue[0] = `${Number.parseFloat((value / fm).toString()).toFixed(2)}`

    newValue[1] = text1
  }
  else { // 亿 if (num <= 16)
    // text1 = (num - 8) / 3 > 1 ? '千亿' : '亿'
    text1 = '亿'
    text1 = (num - 8) / 4 > 1 ? '万亿' : text1
    text1 = (num - 8) / 7 > 1 ? '千万亿' : text1
    text1 = (num - 8) / 10 > 1 ? '亿亿' : text1
    // tslint:disable-next-line:no-shadowed-variable
    fm = 1
    if (text1 === '亿')
      fm = 100000000

    else if (text1 === '千亿')
      fm = 100000000000

    else if (text1 === '万亿')
      fm = 1000000000000

    else if (text1 === '千万亿')
      fm = 1000000000000000

    else
      fm = 1000000000000000000

    if (value % fm === 0)
      newValue[0] = `${Number.parseInt((value / fm).toString())}`

    else
      newValue[0] = `${Number.parseFloat((value / fm).toString()).toFixed(2)}`

    newValue[1] = text1
  }
  if (value < 1000)
    newValue[0] = `${value}`

  newValue[0] = text2 ? text2 + newValue[0] : newValue[0]
  return !type ? newValue : (newValue[0] + newValue[1])
}
