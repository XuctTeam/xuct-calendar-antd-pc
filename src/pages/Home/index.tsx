/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 08:34:15
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-17 18:02:43
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { Layout } from 'antd'
import { Content, Footer } from 'antd/lib/layout/layout'
import { Header } from './ui'
import './index.less'

export default function HomePage() {
  return (
    <Layout className='page-home-index' style={{}}>
      <Header />
      <Content>sdfsdfsdf</Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}
