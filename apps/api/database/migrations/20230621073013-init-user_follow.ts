// 用户关注表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, SMALLINT, BOOLEAN, DATE, NOW, NULL, STRING } = Sequelize
    await queryInterface.createTable('user_follow', {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true },
      sid: { type: SMALLINT, defaultValue: 24, comment: '模型ID' },
      uid: { type: INTEGER, allowNull: false, comment: '用户ID' },
      aid: { type: INTEGER, allowNull: false, comment: '关联ID' },
      note: { type: INTEGER, comment: '备注' },
      ip: { type: INTEGER, defaultValue: 0, comment: 'ip' },
      is_mutual: { type: BOOLEAN, defaultValue: false, comment: '是否互相关注' },
      status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' },
      created_at: { type: DATE, defaultValue: NOW, comment: '创建时间' },
      updated_at: { type: DATE, defaultValue: NOW, comment: '更新时间' },
      deleted_at: { type: DATE, defaultValue: NULL, comment: '删除时间' }
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('user_follow')
  }
}
