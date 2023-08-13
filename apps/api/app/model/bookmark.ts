import type { Application, Context } from 'egg'
import type { BookmarkType } from '../schema/bookmark'
import bookmark from '../schema/bookmark'
import type { ICondition } from '../typings'

export default (app: Context & Application) => {
  // 获取数据类型
  const { model } = app
  const Bookmark = bookmark(app)

  return class extends Bookmark<BookmarkType> {
    static async query(params) {
      const { attributes, pageSize, pageNo, order = ['created_at', 'DESC'] } = params
      const condition: ICondition = {
        attributes,
        include: [
          { model: model.User, attributes: ['id', 'username', 'nickname', 'avatar'], as: 'user' },
          { model: model.Spu, attributes: ['id', 'name', 'pic', 'created_at'], as: 'spu' }
        ],
        order: [order],
        offset: pageSize * (pageNo - 1),
        limit: +pageSize,
        where: { status: 1 }
      }
      const { count, rows } = await Bookmark.findAndCountAll(condition)

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
      const result = await Bookmark.findOne(condition)
      return result
    }

    static async add(params) {
      const result = await Bookmark.create(params)
      return result
    }

    static async edit(params) {
      const result = await Bookmark.update(params, { where: { id: params.id } })
      return result
    }

    static async delete(params) {
      const result = await Bookmark.destroy({ where: { id: params.id } })
      return result
    }

    static async adds(params) {
      const result = await Bookmark.bulkCreate(params)
      return result
    }

    static associate() {
      Bookmark.hasOne(model.Spu, { foreignKey: 'id', sourceKey: 'aid', as: 'spu' })
      Bookmark.belongsTo(model.User, { as: 'user', foreignKey: 'uid' })
    }
  }
}
