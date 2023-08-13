import type { Application, Context } from 'egg'
import type { SkuType } from '../schema/sku'
import type { ICondition } from '../typings'
import sku from '../schema/sku'

export default (app: Context & Application) => {
  const Sku = sku(app)
  return class extends Sku<SkuType> {
    static async query(params) {
      const { orderBy = 'rank', order = 'ASC', id, pid, sid } = params
      const param: ICondition = {
        order: [[orderBy, order]]
      }
      const where: { [key: string | symbol]: any } = {}

      if (id)
        where.id = id

      if (pid)
        where.pid = pid

      if (sid)
        where.sid = sid

      param.where = where
      const result = await Sku.findAll(param)
      return result
    }

    static async get(params) {
      const result = await Sku.findOne(params)
      return result
    }

    static async add(params) {
      const result = await Sku.create(params)
      return result
    }

    static async edit(params) {
      const { id } = params
      const result = await Sku.update(params, { where: { id } })
      return result
    }

    static async delete(params) {
      const result = await Sku.destroy({ where: params })
      return result
    }
  }
}
