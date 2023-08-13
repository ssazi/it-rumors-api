import type { Application, Context } from 'egg'
import type { CategoryType } from '../schema/category'
import type { ICondition } from '../typings'
import category from '../schema/category'

export default (app: Context & Application) => {
  const Category = category(app)
  return class extends Category<CategoryType> {
    static async query(params) {
      const { orderBy = 'rank', order = 'ASC', id, pid, sid } = params
      const param: ICondition = {
        attributes: { exclude: ['seo_title', 'seo_keywords', 'seo_description'] },
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
      const result = await Category.findAll(param)
      return result
    }

    static async get(params) {
      const result = await Category.findOne(params)
      return result
    }

    static async add(params) {
      const result = await Category.create(params)
      return result
    }

    static async edit(params) {
      const { id } = params
      const result = await Category.update(params, { where: { id } })
      return result
    }

    static async delete(params) {
      const result = await Category.destroy({ where: params })
      return result
    }
  }
}
