import { Controller } from 'egg'

export default class Changes extends Controller {
  async get() {
    // 获取 url 中的 id 参数
    const { ctx } = this
    const data = await ctx.model.Changes.get(ctx.params)
    if (data) {
      ctx.helper.deleleParams(data)
      ctx.helper.success(ctx, { data })
    }
    else {
      ctx.helper.fail(ctx)
    }
  }

  async list() {
    const { ctx } = this
    const params = ctx.request.query || {}
    const result = await ctx.model.Changes.query(params)

    ctx.helper.success(ctx, { data: result })
  }

  async add() {
    const { ctx } = this
    const params = ctx.request.body
    params.uid = await ctx.getUserId()
    params.ip = await ctx.getIp()
    const result = await ctx.model.Changes.add(params)
    ctx.helper.success(ctx, { data: result })
  }

  async edit() {
    const { ctx } = this
    const result = await ctx.model.Changes.edit(ctx.request.body)
    ctx.helper.success(ctx, { data: result })
  }

  async delete() {
    const { ctx } = this
    const result = await ctx.model.Changes.delete(ctx.params)
    ctx.helper.success(ctx, { data: result })
  }
}
