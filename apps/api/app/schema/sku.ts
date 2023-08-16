import type { ISku } from '@itrumors/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'

export interface SkuType extends BaseModel, ISku {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, STRING, DECIMAL, JSONB } = Sequelize

  return model.define(
    'sku_info',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: 'id' },
      aid: { type: INTEGER, comment: '商品id' },
      title: { type: STRING, comment: '标题' },
      price: { type: DECIMAL(18, 4), comment: '价格' },
      shop_price: {
        type: JSONB,
        defaultValue: [],
        comment: '电商价',
        set(value: { [key: string]: number }[]) {
          value && this.setDataValue('shop_price', JSON.stringify(value))
        },
        get() {
          const val = this.getDataValue('shop_price')
          return val ? JSON.parse(val) : []
        }
      }, // 如：[{jd:300}, {taobao:200}]
      stock: { type: INTEGER, defaultValue: 0, comment: '库存' }
    },
    { timestamps: false }
  ) as BaseModelStatic<SkuType>
}
