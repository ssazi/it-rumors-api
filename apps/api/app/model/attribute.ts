import type { Application, Context } from 'egg'
import type { AttributeType } from '../schema/attribute'
import type { ICondition } from '../typings'
import attribute from '../schema/attribute'

export default (app: Context & Application) => {
  const Attribute = attribute(app)
  return class extends Attribute<AttributeType> {
    static async query(params) {
      const { orderBy = 'rank', order = 'ASC', id, pid, aid } = params
      const param: ICondition = {
        order: [[orderBy, order]]
      }
      const where: { [key: string | symbol]: any } = {}

      if (id)
        where.id = id

      if (pid)
        where.pid = pid

      if (aid)
        where.aid = aid

      param.where = where
      const result = await Attribute.findAll(param)
      return result
    }

    static async get(params) {
      const result = await Attribute.findOne(params)
      return result
    }

    static async add(params) {
      const result = await Attribute.create(params)
      return result
    }

    static async edit(params) {
      const { id } = params
      const result = await Attribute.update(params, { where: { id } })
      return result
    }

    static async delete(params) {
      const result = await Attribute.destroy({ where: params })
      return result
    }
  }
}
