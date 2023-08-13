// SKU
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, JSONB, DECIMAL } = Sequelize
    await queryInterface.createTable('sku_info', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: 'id' },
      aid: { type: INTEGER, comment: '商品id' },
      title: { type: STRING, comment: '标题' },
      price: { type: DECIMAL(18, 4), comment: '价格' },
      shop_price: { type: JSONB, defaultValue: [], comment: '电商价' }, // 如：[{jd:300}, {taobao:200}]
      stock: { type: INTEGER, defaultValue: 0, comment: '库存' }
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('sku_info')
  }
}
