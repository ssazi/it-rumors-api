import type { IAttribute } from '@itrumors/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'

export interface AttributeType extends BaseModel, IAttribute {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, STRING, JSONB } = Sequelize

  return model.define(
    'attribute',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '属性id' },
      aid: { type: INTEGER, comment: '关联商品id' },
      title: { type: STRING, allowNull: false, comment: '属性名称' },
      value: { type: JSONB, comment: '属性值' } // [{ value: '白色', img_url: '' }]
    },
    { timestamps: false }
  ) as BaseModelStatic<AttributeType>
}
