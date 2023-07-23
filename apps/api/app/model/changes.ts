import type { Application, Context } from 'egg'
import type { ChangesType } from '../schema/changes'
import type { ICondition } from '../typings'
import changes from '../schema/changes'

export default (app: Context & Application) => {
  // 获取数据类型
  const { model } = app
  const Changes = changes(app)

  return class extends Changes<ChangesType> {
    static async query(params) {
      const { attributes, pageSize = 10, current = 1, order = ['created_at', 'DESC'] } = params
      const condition: ICondition = {
        attributes,
        include: [{ model: model.User, attributes: ['id', 'username', 'nickname', 'avatar'], as: 'user' }],
        order: [order],
        offset: pageSize * (current - 1),
        limit: +pageSize,
        where: { status: 'normal' }
      }

      const { count, rows } = await Changes.findAndCountAll(condition)

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
        include: [{ model: model.User, attributes: ['id', 'username', 'nickname', 'avatar'], as: 'user' }],
        where: { id, status: 'normal' }
      }
      const result = await Changes.findOne(param)
      return result
    }

    // 添加
    static async add(params) {
      const result = await Changes.create(params)
      return result
    }

    // 更新
    static async edit(params) {
      const { id } = params
      const result = await Changes.update(params, { where: { id } })
      return result
    }

    // 删除
    static async delete(params) {
      const result = await Changes.destroy({ where: params })
      return result
    }

    static associate() {
      Changes.belongsTo(model.User, { foreignKey: 'uid', as: 'user' })
    }
  }
}
