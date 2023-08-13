// type 的枚举值 类型:follow关注|score评分|evaluate评价|add添加|update更新|想看wish|看过seen|在看do|搁置on_hold|抛弃dropped
export enum FeedType {
  follow = '关注',
  score = '评分',
  evaluate = '评价',
  add = '添加了',
  update = '更新了',
  wish = '想看',
  seen = '看过',
  do = '在看',
  on_hold = '搁置',
  dropped = '抛弃',
  add_friend = '将', // 加好友
  feed = '说', // 动态
  up = '赞了',
  down = '踩了',
  comment = '评论了',
  reply = '回复了',
  share = '分享了',
  bookmark = '加入书签',
  favourite = '收藏了',
  forward = '转发了',
  delete = '删除'
}

// 用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除
export const statusType = {
  normal: { text: '正常', status: 'Success' },
  disable: { text: '禁用', status: 'Error' },
  check: { text: '审核', status: 'Processing' },
  reject: { text: '拒绝', status: 'Warning' },
  ignore: { text: '忽略', status: 'Warning' },
  delete: { text: '删除', status: 'Default' }
}

export enum feedTypeBig {
  FOLLOW = 'follow', // 关注
  SCORE = 'score', // 评分
  EVALUATE = 'evaluate', // 评价
  ADD = 'add', // 添加
  UPDATE = 'update', // 更新
  SEEN = 'seen', // 看过
  WISH = 'wish', // 想看
  DO = 'do', // 在看
  ONHOLD = 'on_hold', // 搁置
  DROPPEND = 'dropped', // 抛弃
  UP = 'up', // 赞
  FAVOURITE = 'favourite', // 收藏
  COMMENT = 'comment', // 评论
  FORWARD = 'forward', // 转发
  FEED = 'feed', // 动态
  BOOKMARK = 'bookmark', // 书签
  ADD_FRIEND = 'add_friend', // 加好友
  REPLY = 'reply', // 回复
  SHARE = 'share', // 分享
  DOWN = 'down', // 踩
  SEASON = 'season', // 季
}

/* 模型sid */
export enum modelName {
  SPU = 1, // 产品
  NEWS, // 新闻
  FAVOURITE, // 喜欢
  TAG, // 标签
  PIN, // 动态
  FORWARD, // 转发
  COMMENT, // 评论表
  REPLY, // 评论回复表
  FEED, // 关联动态表
  TOPIC, // 话题表
  USER, // 用户
  BOOKMARK, // 书签
  CHANGES, // 修改历史
}

export const sidName = {
  [modelName.SPU]: 'spu',
  [modelName.NEWS]: 'news',
  [modelName.FAVOURITE]: 'favourite',
  [modelName.TAG]: 'tag',
  [modelName.PIN]: 'pin',
  [modelName.FORWARD]: 'forward',
  [modelName.COMMENT]: 'comment',
  [modelName.REPLY]: 'reply',
  [modelName.FEED]: 'feed',
  [modelName.TOPIC]: 'topic',
  [modelName.BOOKMARK]: 'bookmark',
  [modelName.USER]: 'user',
  [modelName.CHANGES]: 'changes'
}
// 模型sid英文名
export const modelEnName = {
  [modelName.SPU]: 'spu',
  [modelName.NEWS]: 'News',
  [modelName.FAVOURITE]: 'favourite',
  [modelName.TAG]: 'Tag',
  [modelName.PIN]: 'Pins',
  [modelName.FORWARD]: 'Forward',
  [modelName.REPLY]: 'Reply',
  [modelName.FEED]: 'Feed',
  [modelName.TOPIC]: 'Topic',
  [modelName.USER]: 'User',
  [modelName.BOOKMARK]: 'Bookmark',
  [modelName.CHANGES]: 'Changes'
}

export const modelType = {
  [modelName.SPU]: '产品',
  [modelName.NEWS]: '新闻',
  [modelName.FAVOURITE]: '评分',
  [modelName.TAG]: '标签',
  [modelName.PIN]: '动态',
  [modelName.FORWARD]: '转发',
  [modelName.COMMENT]: '评论',
  [modelName.REPLY]: '回复',
  [modelName.FEED]: '动态',
  [modelName.TOPIC]: '话题',
  [modelName.USER]: '用户',
  [modelName.BOOKMARK]: '书签',
  [modelName.CHANGES]: '历史'
} as { [key: number]: string }

export enum feedType {
  FOLLOW = 'follow', // 关注
  SCORE = 'score', // 评分
  EVALUATE = 'evaluate', // 评价
  ADD = 'add', // 添加
  UPDATE = 'update', // 更新
  SEEN = 'seen', // 看过
  WISH = 'wish', // 想看
  DO = 'do', // 在看
  ONHOLD = 'on_hold', // 搁置
  DROPPEND = 'dropped', // 抛弃
  UP = 'up', // 赞
  FAVOURITE = 'favourite', // 喜欢
  BOOKMARK = 'bookmark', // 书签
  COMMENT = 'comment', // 评论
  FORWARD = 'forward', // 转发
  FEED = 'feed', // 动态
  REPLY = 'reply', // 回复
  ADD_FRIEND = 'add_friend', // 加好友
  DELETE = 'delete'
}
