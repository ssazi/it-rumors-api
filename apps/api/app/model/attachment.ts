import type { Application, Context } from 'egg'
import type { ICondition, IParams } from '../typings'
import type { AttachmentType } from '../schema/attachment'
import attachment from '../schema/attachment'

export default (app: Context & Application) => {
  // 获取数据类型
  const { Sequelize, model } = app
  const { Op, col } = Sequelize
  const Attachment = attachment(app)

  return class extends Attachment<AttachmentType> {
    static async query(params: IParams<string> & { uid?: number }) {
      const { pageSize = 10, current = 1, order = 'DESC', orderBy = 'created_at', attributes, filter = '{}' } = params
      const { up, md5, aid, sid, uid } = JSON.parse(filter)
      const condition: ICondition = {
        attributes,
        include: [
          { model: model.User, attributes: ['id', 'username', 'nickname', 'avatar'], as: 'user' },
          { model: model.Topic, attributes: ['id', 'name'], where: { sid: { [Op.eq]: col('attachment.sid') } }, required: false, as: 'topic' }
        ],
        order: [[orderBy, order]],
        offset: pageSize * (current - 1),
        limit: +pageSize
      }
      const where: { [key: string | symbol]: any } = { status: 'normal' }

      if (up)
        where[Op.and] = [{ md5 }, { aid }, { sid }, { uid }]

      if (sid)
        where.sid = sid

      if (aid)
        where.aid = aid

      condition.where = where
      const { count, rows } = await Attachment.findAndCountAll(condition)

      return {
        list: rows,
        current,
        pageSize,
        total: count
      }
    }

    static async add(params) {
      const result = await Attachment.create(params)
      return result
    }

    static async get(params) {
      const condition: ICondition = {
        where: {}
      }
      condition.where = params
      const result = await Attachment.findOne(condition)
      return result
    }

    static async delete(params) {
      const result = await Attachment.destroy({ where: { id: params.id } })
      return result
    }

    static async edit(params) {
      const result = await Attachment.update(params, { where: { id: params.id } })
      return result
    }

    static associate() {
      Attachment.hasOne(model.User, { foreignKey: 'id', sourceKey: 'uid', as: 'user' })
      Attachment.hasOne(model.Topic, { foreignKey: 'id', sourceKey: 'aid', as: 'topic' })
    }
  }
}
