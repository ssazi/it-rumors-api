import type { Application, Context } from 'egg'
import dayjs from 'dayjs'
import type { ICondition, IParams } from '../typings'
import type { SpuType } from '../schema/spu'
import spu from '../schema/spu'

export default (app: Context & Application) => {
  // 获取数据类型
  const { Sequelize, model } = app
  const { Op } = Sequelize
  const Spu = spu(app)

  return class extends Spu<SpuType> {
    /**
     * 写入前置操作
     * @param params IProduct
     */
    static async addBefore(params) {
      const { id, tag } = params
      await model.Tag.add({ aid: id, sid: 1, tag })
    }

    /**
     * 添加
     * @param params IProduct
     * @return {IProduct} IProduct
     */
    static async add(params) {
      const result = await Spu.create(params)
      await this.addBefore({ ...params, id: result.id })
      return result
    }

    // 添加多条
    static async adds(params) {
      const result = await Spu.bulkCreate(params)
      return result
    }

    /**
     * 更新
     * @param params IProduct
     * @return {IProduct} id
     */
    static async edit(params) {
      const { id } = params
      await this.addBefore({ ...params })
      const result = await Spu.update(params, { where: { id }, silent: !!params.silent })
      return result
    }

    // 删除
    static async delete(params) {
      const { id } = params
      const result = await Spu.destroy({ where: { id } })
      if (result) {
        const param: object = { where: { id, sid: 1 } }
        model.Tag.destroy(param)
      }
      return result
    }

    /**
     * 查询剧集分页列表
     * @param params {object} { attributes, pageSize, current, filter } - 条件 filter {"letter":"c"}
     * @return {object|null} - 查找结果
     */
    static async query(params: IParams<string>) {
      const { attributes, pageSize = 10, current = 1, filter = '{}', order = 'DESC', orderBy = 'updated_at' } = params
      const { wd, ids, not, letter, cid, names, year, is_publish, hits, up, down, created_at, day, tag } = JSON.parse(filter)
      const condition: ICondition = {
        attributes,
        order: [[orderBy, order]],
        offset: pageSize * (current - 1),
        limit: +pageSize
      }

      const where: { [key: string | symbol]: any } = {}

      if (wd) {
        where[Op.or] = [
          { name: { [Op.like]: `%%${wd}%%` } },
          { letters: { [Op.like]: `%%${wd}%%` } },
          { tag: { [Op.like]: `%%${wd}%%` } }
        ]
      }

      if (ids)
        where.id = ids.split(',')

      if (not) {
        where.id = {
          [Op.not]: not
        }
      }

      if (letter)
        where.letter = letter.split(',')

      if (cid)
        where.cid = cid.split(',')

      if (names)
        where.name = names.split(',')

      if (year)
        where.year = year.split(',')

      if (is_publish)
        where.is_publish = is_publish

      if (hits) {
        const arr = hits.split(',')
        if (arr.length > 1) {
          where.hits = {
            [Op.between]: [arr[0], arr[1]]
          }
        }
        else {
          where.hits = {
            [Op.gt]: arr[0]
          }
        }
      }

      if (up) {
        const arr = up.split(',')
        if (arr.length > 1) {
          where.up = {
            [Op.between]: [arr[0], arr[1]]
          }
        }
        else {
          where.up = {
            [Op.gt]: arr[0]
          }
        }
      }

      if (down) {
        const arr = down.split(',')
        if (arr.length > 1) {
          where.down = {
            [Op.between]: [arr[0], arr[1]]
          }
        }
        else {
          where.down = {
            [Op.gt]: arr[0]
          }
        }
      }

      if (created_at) {
        const arr = created_at.split(',')
        const getTime = time => new Date(time).getTime()
        if (arr.length > 1) {
          where.created_at = {
            [Op.between]: [getTime(arr[0]), getTime(arr[1])]
          }
        }
        else {
          where.created_at = {
            [Op.gt]: getTime(arr[0])
          }
        }
      }

      if (day) {
        where.created_at = {
          [Op.gt]: dayjs().subtract(day, 'day').valueOf()
        }
      }

      if (tag) {
        const param: ICondition = { attributes: ['aid'], where: { name: tag, sid: 1 } }
        const res = await model.Tag.queryAll(param)
        let ids = res.map(item => item.aid)
        if (not)
          ids = ids.filter(item => item !== not)

        where.id = ids
      }

      condition.where = where

      const { count, rows } = await Spu.findAndCountAll(condition)

      return {
        list: rows,
        current,
        pageSize,
        total: count
      }
    }

    static async views(id) {
      const condition: ICondition = {
        attributes: ['hits'],
        where: { id, status: 'normal' }
      }
      const result = await Spu.findOne(condition)
      return result
    }

    static async getName(params) {
      const { name, id } = params
      const condition: ICondition = {
        attributes: ['name']
      }
      const where: { [key: string | symbol]: any } = { status: 'normal' }
      if (name) {
        where[Op.or] = [
          { name: { [Op.like]: `%%${name}%%` } },
          { letters: { [Op.like]: `%%${name}%%` } },
          { tag: { [Op.like]: `%%${name}%%` } }
        ]
      }
      if (id) {
        where.id = {
          [Op.not]: id
        }
      }
      condition.where = where
      const result = await Spu.findOne(condition)
      return result
    }

    static async get(params) {
      const { id, attributes } = params
      const condition: ICondition = {
        attributes,
        where: { id },
        include: [
          {
            model: model.Comments,
            as: 'comments'
          }
        ]
      }
      const result = await Spu.findOne(condition)
      return result
    }

    static associate() {
      Spu.hasMany(model.Comments, { foreignKey: 'aid', as: 'comments' })
    }
  }
}
