/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 08:34:15
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-18 16:07:35
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { Layout } from 'antd'
import { Header, Center } from './ui'
import style from './index.less'

export default function HomePage() {
  return (
    <Layout className={`${style.page}`} style={{}}>
      <Header />
      <Center />
    </Layout>
  )
}
