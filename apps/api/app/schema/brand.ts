import type { IBrand } from '@itrumors/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'

export interface BrandType extends BaseModel, IBrand {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, STRING, SMALLINT, BOOLEAN } = Sequelize

  return model.define(
    'brand',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: 'id' },
      name: { type: STRING, allowNull: false, comment: '分类名称' },
      show: { type: BOOLEAN, defaultValue: false, comment: 'false 不显示，1显示' },
      dir: { type: STRING(90), allowNull: false, comment: '目录' },
      desc: { type: STRING, allowNull: false, comment: '目录' },
      letter: { type: STRING(2), comment: '品牌的首字母' },
      sort: { type: SMALLINT, comment: '排序' },
      icon: { type: STRING, comment: '图标' }
    },
    { timestamps: false }
  ) as BaseModelStatic<BrandType>
}
