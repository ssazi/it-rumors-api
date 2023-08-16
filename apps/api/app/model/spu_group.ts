import type { Application, Context } from 'egg'
import type { SpuGroupType } from '../schema/spu_group'
import type { ICondition } from '../typings'
import spuGroup from '../schema/spu_group'

export default (app: Context & Application) => {
  const SpuGroup = spuGroup(app)
  return class extends SpuGroup<SpuGroupType> {
    static async query(params) {
      const { orderBy = 'sort', order = 'DESC', id, cid } = params
      const param: ICondition = {
        order: [[orderBy, order]]
      }
      const where: { [key: string | symbol]: any } = {}

      if (id)
        where.id = id

      if (cid)
        where.pid = cid

      param.where = where
      const result = await SpuGroup.findAll(param)
      return result
    }

    static async get(params) {
      const result = await SpuGroup.findOne(params)
      return result
    }

    static async add(params) {
      const result = await SpuGroup.create(params)
      return result
    }

    static async edit(params) {
      const { id } = params
      const result = await SpuGroup.update(params, { where: { id } })
      return result
    }

    static async delete(params) {
      const result = await SpuGroup.destroy({ where: params })
      return result
    }
  }
}
