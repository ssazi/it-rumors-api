import { DefaultFooter } from '@ant-design/pro-components'

export default () => {
  const currentYear = new Date().getFullYear()
  return <DefaultFooter copyright={`${currentYear} IT传闻`} links={[]} />
}
