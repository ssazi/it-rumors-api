// 用户统计表
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER } = Sequelize
    await queryInterface.createTable('user_stat', {
      id: { autoIncrement: true, type: INTEGER, allowNull: false, primaryKey: true },
      uid: { type: INTEGER, allowNull: false, comment: '用户ID' },
      like_user_count: { type: INTEGER, defaultValue: 0, comment: '用户点赞数' },
      like_comment_count: { type: INTEGER, defaultValue: 0, comment: '评论点赞数' },
      dislike_user_count: { type: INTEGER, defaultValue: 0, comment: '用户点踩数' },
      dislike_comment_count: { type: INTEGER, defaultValue: 0, comment: '评论点踩数' },
      follow_user_count: { type: INTEGER, defaultValue: 0, comment: '用户关注数' },
      follow_comment_count: { type: INTEGER, defaultValue: 0, comment: '评论关注数' }
    })
  },

  down: async queryInterface => {
    await queryInterface.dropTable('user_stat')
  }
}
