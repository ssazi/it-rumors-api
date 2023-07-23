import type { Application, Context } from 'egg'
import type { FavouriteType } from '../schema/favourite'
import favourite from '../schema/favourite'
import type { ICondition } from '../typings'

export default (app: Context & Application) => {
  // 获取数据类型
  const { model } = app
  const Favourite = favourite(app)

  return class extends Favourite<FavouriteType> {
    static async query(params) {
      const { attributes, pageSize, pageNo, order = ['created_at', 'DESC'] } = params
      const condition: ICondition = {
        attributes,
        include: [
          { model: model.User, attributes: ['id', 'username', 'nickname', 'avatar'], as: 'user' },
          { model: model.Product, attributes: ['id', 'name', 'pic', 'created_at'], as: 'product' }
        ],
        order: [order],
        offset: pageSize * (pageNo - 1),
        limit: +pageSize,
        where: { status: 1 }
      }
      const { count, rows } = await Favourite.findAndCountAll(condition)

      return {
        list: rows,
        pages: {
          pageNo,
          pageSize,
          total: count
        }
      }
    }

    static async get(params, attributes = ['id', 'uid', 'aid']) {
      const condition = {
        attributes,
        where: {}
      }
      condition.where = params
      const result = await Favourite.findOne(condition)
      return result
    }

    static async add(params) {
      const result = await Favourite.create(params)
      return result
    }

    static async edit(params) {
      const result = await Favourite.update(params, { where: { id: params.id } })
      return result
    }

    static async delete(params) {
      const result = await Favourite.destroy({ where: { id: params.id } })
      return result
    }

    static async adds(params) {
      const result = await Favourite.bulkCreate(params)
      return result
    }

    static associate() {
      Favourite.hasOne(model.Product, { foreignKey: 'id', sourceKey: 'aid', as: 'product' })
      Favourite.belongsTo(model.User, { as: 'user', foreignKey: 'uid' })
    }
  }
}
