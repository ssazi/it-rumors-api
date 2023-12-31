import dayjs from 'dayjs'
import type { Context } from 'egg'

export default () => {
  return async function errorHandler(ctx: Context, next: () => Promise<any>) {
    try {
      await next()
    }
    catch (err: any) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx)

      const status = err.status || 500

      ctx.logger.error(`>>>${dayjs().format('YYYY-MM-DD HH:mm:ss')}:`, err.message, err.errors)
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error = (status === 500 && ctx.app.config.env === 'prod') ? '系统内部错误' : err.message

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = {
        code: ctx.ERROR_CODE,
        message: error
      }

      if (status === 422)
        ctx.body.detail = err.errors

      ctx.status = status
    }
  }
}
