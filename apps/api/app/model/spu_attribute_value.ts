import type { Application, Context } from 'egg'
import type { SpuAttributeValueType } from '../schema/spu_attribute_value'
import type { ICondition } from '../typings'
import spuAttributeValue from '../schema/spu_attribute_value'

export default (app: Context & Application) => {
  const SpuAttributeValue = spuAttributeValue(app)
  return class extends SpuAttributeValue<SpuAttributeValueType> {
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
      const result = await SpuAttributeValue.findAll(param)
      return result
    }

    static async get(params) {
      const result = await SpuAttributeValue.findOne(params)
      return result
    }

    static async add(params) {
      const result = await SpuAttributeValue.create(params)
      return result
    }

    static async edit(params) {
      const { id } = params
      const result = await SpuAttributeValue.update(params, { where: { id } })
      return result
    }

    static async delete(params) {
      const result = await SpuAttributeValue.destroy({ where: params })
      return result
    }
  }
}
