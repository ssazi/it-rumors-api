// 制作公司
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, TEXT, SMALLINT } = Sequelize
    await queryInterface.createTable('company', {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true },
      sid: { type: SMALLINT, defaultValue: 22, comment: '模型ID' },
      name: { type: STRING, allowNull: false, comment: '名字' },
      address: { type: STRING, comment: '地址' },
      website: { type: STRING, comment: '网站' },
      logo: { type: INTEGER, comment: 'logo' },
      country: { type: STRING, comment: '国家' },
      content: { type: TEXT, comment: '简介' },
      status: { type: STRING(30), defaultValue: 'normal', comment: '用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除' }
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('company')
  }
}
