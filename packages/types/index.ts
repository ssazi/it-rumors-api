import { FeedType, feedType, feedTypeBig, modelEnName, modelName, modelType, sidName, statusType } from './enum'

export { FeedType, statusType, feedTypeBig, modelName, sidName, modelEnName, modelType, feedType }

export interface IDate {
  // 创建时间
  readonly created_at?: string
  // 修改时间
  readonly updated_at?: string
  // 删除时间
  readonly deleted_at?: string
}

export interface IPages {
  current?: number
  pageSize?: number
  total?: number
}

export interface IHits {
  hits?: number
  hits_day?: number
  hits_week?: number
  hits_month?: number
  hits_lasttime?: string
}

export interface IId {
  id?: number
  cid?: number | number[]
  uid?: number
  sid?: modelName
  aid?: number
  status?: string
}

export interface IUser extends IDate {
  id: number
  username: string
  password?: string
  pay_password: string
  avatar: number
  banner: number
  email: string
  mobile: string
  realname: string
  identity: string
  birthday: string
  nickname: string
  salt: string
  amount: number
  sex: number
  admin?: number
  score: number
  login: number
  email_confirmed: number
  mobile_confirmed: number
  is_remind: number
  is_station: number
  register_ip: number
  last_login_ip: number
  update_ip: number
  status: number
  forget_at: string
  login_at: string
  avatar_at: string
  joined_at: string
  token?: string
  avatar_path?: { file_path: string }
  banner_path?: { file_path: string }
}

export interface IFeed extends IHits, IDate, Omit<IId, 'cid'> {
  type: 'follow' | 'score' | 'evaluate' | 'add' | 'update' | 'wish' | 'seen' | 'do' | 'on_hold' | 'dropped' | 'add_friend' | 'feed' // 类型:follow关注|score评分|evaluate评价|add添加|update更新|想看wish|看过seen|在看do|搁置on_hold|抛弃dropped|add_friend加好友|feed动态
  ip: number
  expired_at: string
  comment_count: number
  up: number
  down: number
  forward_count: number
  bookmark_count: number
  time: string
  spu?: ISpu
  user?: IUser
  topic?: ITopic
  pin?: IPin
  favourite?: IFavourite
}

export interface ICategory extends Omit<IId, 'uid' | 'aid' | 'cid'> {
  sort?: number
  pid?: string | number
  name?: string
  dir?: string
  icon?: string
  show?: boolean
  level?: number
  seo_title?: string
  seo_keywords?: string
  seo_description?: string
}

export interface IAttribute extends Omit<IId, 'uid' | 'cid'> {
  title?: string
  value?: { value: string; img_url: string }[]
}

export interface IBrand extends Omit<IId, 'uid' | 'aid' | 'cid'> {
  sort?: number
  name?: string
  dir?: string
  icon?: string
  show?: boolean
  letter?: string
  desc?: string
}

export interface ISpu extends IHits, IDate, Omit<IId, 'aid'> {
  bid?: number
  name?: string
  desc?: string
  tag?: string
  cover?: string
  content?: string
  letter?: string
  letters?: string
  up?: number
  down?: number
  comment_count?: number
  favourite_count?: number
  bookmark_count?: number
  forward_count?: number
  share_count?: number
}

export interface ISpuImages extends Omit<IId, 'uid' | 'cid'> {
  name?: string
  url?: string
  sort?: number
  is_default?: boolean
  is_slide?: boolean
}

export interface ISpuGroup extends Omit<IId, 'uid' | 'aid'> {
  title?: string
  desc?: string
  sort?: number
  icon?: string
}

export interface ISpuAttributeValue extends Omit<IId, 'uid' | 'cid'> {
  attr_id?: number
  attr_name?: string
  gid?: number
  attr_value?: string
  attr_sort?: number
  is_show?: boolean
  is_search?: boolean
}

export interface ISku extends Omit<IId, 'uid' | 'cid'> {
  title?: string
  price?: number
  shop_price?: { [key: string]: number }
  stock?: number
}

export interface IAttachment extends IDate, Omit<IId, 'cid'> {
  md5?: string
  file_path?: string
  file_name?: string
  file_type?: string
  file_size?: number
  file_width?: number
  file_height?: number
  is_remote?: boolean
  ip?: number
  spu?: ISpu
  user?: IUser
  topic?: ITopic
  company?: ICompany
}

export interface ISetting {
  id?: number | string
  key?: string
  value?: string
  tag?: string
}

export interface IFavourite extends IDate, IId, IHits {
  tags: string
  content: string
  ip: number
  tsid: number
  rating: number
  interest: number
}

export interface IBookmark extends IDate, IId {
  tsid: number
  tags: string
  content: string
  ip: number
}

export interface IUserFollow extends IDate {
  id: number
  uid: number
  tuid: number
  ip: number
  note: string
  status: string
  is_mutual: boolean
}

export interface ITag extends IDate {
  id?: number
  name: string
  aid: number
  sid: number
}

export interface INews extends IDate, IHits, Omit<IId, 'aid' | 'sid'> {
  name: string
  title: string
  tag: string
  color: string
  bg_color: string
  time: string
  cover: number
  banner: string
  inputer: string
  jumpurl: string
  letter: string
  letters: string
  seo_title: string
  seo_keywords: string
  seo_description: string
  summary: string
  content: string
  stars: number
  up: number
  down: number
  gold: number
  is_sticky: number
  poster?: { file_path: string } // 封面
}

export interface IComments extends IDate, Omit<IId, 'cid'> {
  content: string
  device: string
  up: number
  down: number
  reply_count: number
  is_sticky: number
  spu?: ISpu
  user?: IUser
  pin?: IPin
}

export interface IReply extends IDate, Omit<IId, 'cid' | 'sid'> {
  reply_uid: number
  content: string
  up: number
  down: number
  device: string
  is_sticky: number
}

export interface IForward extends IDate, IHits, IId {
  content: string
  ip: number
}

export interface IPin extends IDate, IHits, IId {
  tid: number
  content: string
  ip: number
  comment_count: number
  favourite_count: number
  forward_count: number
  bookmark_count: number
  spu?: ISpu
  user?: IUser
  topic?: ITopic
}

export interface ITopic extends IDate, IHits, Omit<IId, 'aid'> {
  name: string
  dir: string
  pin_count: number
  follow_count: number
  icon: string
  summary: string
  user?: IUser
  icon_path?: { file_path: string }
}

export interface ILog extends Omit<IDate, 'updated_at'> {
  id: number
  type: string
  referer: string
  author: string
  ip: number
}

export interface IDigg extends Omit<IDate, 'updated_at'>, Omit<IId, 'status' | 'cid'> {
  type: 'up' | 'down'
  ip?: number
}

export interface ICaptcha {
  token: string
  image: string
}

export interface ISts {
  credentials: {
    sessionToken: string
    tmpSecretId: string
    tmpSecretKey: string
  }
  startTime: number
  expiredTime: number
  region: string
  bucket: string
}

export interface ICompany {
  id?: number
  sid?: number
  name?: string // 名字
  address?: string // 地址
  website?: string // 网站
  logo?: number // logo
  country?: string // 国家
  content?: string // 简介
  status?: string // 用户状态:normal 正常 disable 禁用 check 审核中 reject 拒绝 ignore 忽略 delete 删除
  poster?: { file_path: string } // 海报
}

export interface IChanges extends IDate, Omit<IId, 'cid'> {
  field?: string // 字段
  before?: string // 之前
  after?: string // 之后
  ip?: number // ip
  user?: IUser
}

export interface UserLogin {
  server: string
  token?: string
  vapidKey?: string
}

export interface IResponse {
  status: number
  message: string
}

export interface IPage {
  // query
  /** 当前的页码 */
  current?: number
  /** 页面的容量 */
  pageSize?: number
}

export interface PageResult<T = any> extends IResponse {
  data: T
}

export interface IDataListResponse<T> {
  list?: T[]
  current: number | string
  pageSize: number | string
  total: number
}

export interface IListResponse<T> extends IResponse {
  data?: IDataListResponse<T>
}
