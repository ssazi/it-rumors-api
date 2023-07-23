import { LinkOutlined } from '@ant-design/icons'
import type { Settings as LayoutSettings } from '@ant-design/pro-components'
import { SettingDrawer } from '@ant-design/pro-components'
import type { RunTimeLayoutConfig } from '@umijs/max'
import { Link, history } from '@umijs/max'
import defaultSettings from '../config/defaultSettings'
import { errorConfig } from './requestErrorConfig'
import { currentUser } from './services'
import { AvatarDropdown, AvatarName, Footer, Question, SelectLang } from '@/components'

const isDev = process.env.NODE_ENV === 'development'
const loginPath = '/login'

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>
  currentUser?: API.CurrentUser
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>
}> {
  const fetchUserInfo = async () => {
    try {
      const res = await currentUser({
        skipErrorHandler: true
      })
      return res.data
    }
    catch (error) {
      history.push(loginPath)
    }
    return undefined
  }
  // 如果是登录页面，不执行
  if (window.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo()
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings
    }
  }
  return {
    fetchUserInfo,
    settings: defaultSettings
  }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    actionsRender: () => [<Question key='doc' />, <SelectLang key='SelectLang' />],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>
      }
    },
    waterMarkProps: {
      content: initialState?.currentUser?.username
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath)
        history.push(loginPath)
    },
    links: isDev
      ? [
        <Link key='openapi' target='_blank' to='/umi/plugin/openapi'>
          <LinkOutlined />
          <span>OpenAPI 文档</span>
        </Link>
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: children => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {isDev
            ? <SettingDrawer
                disableUrlParams
                enableDarkTheme
                onSettingChange={(settings: any) => {
                  setInitialState(preInitialState => ({
                    ...preInitialState,
                    settings
                  }))
                }}
                settings={initialState?.settings} />
            : null}
        </>
      )
    },
    ...initialState?.settings
  }
}

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig
}
