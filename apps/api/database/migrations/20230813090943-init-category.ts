// 分类表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, SMALLINT, BOOLEAN } = Sequelize
    await queryInterface.createTable('category', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '分类id' },
      pid: { type: SMALLINT, comment: '父类ID' },
      name: { type: STRING, allowNull: false, comment: '分类名称' },
      level: { type: SMALLINT, comment: '层级' },
      sort: { type: SMALLINT, comment: '排序' },
      dir: { type: STRING(90), allowNull: false, comment: '目录' },
      icon: { type: STRING, comment: '图标' },
      seo_title: { type: STRING, comment: '标题' },
      seo_keywords: { type: STRING, comment: '关键词' },
      seo_description: { type: STRING, comment: '简介' },
      show: { type: BOOLEAN, defaultValue: false, comment: 'false 不显示，1显示' }
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('category')
  }
}
