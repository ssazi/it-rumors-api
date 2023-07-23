// 剧集表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, NOW, TEXT, NULL, JSONB, SMALLINT, BOOLEAN } = Sequelize
    await queryInterface.createTable('product', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '自增id' },
      cid: { type: STRING, allowNull: false, comment: '分类id' },
      sid: { type: SMALLINT, defaultValue: 1, comment: '模型ID' },
      uid: { type: INTEGER, allowNull: false, comment: '用户id' },
      name: { type: STRING, allowNull: false, comment: '原名' },
      year: { type: STRING(4), comment: '年份' }, // 如 2007
      time: { type: STRING(30), comment: '发布时间' }, // 如 2007-01-01
      tag: { type: STRING, comment: '标签' },
      soc: { type: STRING, comment: 'cpu型号' },
      price: { type: INTEGER, comment: '价格' },
      screen_size: { type: INTEGER, comment: '屏幕尺寸' },
      screen_type: { type: INTEGER, comment: '屏幕类型' },
      screen_refresh_rate: { type: INTEGER, comment: '屏幕刷新率' },
      display_size: { type: STRING, comment: '屏幕分辨率' },
      rom: { type: INTEGER, comment: 'rom容易' },
      ram: { type: INTEGER, comment: 'ram容易' },
      front_camera: { type: INTEGER, comment: '前置摄像头' },
      rear_camera: { type: INTEGER, comment: '前置摄像头' },
      battery: { type: INTEGER, comment: '电池容量' },
      backdrop: { type: INTEGER, comment: '背景' },
      cover: { type: INTEGER, comment: '封面' },
      website: { type: STRING, comment: '官网' },
      company: { type: INTEGER, comment: '关联公司ID' },
      remark: { type: STRING, comment: '简评' },
      content: { type: TEXT, comment: '简介' },
      info: { type: JSONB, defaultValue: [], comment: '更多信息' },
      is_publish: { type: BOOLEAN, defaultValue: false, comment: '是否发布' },
      locks: { type: STRING(1000), comment: '锁定字段列表' },
      up: { type: INTEGER, defaultValue: 0, comment: '顶' },
      down: { type: INTEGER, defaultValue: 0, comment: '踩' },
      letter: { type: STRING(2), allowNull: false, comment: '首字母' },
      letters: { type: STRING, allowNull: false, comment: '拼音' },
      ip: { type: INTEGER, defaultValue: 0, comment: 'IP' },
      comment_count: { type: INTEGER, defaultValue: 0, comment: '评论数' },
      forward_count: { type: INTEGER, defaultValue: 0, comment: '转发数' },
      favourite_count: { type: INTEGER, defaultValue: 0, comment: '喜欢数' },
      bookmark_count: { type: INTEGER, defaultValue: 0, comment: '收藏数' },
      share_count: { type: INTEGER, defaultValue: 0, comment: '分享数' },
      status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' },
      hits: { type: INTEGER, defaultValue: 0, comment: '总' },
      hits_day: { type: INTEGER, defaultValue: 0, comment: '日' },
      hits_week: { type: INTEGER, defaultValue: 0, comment: '周' },
      hits_month: { type: INTEGER, defaultValue: 0, comment: '月' },
      hits_lasttime: { type: DATE, defaultValue: NOW, comment: '热度更新时间' },
      created_at: { type: DATE, defaultValue: NOW, comment: '创建时间' },
      updated_at: { type: DATE, defaultValue: NOW, comment: '更新时间' },
      deleted_at: { type: DATE, defaultValue: NULL, comment: '删除时间' }
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('product')
  }
}
