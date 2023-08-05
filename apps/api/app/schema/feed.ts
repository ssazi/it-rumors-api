import type { IFeed } from '@itrumors/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'

export interface FeedType extends BaseModel, IFeed {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, NOW, DATE, SMALLINT, STRING, VIRTUAL } = Sequelize

  return model.define(
    'feed',
    {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true },
      sid: { type: SMALLINT, allowNull: false, comment: '模型ID' },
      uid: { type: INTEGER, allowNull: false, comment: '用户ID' },
      aid: { type: INTEGER, allowNull: false, comment: '关联内容ID' },
      type: { type: STRING, allowNull: false, comment: '类型:follow关注|score评分|evaluate评价|add添加|update更新|想看wish|看过seen|在看do|搁置on_hold|抛弃dropped' },
      ip: { type: INTEGER, defaultValue: 0, comment: 'IP' },
      hits: { type: INTEGER, defaultValue: 0, comment: '总' },
      hits_day: { type: INTEGER, defaultValue: 0, comment: '日' },
      hits_week: { type: INTEGER, defaultValue: 0, comment: '周' },
      hits_month: { type: INTEGER, defaultValue: 0, comment: '月' },
      hits_lasttime: { type: DATE, defaultValue: NOW, comment: '热度更新时间' },
      up: { type: INTEGER, defaultValue: 0, comment: '赞' },
      down: { type: INTEGER, defaultValue: 0, comment: '踩' },
      comment_count: { type: INTEGER, defaultValue: 0, comment: '评论数' },
      forward_count: { type: INTEGER, defaultValue: 0, comment: '转发数' },
      favourite_count: { type: INTEGER, defaultValue: 0, comment: '喜欢数' },
      bookmark_count: { type: INTEGER, defaultValue: 0, comment: '收藏数' },
      status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' },
      created_at: {
        type: DATE,
        defaultValue: NOW,
        comment: '创建时间',
        get() {
          return app.utils.Tool.formatDate(this.getDataValue('created_at'))
        }
      },
      updated_at: {
        type: DATE,
        defaultValue: NOW,
        comment: '更新时间',
        get() {
          return app.utils.Tool.formatDate(this.getDataValue('updated_at'))
        }
      },
      time: {
        type: VIRTUAL,
        get() {
          return app.utils.Tool.fromNow(this.getDataValue('created_at'))
        }
      }
    },
    {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false,
      paranoid: false
    }
  ) as BaseModelStatic<FeedType>
}
