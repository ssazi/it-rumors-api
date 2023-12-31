import type { Application, IBoot } from 'egg'
import 'module-alias/register'

// 声明周期
export default class AppBoot implements IBoot {
  private readonly app: Application

  constructor(app: Application) {
    this.app = app
  }

  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
  }

  configDidLoad() {
    // Config, plugin files have loaded.
  }

  async didLoad() {
    // All files have loaded, start plugin here.
  }

  async willReady() {
    // All plugins have started, can do some thing before app ready.
    // 设置 room
    const room = await this.app.redis.get('room:demo')
    if (!room)
      await this.app.redis.set('room:demo', 'demo')
  }

  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
  }

  async serverDidReady() {
    // Server is listening.
  }

  async beforeClose() {
    // Do some thing before app close.
  }
}
