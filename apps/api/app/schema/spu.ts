import type { Application, Context } from 'egg'
import type { ISpu } from '@itrumors/types'
import type { BaseModel, BaseModelStatic } from '../typings'

export interface SpuType extends BaseModel, ISpu {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { NOW, DATE, STRING, TEXT, INTEGER, SMALLINT, BOOLEAN } = Sequelize

  return model.define(
    'spu_info',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '商品id' },
      sid: { type: SMALLINT, defaultValue: 1, comment: '模型ID' },
      cid: { type: SMALLINT, comment: '分类id' },
      bid: { type: INTEGER, comment: '品牌id' },
      name: { type: STRING, allowNull: false, comment: '商品名称' },
      desc: { type: STRING(1000), allowNull: false, comment: '商品描述' },
      tag: { type: STRING, comment: '标签' },
      cover: { type: STRING, comment: '图片' },
      content: { type: TEXT, comment: '商品介绍（富文本）' },
      letter: { type: STRING(2), allowNull: false, comment: '首字母' },
      letters: { type: STRING, allowNull: false, comment: '拼音' },
      up: { type: INTEGER, defaultValue: 0, comment: '顶' },
      down: { type: INTEGER, defaultValue: 0, comment: '踩' },
      isPublish: { type: BOOLEAN, defaultValue: false, comment: '是否发布' },
      comment_count: { type: INTEGER, defaultValue: 0, comment: '评论数' },
      forward_count: { type: INTEGER, defaultValue: 0, comment: '转发数' },
      favourite_count: { type: INTEGER, defaultValue: 0, comment: '喜欢数' },
      bookmark_count: { type: INTEGER, defaultValue: 0, comment: '收藏数' },
      share_count: { type: INTEGER, defaultValue: 0, comment: '分享数' },
      hits: { type: INTEGER, defaultValue: 0, comment: '总' },
      hits_day: { type: INTEGER, defaultValue: 0, comment: '日' },
      hits_week: { type: INTEGER, defaultValue: 0, comment: '周' },
      hits_month: { type: INTEGER, defaultValue: 0, comment: '月' },
      hits_lasttime: { type: DATE, defaultValue: NOW, comment: '热度更新时间' },
      updated_at: {
        type: DATE,
        defaultValue: NOW,
        comment: '更新时间',
        get() {
          return app.utils.Tool.formatDate(this.getDataValue('updated_at'))
        }
      }
    },
    {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: false,
      paranoid: false
    }
  ) as BaseModelStatic<SpuType>
}
