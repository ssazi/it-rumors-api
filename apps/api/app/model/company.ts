import type { Application, Context } from 'egg'
import type { CompanyType } from '../schema/company'
import type { ICondition } from '../typings'
import company from '../schema/company'

export default (app: Context & Application) => {
  // 获取数据类型
  const { model } = app
  const Company = company(app)

  return class extends Company<CompanyType> {
    static async query(params) {
      const { attributes, pageSize = 10, current = 1, order = ['id', 'DESC'], id, name, country } = params
      const condition: ICondition = {
        attributes,
        include: [{ model: model.Attachment, attributes: ['file_path', 'is_remote'], as: 'poster' }],
        order: [order],
        offset: pageSize * (current - 1),
        limit: +pageSize
      }

      const where: { [key: string | symbol]: any } = {}

      if (id)
        where.id = id

      if (name)
        where.name = name.includes(',') ? name.split(',') : name

      if (country)
        where.country = country.includes(',') ? country.split(',') : country

      condition.where = where

      const { count, rows } = await Company.findAndCountAll(condition)

      return {
        list: rows,
        current,
        pageSize,
        total: count
      }
    }

    static async get(params) {
      const result = await Company.findOne(params)
      return result
    }

    static async add(params) {
      const result = await Company.create(params)
      return result
    }

    // 添加多条
    static async adds(params) {
      const result = await Company.bulkCreate(params)
      return result
    }

    static async edit(params) {
      const { id } = params
      const result = await Company.update(params, { where: { id } })
      return result
    }

    static async delete(params) {
      const result = await Company.destroy({ where: params })
      return result
    }

    static associate() {
      Company.hasOne(model.Attachment, { foreignKey: 'id', sourceKey: 'logo', as: 'poster' })
    }
  }
}
