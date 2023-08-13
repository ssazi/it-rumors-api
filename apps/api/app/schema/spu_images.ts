import type { ISpuImages } from '@itrumors/types'
import type { Application, Context } from 'egg'
import type { BaseModel, BaseModelStatic } from '../typings'

export interface SpuImagesType extends BaseModel, ISpuImages {}

export default (app: Context & Application) => {
  const { model, Sequelize } = app
  // 获取数据类型
  const { INTEGER, STRING, SMALLINT, BOOLEAN } = Sequelize

  return model.define(
    'spu_images',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: 'id' },
      aid: { type: SMALLINT, comment: '关联spu_id' },
      name: { type: STRING, comment: '图片名' },
      url: { type: STRING, comment: '图片' },
      sort: { type: SMALLINT, comment: '顺序' },
      is_default: { type: BOOLEAN, defaultValue: false, comment: '是否默认图（false否 true是）' },
      is_slide: { type: BOOLEAN, defaultValue: false, comment: '是否轮播图（false否 true是）' }
    },
    { timestamps: false }
  ) as BaseModelStatic<SpuImagesType>
}
