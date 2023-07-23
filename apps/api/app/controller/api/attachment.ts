import { Controller } from 'egg'

export default class Attachment extends Controller {
  public async add() {
    const { ctx } = this
    const params = ctx.request.body
    params.uid = await ctx.getUserId()
    params.ip = await ctx.getIp()
    const get = await ctx.model.Attachment.get({ md5: params.md5, uid: params.uid, sid: params.sid })
    if (get)
      return ctx.helper.success(ctx, { data: get })
    const data = await ctx.model.Attachment.add(params)
    return ctx.helper.success(ctx, { data })
  }

  public async edit() {
    const { ctx } = this
    const params = ctx.request.body
    const data = await ctx.model.Attachment.edit(params)
    ctx.helper.success(ctx, { data })
  }

  public async list() {
    const { ctx } = this
    const data = await ctx.model.Attachment.query(ctx.request.query)
    if (data)
      ctx.helper.success(ctx, { data })

    else
      ctx.helper.fail(ctx)
  }

  public async get() {
    const { ctx } = this
    const result = await ctx.model.Attachment.get(ctx.params)

    ctx.helper.success(ctx, { data: result })
  }
}
