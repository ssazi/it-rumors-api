// 修改历史
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, NOW, STRING, TEXT, NULL, SMALLINT } = Sequelize
    await queryInterface.createTable('changes', {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true },
      sid: { type: SMALLINT, defaultValue: 21, comment: '模型ID' },
      uid: { type: INTEGER, allowNull: false, comment: '用户ID' },
      aid: { type: INTEGER, allowNull: false, comment: '关联ID' },
      field: { type: STRING, allowNull: false, comment: '字段' },
      before: { type: TEXT, allowNull: false, comment: '记录内容 - 变更前' },
      after: { type: TEXT, allowNull: false, comment: '记录内容 - 变更后' },
      ip: { type: INTEGER, defaultValue: 0, comment: 'IP' },
      status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' },
      created_at: { type: DATE, defaultValue: NOW, comment: '创建时间' },
      updated_at: { type: DATE, defaultValue: NOW, comment: '更新时间' },
      deleted_at: { type: DATE, defaultValue: NULL, comment: '删除时间' }
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('changes')
  }
}
