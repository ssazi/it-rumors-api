// 栏目表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, SMALLINT } = Sequelize
    await queryInterface.createTable('list', {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true, comment: '自增id' },
      pid: { type: SMALLINT, defaultValue: 0, comment: '父类id' },
      sid: { type: SMALLINT, defaultValue: 0, comment: '模型id' },
      name: { type: STRING(30), allowNull: false, comment: '名字' },
      dir: { type: STRING(90), allowNull: false, comment: '目录' },
      icon: { type: STRING(50), comment: '图标' },
      seo_title: { type: STRING, comment: '标题' },
      seo_keywords: { type: STRING, comment: '关键词' },
      seo_description: { type: STRING, comment: '简介' },
      rank: { type: SMALLINT, defaultValue: 0, comment: '排序' },
      status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' }
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('list')
  }
}
