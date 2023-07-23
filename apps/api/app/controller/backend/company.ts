import { Controller } from 'egg'

export default class Company extends Controller {
  async list() {
    const { ctx } = this
    const result = await ctx.model.Company.query(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }

  public async get() {
    const { ctx } = this
    const result = await ctx.model.Company.get(ctx.params)

    ctx.helper.success(ctx, { data: result })
  }

  public async add() {
    const { ctx } = this
    const params = ctx.request.body

    const result = await ctx.model.Company[params.id ? 'edit' : 'add'](params)

    ctx.helper.success(ctx, { data: result })
  }

  public async adds() {
    const { ctx } = this
    const params = ctx.request.body

    const result = await ctx.model.Company.adds(params)

    ctx.helper.success(ctx, { data: result })
  }

  public async delete() {
    const { ctx } = this
    const result = await ctx.model.Company.delete(ctx.params)

    ctx.helper.success(ctx, { data: result })
  }
}
