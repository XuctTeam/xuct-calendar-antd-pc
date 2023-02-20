import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'

export default function index() {
  return (
    <Layout>
      <Sider>Sider</Sider>
      <Content>Content</Content>
    </Layout>
  )
}
