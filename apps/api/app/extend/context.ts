import dayjs from 'dayjs'
import nodemailer from 'nodemailer'
import type { Context } from 'egg'

export default {
  errCodes: {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    402: '用户登录已过期',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '没有找到相关内容',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
    510: '余额不足。',
    511: '不是VIP，无法暂停VIP服务。',
    10002: '系统错误',
    10003: '无权限验证不通过'
  },
  // 日 周 月 总 统计
  async hits<T = any[]>(this: Context, { arr, model }: { arr: T; model: string }) {
    const h: { hits: number; month: number; week: number; lasttime: string; day: number }[] = []
    // 初始化值
    const hit = 'hits'
    const month = 'hits_month'
    const week = 'hits_week'
    const day = 'hits_day'
    const lasttime = 'hits_lasttime'
    const last = dayjs(arr[lasttime]).valueOf()
    const rid = 'id'
    const now = new Date()
    const old = new Date(last)
    h[hit] = arr[hit]
    h[month] = arr[month]
    h[week] = arr[week]
    h[day] = arr[day]
    // 月
    const nowYear = now.getFullYear()
    const oldYear = old.getFullYear()
    const nowMonth = now.getMonth()
    const oldMonth = old.getMonth()

    if (nowYear === oldYear && nowMonth === oldMonth)
      h[month]++
    else h[month] = 1

    // 周
    const weekStart = dayjs().startOf('week').valueOf()
    const weekEnd = dayjs().endOf('week').valueOf()
    if (last >= weekStart && last <= weekEnd)
      h[week]++
    else h[week] = 1

    // 日
    if (nowYear === oldYear && nowMonth === oldMonth && now.getDate() === old.getDate())
      h[day]++
    else h[day] = 1

    h[rid] = arr[rid]
    h[hit] = arr[hit] + 1
    h[lasttime] = dayjs().format()
    const result = await this.app.model[model].update(h, { where: { [rid]: arr[rid] }, silent: true })
    return result
  },
  /**
   * 发邮件
   * params from 发送人 to 收件人 subject 标题 text 正文 html html正文
   */
  async sendMail(params: { from?: string; to?: string; subject?: string; text?: string; html?: string }) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.qq.com', // 域名
      // port: 587,
      secure: false, //  安全的发送模式
      auth: {
        user: 'dxhuii@qq.com', //  发件人邮箱
        pass: 'sxuviuebnlabbjde' //  授权码
      }
    })

    params.from = params.from ? params.from : 'dxhuii@qq.com'

    const result = await transporter.sendMail(params)
    return result
  },
  // 获取用户ID
  async getUserId(this: Context) {
    return this.state.user.id as number
  },
  // 获取用户信息
  async getUser(this: Context) {
    return (this.state.user ?? this.state.user) as { id: number; username: string; admin: number }
  },
  // 获取IP
  async getIp(this: Context) {
    const { request, app } = this
    const ip = request.ip
    return app.utils.Tool.ip2long(ip)
  },
  async getMcat(this: Context, mcid: any) {
    const result = await this.service.mcat.list({ ids: mcid })
    return result
  },
  async getToken(this: Context) {
    const result = this.request.headers.authorization?.replace('Bearer ', '')
    return result !== 'null' ? result : this.request.query.token
  },
  async setFeed(this: Context, data: { sid: number; type: string; aid: number }) {
    const { request, ctx } = this
    const { ip } = request
    const { admin, id } = await this.getUser()
    return admin !== 100 && await ctx.model.Feed.add({ ...data, ip, uid: id })
  }
}
