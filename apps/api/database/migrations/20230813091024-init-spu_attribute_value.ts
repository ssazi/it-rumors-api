// SPU基本属性
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, SMALLINT, BOOLEAN } = Sequelize
    await queryInterface.createTable('spu_attribute_value', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true, comment: 'id' },
      aid: { type: INTEGER, comment: '商品id' },
      gid: { type: INTEGER, comment: 'spu分组' },
      name: { type: STRING, comment: '属性名' },
      value: { type: STRING, comment: '属性值' },
      sort: { type: SMALLINT, comment: '顺序' },
      is_show: { type: BOOLEAN, defaultValue: false, comment: '是否展示在标题上【false-否 true-是】' },
      is_search: { type: BOOLEAN, defaultValue: false, comment: '是否搜索【false-否 true-是】' }
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('spu_attribute_value')
  }
}
