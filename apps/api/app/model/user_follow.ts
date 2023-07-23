import type { Application, Context } from 'egg'
import type { UserFollowType } from '../schema/user_follow'
import userFollow from '../schema/user_follow'

export default (app: Context & Application) => {
  const UserFollow = userFollow(app)

  return class extends UserFollow<UserFollowType> {}
}
