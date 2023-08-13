import { Controller } from 'egg'

export default class Brand extends Controller {
  async list() {
    const { ctx } = this
    const result = await ctx.model.Brand.query(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }

  public async get() {
    const { ctx } = this
    const result = await ctx.model.Brand.get(ctx.params)

    ctx.helper.success(ctx, { data: result })
  }

  async add() {
    const { ctx } = this
    const params = ctx.request.body
    if (!params.dir)
      params.dir = ctx.helper.h2p(params.name)

    const result = await ctx.model.Brand[params.id ? 'edit' : 'add'](params)

    ctx.helper.success(ctx, { data: result })
  }

  async delete() {
    const { ctx } = this
    const result = await ctx.model.Brand.delete(ctx.params)

    ctx.helper.success(ctx, { data: result })
  }
}
