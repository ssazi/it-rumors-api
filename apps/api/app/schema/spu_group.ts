import type { ISpuGroup } from '@itrumors/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'

export interface SpuGroupType extends BaseModel, ISpuGroup {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, STRING, SMALLINT } = Sequelize

  return model.define(
    'spu_group',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '分组id' },
      cid: { type: SMALLINT, comment: '分类id' },
      title: { type: STRING, allowNull: false, comment: '分组名称' },
      desc: { type: STRING, comment: '描述' },
      sort: { type: SMALLINT, comment: '排序' },
      icon: { type: STRING, comment: '图标' }
    },
    { timestamps: false }
  ) as BaseModelStatic<SpuGroupType>
}
