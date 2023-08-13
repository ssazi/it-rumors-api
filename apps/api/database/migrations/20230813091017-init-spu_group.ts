// 规格分组表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, SMALLINT } = Sequelize
    await queryInterface.createTable('spu_group', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '分组id' },
      cid: { type: SMALLINT, comment: '分类id' },
      title: { type: STRING, allowNull: false, comment: '分组名称' },
      desc: { type: STRING, comment: '描述' },
      sort: { type: SMALLINT, comment: '排序' },
      icon: { type: STRING, comment: '图标' }
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('spu_group')
  }
}
