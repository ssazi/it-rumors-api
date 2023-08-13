// 属性表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, JSONB } = Sequelize
    await queryInterface.createTable('attribute', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: '属性id' },
      aid: { type: INTEGER, comment: '关联商品id' },
      title: { type: STRING, allowNull: false, comment: '属性名称' },
      value: { type: JSONB, comment: '属性值' } // [{ value: '白色', img_url: '' }]
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('attribute')
  }
}
