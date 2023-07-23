import type { Application } from 'egg'

export default (app: Application) => {
  const { router, controller, middleware, io } = app

  const auth = middleware.auth
  // const log = middleware.log

  // socket.io
  io.of('/').route('chat', io.controller.chat.ping)

  router.get('/', controller.home.index)
  router.get('/api/sts/init', controller.api.sts.init)
  router.get('/api/tool/day', controller.api.tool.day)
  router.get('/api/tool/weather', controller.api.tool.weather)

  // 用户
  router.post('/api/user/login', controller.api.user.login)
  router.post('/api/user/add', controller.api.user.add)
  router.put('/api/user/edit', auth(1), controller.api.user.add)
  router.get('/api/user/list', controller.api.user.list)
  router.get('/api/user/info', auth(1), controller.api.user.userInfo)
  router.post('/api/user/logout', controller.api.user.logout)
  router.delete('/api/user/:id', auth(1), controller.api.user.delete)
  router.post('/api/user/editPassword', controller.api.user.editPassword)
  router.post('/api/user/forgetPassword', controller.api.user.forgetPassword)
  router.post('/api/user/sendMail', controller.api.user.sendMail)
  router.get('/api/user/checkExpired', controller.api.user.checkExpired)
  router.get('/api/user/setAdmin', controller.api.user.setAdmin)
  router.get('/api/user/:id', controller.api.user.get)
  // 产品
  router.get('/api/product/list', controller.api.product.list)
  router.post('/api/product/add', auth(1), controller.api.product.add)
  router.delete('/api/product/:id', auth(1), controller.api.product.delete)
  router.get('/api/product/getName', controller.api.product.getName)
  router.get('/api/product/:id', controller.api.product.get)
  // 喜欢
  router.get('/api/favourite/:id', controller.api.favourite.get)
  router.post('/api/favourite/add', auth(1), controller.api.favourite.add)
  router.delete('/api/favourite/:id', auth(1), controller.api.favourite.delete)
  // 书签
  router.get('/api/bookmark/:id', controller.api.bookmark.get)
  router.post('/api/bookmark/add', auth(1), controller.api.bookmark.add)
  router.delete('/api/bookmark/:id', auth(1), controller.api.bookmark.delete)
  // 新闻
  router.get('/api/news/list', controller.api.news.list)
  router.get('/api/news/:id', controller.api.news.get)
  // 动态
  router.get('/api/feed/list', controller.api.feed.list)
  router.post('/api/feed/add', auth(1), controller.api.feed.add)
  router.post('/api/feed/edit', auth(1), controller.api.feed.edit)
  router.delete('/api/feed/:id', auth(1), controller.api.feed.delete)
  router.get('/api/feed/:id', controller.api.feed.get)
  // 评论
  router.get('/api/comment/list', controller.api.comments.list)
  router.post('/api/comment/add', auth(1), controller.api.comments.add)
  router.post('/api/comment/add_reply', auth(1), controller.api.comments.addReply)
  router.delete('/api/comment/:id', auth(1), controller.api.comments.delete)
  router.delete('/api/reply/:id', auth(1), controller.api.comments.delete_reply)
  router.get('/api/reply/:id/list', auth(1), controller.api.comments.listReply)
  router.get('/api/comment/:id', controller.api.comments.get)
  // tag 标签
  router.get('/api/tag/list', controller.api.tag.list)
  router.put('/api/tag/edit', auth(1), controller.api.tag.edit)
  router.delete('/api/tag/:id', auth(1), controller.api.tag.delete)
  // 验证码
  router.get('/api/captcha/init', controller.api.captcha.init)
  router.get('/api/captcha/get', controller.api.captcha.get)
  // 大分类
  router.get('/api/list/list', controller.api.list.list)
  router.post('/api/list/add', auth(1), controller.api.list.add)
  router.delete('/api/list/:id', auth(1), controller.api.list.delete)
  router.get('/api/list/:id', controller.api.list.get)
  // 日志
  router.get('/api/log/list', controller.api.log.list)
  router.delete('/api/log/:id', auth(1), controller.api.log.delete)
  router.get('/api/log/:id', controller.api.log.get)
  // 附件
  router.get('/api/attachment/list', controller.api.attachment.list)
  router.post('/api/attachment/add', auth(1), controller.api.attachment.add)
  router.get('/api/attachment/:id', auth(1), controller.api.attachment.get)

  // 点赞
  router.post('/api/digg/add', auth(1), controller.api.digg.add)
  // 记录
  router.get('/api/changes/list', controller.api.changes.list)
  router.post('/api/changes/add', auth(1), controller.api.changes.add)
  router.post('/api/changes/edit', auth(1), controller.api.changes.edit)
  router.delete('/api/changes/:id', auth(1), controller.api.changes.delete)

  // 后台接口
  // 验证码
  router.get('/backend/captcha/init', controller.api.captcha.init)
  router.get('/backend/captcha/get', controller.api.captcha.get)
  // 用户
  router.post('/backend/user/login', controller.api.user.login)
  router.post('/backend/user/add', controller.api.user.add)
  router.put('/backend/user/edit', auth(100), controller.api.user.add)
  router.get('/backend/user/list', auth(100), controller.api.user.list)
  router.get('/backend/user/info', auth(100), controller.api.user.userInfo)
  router.post('/backend/user/logout', auth(100), controller.api.user.logout)
  router.delete('/backend/user/:id', auth(100), controller.api.user.delete)
  router.get('/backend/user/:id', auth(100), controller.api.user.get)
  // 产品
  router.get('/backend/product/list', auth(100), controller.backend.product.list)
  router.post('/backend/product/add', auth(100), controller.backend.product.add)
  router.post('/backend/product/editCover', auth(100), controller.backend.product.editCover)
  router.delete('/backend/product/:id', auth(100), controller.backend.product.delete)
  router.get('/backend/product/getName', auth(100), controller.backend.product.getName)
  router.get('/backend/product/:id', auth(100), controller.backend.product.get)
  // 新闻
  router.get('/backend/news/list', auth(100), controller.backend.news.list)
  router.get('/backend/news/:id', auth(100), controller.backend.news.get)
  // 动态
  router.get('/backend/feed/list', auth(100), controller.backend.feed.list)
  router.post('/backend/feed/add', auth(100), controller.backend.feed.add)
  router.post('/backend/feed/edit', auth(100), controller.backend.feed.edit)
  router.delete('/backend/feed/:id', auth(100), controller.backend.feed.delete)
  router.get('/backend/feed/:id', auth(100), controller.backend.feed.get)
  // 话题
  router.get('/backend/topic/list', auth(100), controller.backend.topic.list)
  router.post('/backend/topic/add', auth(100), controller.backend.topic.add)
  router.delete('/backend/topic/:id', auth(100), controller.backend.topic.delete)
  router.get('/backend/topic/:id', auth(100), controller.backend.topic.get)
  // 发表动态
  router.get('/backend/pin/list', auth(100), controller.backend.pin.list)
  router.post('/backend/pin/add', auth(100), controller.backend.pin.add)
  router.delete('/backend/pin/:id', auth(100), controller.backend.pin.delete)
  router.get('/backend/pin/:id', auth(100), controller.backend.pin.get)
  // 评论
  router.get('/backend/comment/list', auth(100), controller.backend.comments.list)
  router.post('/backend/comment/add', auth(100), controller.backend.comments.add)
  router.post('/backend/comment/add_reply', auth(100), controller.backend.comments.addReply)
  router.delete('/backend/comment/:id', auth(100), controller.backend.comments.delete)
  router.get('/backend/comment/:id', auth(100), controller.backend.comments.get)
  // 获取cos的token
  router.get('/backend/sts/init', auth(100), controller.backend.sts.init)
  // tag 标签
  router.get('/backend/tag/list', auth(100), controller.backend.tag.list)
  router.put('/backend/tag/edit', auth(100), controller.backend.tag.edit)
  router.delete('/backend/tag/:id', auth(100), controller.backend.tag.delete)
  // 大分类
  router.get('/backend/list/list', auth(100), controller.backend.list.list)
  router.post('/backend/list/add', auth(100), controller.backend.list.add)
  router.delete('/backend/list/:id', auth(100), controller.backend.list.delete)
  router.get('/backend/list/:id', auth(100), controller.backend.list.get)
  // 配置
  router.get('/backend/setting/list', auth(100), controller.backend.setting.list)
  router.delete('/backend/setting/:id', auth(100), controller.backend.setting.delete)
  router.post('/backend/setting/add', auth(100), controller.backend.setting.add)
  // 附件
  router.get('/backend/attachment/list', auth(100), controller.api.attachment.list)
  router.post('/backend/attachment/add', auth(100), controller.api.attachment.add)
  router.post('/backend/attachment/edit', auth(100), controller.api.attachment.edit)
  // 公司
  router.get('/backend/company/list', auth(100), controller.backend.company.list)
  router.post('/backend/company/add', auth(100), controller.backend.company.add)
  router.post('/backend/company/adds', auth(100), controller.backend.company.adds)
  router.delete('/backend/company/:id', auth(100), controller.backend.company.delete)
  // 记录
  router.get('/backend/changes/list', auth(100), controller.api.changes.list)
  router.delete('/backend/changes/:id', auth(100), controller.api.changes.delete)
}
