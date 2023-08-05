import { feedType, modelName } from '@itrumors/types'
import { Controller } from 'egg'

export default class Product extends Controller {
  async get() {
    // 获取 url 中的 id 参数
    const { ctx } = this
    const data = await ctx.model.Product.get(ctx.params)
    if (data) {
      await ctx.hits({ arr: data, model: 'Feed' })
      ctx.helper.deleleParams(data)
      ctx.helper.success(ctx, { data })
    }
    else {
      ctx.helper.fail(ctx)
    }
  }

  public async views() {
    const { ctx } = this
    const { id } = ctx.params
    const data = await ctx.model.Product.views(id)
    ctx.helper.success(ctx, { data })
  }

  public async list() {
    const { ctx } = this
    const data = await ctx.model.Product.query({
      ...ctx.request.query,
      attributes: ['id', 'name', 'cover', 'hits', 'created_at', 'updated_at', 'status']
    })
    if (data)
      ctx.helper.success(ctx, { data })

    else
      ctx.helper.fail(ctx)
  }

  public async getName() {
    const { ctx } = this
    const result = await ctx.model.Product.getName(ctx.query)
    return ctx.helper.success(ctx, { data: result })
  }

  public async add() {
    const { ctx } = this
    const params = ctx.request.body
    params.uid = await ctx.getUserId()
    params.ip = await ctx.getIp()
    const { id, letter, letters, ip } = params
    if (id) {
      const res = await ctx.model.Product.get(id)
      if (!res)
        return ctx.helper.fail(ctx)
    }
    if (!letter)
      params.letter = ctx.helper.h2p(params.name).substring(0, 1).toUpperCase()

    if (!letters)
      params.letters = ctx.helper.h2p(params.name)

    if (id) {
      const result = await ctx.model.Product.edit(params)
      if (result) {
        const { id: aid, uid } = params
        await ctx.model.Feed.add({ ip, sid: modelName.PRODUCT, uid, type: feedType.UPDATE, aid })
        ctx.helper.success(ctx, { data: id || result, message: '更新成功' })
      }
      else {
        ctx.helper.fail(ctx, { message: '更新失败' })
      }
    }
    else {
      const repeat = await ctx.model.Product.getName(params)
      if (repeat)
        ctx.helper.fail(ctx, { message: '已经存在了' })

      const result = await ctx.model.Product.add(params)
      if (result) {
        const { id: aid, uid } = result
        await ctx.model.Feed.add({ ip, sid: modelName.PRODUCT, uid, type: feedType.ADD, aid })
        ctx.helper.success(ctx, { data: id || result, message: '添加成功' })
      }
      else {
        ctx.helper.fail(ctx, { message: '添加失败' })
      }
    }
  }

  public async delete() {
    const { ctx } = this
    const data = await ctx.model.Product.delete(ctx.params)
    if (data)
      ctx.helper.success(ctx, { data, message: '删除成功' })

    else
      ctx.helper.fail(ctx)
  }
}
