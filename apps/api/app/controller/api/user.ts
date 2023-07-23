import { Controller } from 'egg'
import dayjs from 'dayjs'
import type { UserType } from '@root/app/schema/user'

export default class User extends Controller {
  // 用户登入
  async login() {
    const { ctx } = this
    const { helper } = ctx
    // 校验参数
    ctx.validate({
      username: 'string',
      password: 'string'
    })
    // const { username, password, token, captcha } = ctx.request.body
    const { username, password, manager } = ctx.request.body
    const user = await ctx.model.User.get({ username, attributes: ['admin', 'password', 'id', 'salt', 'username', 'nickname', 'avatar'] })

    // const _captcha = await app.redis.get(`${config.base.redis.prefix}_captcha:${token}`)

    // // 验证码错误
    // if (captcha !== _captcha) {
    //   ctx.throw(200, ctx.common.captchaError)
    // }
    // manager 后台登录时的参数，但并且admin = 100 才是管理员
    if (!user || (user?.admin === 100 && !manager))
      return helper.fail(ctx, { message: '用户名错误' })

    else if (user.status === 2)
      return helper.fail(ctx, { message: '用户未审核' })

    const { id, salt } = user
    const pwd = helper.md5(password + salt)
    if (pwd === user.password) {
      try {
        // 生成Token令牌
        const token = await this._generateToken(password, user)
        this._updateLastLoginInfo(id)
        return helper.success(ctx, { data: token })
      }
      catch (e) {
        return helper.fail(ctx, {})
      }
    }
    else {
      return helper.fail(ctx, { message: '密码不正确' })
    }
  }

  async userInfo() {
    const { ctx } = this
    const data = await ctx.getUser()
    if (data)
      ctx.helper.success(ctx, { data })

    else
      ctx.helper.fail(ctx, { message: '用户不存在' })
  }

  async logout() {
    const { ctx, app, config } = this
    const token = await ctx.getToken()
    await app.redis.del(`${config.base.redis.prefix}_token:${token}`)
    ctx.helper.success(ctx, { data: true, message: '退出成功' })
  }

  async get() {
    // 获取 url 中的 id 参数
    const { ctx } = this
    if (!ctx.params.id)
      return ctx.helper.fail(ctx)

    const data = await ctx.model.User.get(ctx.params)
    if (data)
      return ctx.helper.success(ctx, { data })

    else
      return ctx.helper.fail(ctx)
  }

  async list() {
    const { ctx } = this
    const data = await ctx.model.User.query(ctx.request.query)

    ctx.helper.success(ctx, { data })
  }

  async add() {
    const { ctx, app, config } = this
    const params = ctx.request.body
    // 校验参数
    const { username, email, captcha, id, password, token } = params
    // const { title, host } = app.config.site
    if (!id) {
      ctx.validate({
        username: { type: 'string', required: true },
        password: { type: 'password' },
        email: { type: 'email' }
      })
    }
    if (captcha) {
      const _captcha = await app.redis.get(`${config.base.redis.prefix}_captcha:${token}`)
      if (!(captcha === _captcha))
        return ctx.helper.fail(ctx, { message: '验证码错误' })
    }
    else {
      return ctx.helper.fail(ctx, { message: '验证码不能为空' })
    }

    if (email) {
      const user = await ctx.model.User.get(Object.assign({}, id ? { not_id: id } : {}, { email }))
      if (user && user.email === email)
        return ctx.helper.fail(ctx, { message: '邮箱已被使用' })
    }

    const salt = ctx.helper.randomString(6)
    const ip = ctx.request.ip
    if (id) {
      if (username) {
        delete params.username
        return ctx.helper.fail(ctx, { message: '用户名不能修改' })
      }
      if (password) {
        params.salt = salt
        params.password = ctx.helper.md5(ctx.helper.md5(params.password) + salt)
      }
      params.update_ip = app.utils.Tool.ip2long(ip)
    }
    else {
      const user = await ctx.model.User.get({ username })
      if (user && user.username === username)
        return ctx.helper.fail(ctx, { message: '用户名不能重复' })
      params.salt = salt
      params.password = ctx.helper.md5(ctx.helper.md5(params.password) + salt)
      params.register_ip = app.utils.Tool.ip2long(ip)
      params.last_login_ip = app.utils.Tool.ip2long(ip)
    }

    delete params.admin // 不支持传的用户等级

    // const time = dayjs().format('YYYY-MM-DD HH:mm:ss')
    if (id) {
      const data = await ctx.model.User.edit({ ...params })
      this._editLastLoginInfo(id)
      return ctx.helper.success(ctx, { data, message: '编辑成功' })
    }
    else {
      const data = await ctx.model.User.add({ ...params })
      // 生成Token令牌
      const token = await this._generateToken(password, data)
      // await ctx.sendMail({
      //   to: email,
      //   subject: `欢迎 ${data?.username}，注册了${title}`,
      //   html: `亲爱的<b>${data?.username}</b>：<br />您在 <b>${time}</b> 注册了账号 ${data?.username}。<br /><a href="${host}" target="_blank">点击访问</a>`
      // })
      return ctx.helper.success(ctx, { data: { ...data, token }, message: '注册成功' })
    }
  }

  public async setAdmin() {
    const { ctx } = this
    const { id } = ctx.query
    const data = await ctx.model.User.get({ admin: 100 })
    if (!data) {
      const result = await ctx.model.User.edit({ id, admin: 100 })
      if (result)
        ctx.helper.success(ctx, { data: true, message: '设置成功' })
    }
  }

  async editPassword() {
    const { ctx, app, config } = this
    const params = ctx.request.body
    const { username, password, captcha, newPassword, reNewPassword, token } = params
    if (captcha) {
      const _captcha = await app.redis.get(`${config.base.redis.prefix}_captcha:${token}`)
      if (captcha !== _captcha)
        return ctx.helper.fail(ctx, { message: '验证码错误' })
    }
    else {
      return ctx.helper.fail(ctx, { message: '验证码不能为空' })
    }
    const user = await ctx.model.User.get({ username })
    const pass = ctx.helper.md5(ctx.helper.md5(password) + user?.salt)
    if (pass !== user?.password)
      return ctx.helper.fail(ctx, { message: '原密码不正确' })

    if (newPassword !== reNewPassword)
      return ctx.helper.fail(ctx, { message: '两次密码不一样' })

    params.password = newPassword
    params.id = user?.id
    const data = await ctx.model.User.edit(params)

    ctx.helper.success(ctx, { data, message: '密码成功' })
  }

  async sendMail() {
    const { ctx, app } = this
    const params = ctx.request.body
    const { email } = params
    const { title, host } = app.config.site
    const user = await ctx.model.User.get({ email })
    if (!user)
      return ctx.helper.fail(ctx, { message: '该邮箱尚未注册' })

    if (email !== user?.email)
      return ctx.helper.fail(ctx, { message: '邮箱不匹配' })

    const token = ctx.helper.md5(`${user?.id}${user?.username}${user?.password}`)
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss')
    await ctx.model.User.edit({ id: user?.id, forget_at: dayjs() })
    await ctx
      .sendMail({
        to: email,
        subject: '找回密码',
        html: `亲爱的<b>${user?.username}</b>：<br />您在 <b>${time}</b> 提交了找回密码请求。请点击下面的链接重置密码
        （按钮24小时内有效）。<br /><a href="${host}?email=${email}&token=${token}" target="_blank">${host}?email=${email}&token=${token}</a><br /><br /><br />${title}`
      })
      .then(() => {
        ctx.helper.success(ctx, { data: 1, message: '发送成功' })
      })
      .catch(() => {
        ctx.helper.fail(ctx, { message: '发送失败' })
      })
  }

  async checkExpired() {
    const { ctx } = this
    const { email, token } = ctx.params
    const user = await ctx.model.User.get({ email })
    if (user) {
      const key = ctx.helper.md5(`${user?.id}${user?.username}${user?.password}`)
      if (key === token) {
        const nowTime = dayjs().valueOf()
        const oldTime = dayjs(user?.forget_at).valueOf()
        if (nowTime - oldTime > 24 * 60 * 60)
          return ctx.helper.fail(ctx, { message: '该链接已过期！' })

        return ctx.helper.success(ctx, { data: 1, message: '链接有效' })
      }
      return ctx.helper.fail(ctx, { message: '该链无效！' })
    }
    return ctx.helper.fail(ctx, { message: '错误的链接！' })
  }

  async forgetPassword() {
    const { ctx } = this
    const params = ctx.request.body
    const { newPassword, reNewPassword, email } = params

    const user = await ctx.model.User.get({ email })

    if (!user)
      return ctx.helper.fail(ctx, { message: '该邮箱尚未注册' })

    if (newPassword !== reNewPassword)
      return ctx.helper.fail(ctx, { message: '两次密码不一样' })

    const data = ctx.model.User.edit(params)

    ctx.helper.success(ctx, { data, message: '修改成功' })
  }

  async delete() {
    const { ctx } = this
    const data = await ctx.model.User.delete(ctx.params)
    ctx.helper.success(ctx, { data })
  }

  // 编辑成功后更新信息
  private async _editLastLoginInfo(id: number) {
    await this.ctx.model.User.update({ update_ip: await this.ctx.getIp() }, { where: { id } })
  }

  // 更新最后的登录信息
  private async _updateLastLoginInfo(id: number) {
    const { ctx } = this
    const params = {
      last_login_ip: await this.ctx.getIp(),
      login_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      agent: ctx.headers['user-agent']
    }
    await ctx.model.User.update(params, { where: { id }, silent: true })
    const find = await ctx.model.User.get({ id })
    find?.increment('login', { silent: true })
  }

  // 生成token
  private async _generateToken(password: string, user: UserType) {
    // 生成Token令牌
    const { ctx, app, config } = this
    const { helper } = ctx
    const { id, salt } = user
    const pwd = helper.md5(password + salt)
    const token = helper.md5(`${id}${pwd}${salt}`)
    const key = `${config.base.redis.prefix}_token:${token}`
    await app.redis.set(
      key,
      JSON.stringify({
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        nickname: user.nickname,
        admin: user.admin
      })
    )
    app.redis.expire(key, config.base.redis.expire)
    return token
  }
}
