import type { Application, Context } from 'egg'
import type { BrandType } from '../schema/brand'
import type { ICondition } from '../typings'
import brand from '../schema/brand'

export default (app: Context & Application) => {
  const Brand = brand(app)
  return class extends Brand<BrandType> {
    static async query(params) {
      const { orderBy = 'sort', order = 'DESC', id } = params
      const param: ICondition = {
        order: [[orderBy, order]]
      }
      const where: { [key: string | symbol]: any } = {}

      if (id)
        where.id = id

      param.where = where
      const result = await Brand.findAll(param)
      return result
    }

    static async get(params) {
      const result = await Brand.findOne(params)
      return result
    }

    static async add(params) {
      const result = await Brand.create(params)
      return result
    }

    static async edit(params) {
      const { id } = params
      const result = await Brand.update(params, { where: { id } })
      return result
    }

    static async delete(params) {
      const result = await Brand.destroy({ where: params })
      return result
    }
  }
}
