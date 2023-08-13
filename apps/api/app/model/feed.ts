import type { Application, Context } from 'egg'
import type { FeedType } from '../schema/feed'
import type { ICondition } from '../typings'
import feed from '../schema/feed'

export default (app: Context & Application) => {
  // 获取数据类型
  const { model, Sequelize } = app
  const { Op, col } = Sequelize
  const Feed = feed(app)

  return class extends Feed<FeedType> {
    static async query(params) {
      const { attributes, pageSize = 10, current = 1, order = ['created_at', 'DESC'] } = params
      const condition: ICondition = {
        attributes,
        include: [
          { model: model.User, attributes: ['id', 'username', 'nickname', 'avatar'], as: 'user' },
          {
            model: model.Spu,
            attributes: ['id', 'name', 'up', 'comment_count', 'favourite_count', 'share_count'],
            where: { sid: { [Op.eq]: col('feed.sid') } },
            required: false,
            as: 'spu',
            include: [{ model: model.Attachment, attributes: ['file_path', 'is_remote'], as: 'poster' }]
          },
          { model: model.Favourite, attributes: ['id', 'content', 'tags', 'rating', 'interest'], where: { sid: { [Op.eq]: col('feed.sid') } }, required: false, as: 'favourite' },
          { model: model.Pin, attributes: ['id', 'content', 'favourite_count'], where: { sid: { [Op.eq]: col('feed.sid') } }, required: false, as: 'pin' }
        ],
        order: [order],
        offset: pageSize * (current - 1),
        limit: +pageSize,
        where: { status: 'normal' }
      }

      const { count, rows } = await Feed.findAndCountAll(condition)

      return {
        list: rows,
        current,
        pageSize,
        total: count
      }
    }

    static async get(params) {
      const { id, attributes } = params
      const param: ICondition = {
        attributes,
        include: [
          { model: model.User, attributes: ['id', 'username', 'nickname', 'avatar'], as: 'user' },
          {
            model: model.Spu,
            attributes: ['id', 'name', 'comment_count', 'favourite_count', 'share_count', 'bookmark_count'],
            where: { sid: { [Op.eq]: col('feed.sid') } },
            required: false,
            as: 'spu',
            include: [{ model: model.Attachment, attributes: ['file_path', 'is_remote'], as: 'poster' }]
          },
          { model: model.Favourite, attributes: ['id', 'content', 'tags', 'rating', 'interest'], where: { sid: { [Op.eq]: col('feed.sid') } }, required: false, as: 'favourite' },
          { model: model.Pin, attributes: ['id', 'content', 'favourite_count'], where: { sid: { [Op.eq]: col('feed.sid') } }, required: false, as: 'pin' }
        ],
        where: { id, status: 'normal' }
      }
      const result = await Feed.findOne(param)
      return result
    }

    // 添加
    static async add(params) {
      const result = await Feed.create(params)
      return result
    }

    // 更新
    static async edit(params) {
      const { id } = params
      const result = await Feed.update(params, { where: { id } })
      return result
    }

    // 删除
    static async delete(params) {
      const result = await Feed.destroy({ where: params })
      return result
    }

    static associate() {
      Feed.belongsTo(model.User, { foreignKey: 'uid', as: 'user' })
      Feed.hasOne(model.Spu, { foreignKey: 'id', sourceKey: 'aid', as: 'spu' })
      Feed.hasOne(model.Favourite, { foreignKey: 'id', sourceKey: 'aid', as: 'favourite' })
      Feed.hasOne(model.Pin, { foreignKey: 'id', sourceKey: 'aid', as: 'pin' })
    }
  }
}
