export default [
  { path: '/', redirect: '/welcome' },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  {
    path: '/content',
    name: '内容',
    icon: 'ReadOutlined',
    access: 'canAdmin',
    routes: [
      { path: '/content', redirect: '/content/spu' },
      {
        path: '/content/spu',
        name: '产品列表',
        component: './Content/Spu',
        parentKeys: ['/content/spu']
      },
      {
        path: '/content/feed',
        name: '动态列表',
        component: './Content/Feed',
        parentKeys: ['/content/feed']
      },
      {
        path: '/content/comment',
        name: '评论列表',
        component: './Content/Comment',
        parentKeys: ['/content/comment']
      },
      {
        path: '/content/tag',
        name: '标签列表',
        component: './Content/Tag',
        parentKeys: ['/content/tag']
      },
      {
        path: '/content/attachment',
        name: '附件列表',
        component: './Content/Attachment',
        parentKeys: ['/content/attachment']
      },
      {
        path: '/content/pin',
        name: '微博列表',
        component: './Content/Pin',
        parentKeys: ['/content/pin']
      },
      {
        path: '/content/topic',
        name: '话题列表',
        component: './Content/Topic',
        parentKeys: ['/content/topic']
      }
    ]
  },
  {
    path: '/config',
    name: '配置',
    icon: 'setting',
    access: 'canAdmin',
    routes: [
      { path: '/config', redirect: '/config/list' },
      {
        path: '/config/list',
        name: '配置列表',
        icon: 'smile',
        component: './Config/List'
      },
      {
        path: '/config/brand',
        name: '品牌列表',
        component: './Config/Brand',
        parentKeys: ['/config/brand']
      },
      {
        path: '/config/category',
        name: '分类列表',
        component: './Config/Category',
        parentKeys: ['/config/category']
      }
    ]
  },
  {
    path: '/user',
    name: '用户',
    icon: 'user',
    access: 'canAdmin',
    routes: [
      { path: '/user', redirect: '/user/list' },
      {
        path: '/user/list',
        name: '用户管理',
        component: './User/List',
        parentKeys: ['/user/list']
      }
    ]
  },
  { hideInMenu: true, path: '/login', layout: false, name: '登录', component: './User/Login' },
  { path: '*', layout: false, component: './404' }
]
