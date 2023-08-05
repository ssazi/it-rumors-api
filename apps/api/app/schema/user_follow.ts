import type { IUserFollow } from '@itrumors/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'

export interface UserFollowType extends BaseModel, IUserFollow {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, SMALLINT, BOOLEAN, STRING } = Sequelize

  // 定义模型
  return model.define('follow', {
    id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true },
    sid: { type: SMALLINT, defaultValue: 24, comment: '模型ID' },
    uid: { type: INTEGER, allowNull: false, comment: '用户ID' },
    aid: { type: INTEGER, allowNull: false, comment: '关联ID' },
    note: { type: INTEGER, comment: '备注' },
    ip: { type: INTEGER, defaultValue: 0, comment: 'ip' },
    is_mutual: { type: BOOLEAN, defaultValue: false, comment: '是否互相关注' },
    status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' }
  }) as BaseModelStatic<UserFollowType>
}
