import { Controller } from 'egg'

export default class Captcha extends Controller {
  public async init() {
    const { ctx } = this
    return ctx.helper.success(ctx, { data: await ctx.service.captcha.init() })
  }

  public async get() {
    const { ctx } = this
    return ctx.helper.success(ctx, { data: await ctx.service.captcha.get() })
  }
}
