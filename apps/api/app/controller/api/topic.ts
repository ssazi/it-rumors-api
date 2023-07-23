import { modelName } from '@itrumor/types'
import { Controller } from 'egg'

export default class Topic extends Controller {
  async get() {
    // 获取 url 中的 id 参数
    const { ctx, service } = this
    const { id } = this.ctx.params
    const data = await service.topic.get(id)
    if (data) {
      const format = data.toJSON() as typeof data
      format.hits = await ctx.hits({ arr: format, model: 'Feed' })
      ctx.helper.deleleParams(format)
      ctx.helper.success(ctx, { data: format })
    }
    else {
      ctx.helper.fail(ctx)
    }
  }

  async list() {
    const { ctx, service } = this
    const result = await service.topic.list(ctx.request.query)

    ctx.helper.success(ctx, { data: result })
  }

  async add() {
    const { ctx, service } = this
    const params = ctx.request.body
    params.uid = await ctx.getUserId()
    params.ip = await ctx.getIp()
    params.sid = modelName.TOPIC
    params.dir = params.dir ? params.dir : ctx.helper.h2p(params.name)
    if (params.id) {
      const result = await service.topic.edit(params)
      ctx.helper.success(ctx, { data: result, message: '更新成功' })
    }
    else {
      const result = await service.topic.add(params)
      ctx.helper.success(ctx, { data: result, message: '添加成功' })
    }
  }

  async delete() {
    const { ctx, service } = this
    const result = await service.topic.delete(ctx.params)
    ctx.helper.success(ctx, { data: result })
  }
}
