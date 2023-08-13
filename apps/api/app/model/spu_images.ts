import type { Application, Context } from 'egg'
import type { SpuImagesType } from '../schema/spu_images'
import type { ICondition } from '../typings'
import spuImages from '../schema/spu_images'

export default (app: Context & Application) => {
  const SpuImages = spuImages(app)
  return class extends SpuImages<SpuImagesType> {
    static async query(params) {
      const { orderBy = 'rank', order = 'ASC', id, pid, sid } = params
      const param: ICondition = {
        order: [[orderBy, order]]
      }
      const where: { [key: string | symbol]: any } = {}

      if (id)
        where.id = id

      if (pid)
        where.pid = pid

      if (sid)
        where.sid = sid

      param.where = where
      const result = await SpuImages.findAll(param)
      return result
    }

    static async get(params) {
      const result = await SpuImages.findOne(params)
      return result
    }

    static async add(params) {
      const result = await SpuImages.create(params)
      return result
    }

    static async edit(params) {
      const { id } = params
      const result = await SpuImages.update(params, { where: { id } })
      return result
    }

    static async delete(params) {
      const result = await SpuImages.destroy({ where: params })
      return result
    }
  }
}
