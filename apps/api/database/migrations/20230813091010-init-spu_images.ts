// spu 图片表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, SMALLINT, BOOLEAN } = Sequelize
    await queryInterface.createTable('spu_images', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: 'id' },
      aid: { type: SMALLINT, comment: '关联spu_id' },
      name: { type: STRING, comment: '图片名' },
      url: { type: STRING, comment: '图片' },
      sort: { type: SMALLINT, comment: '顺序' },
      is_default: { type: BOOLEAN, defaultValue: false, comment: '是否默认图（false否 true是）' },
      is_slide: { type: BOOLEAN, defaultValue: false, comment: '是否轮播图（false否 true是）' }
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('spu_images')
  }
}
