import type { Settings as LayoutSettings } from '@ant-design/pro-components'

const Settings: LayoutSettings & {
  pwa?: boolean
  logo?: string
  token?: any
} = {
  navTheme: 'light',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixSiderbar: true,
  colorPrimary: '#1677FF',
  splitMenus: false,
  fixedHeader: true,
  pwa: true,
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  colorWeak: false,
  title: 'IT传闻',
  iconfontUrl: '',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    // https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  }
}

export default Settings
