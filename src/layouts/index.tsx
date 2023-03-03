/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 08:34:15
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-03-03 16:27:12
 * @FilePath: \xuct-calendar-antd-pc\src\layouts\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { Header } from '@/layouts/components'
import { Layout as PageLoayout } from 'antd'
import { Outlet } from 'umi'
import styles from './index.less'

const Layout: React.FC = () => {
  return (
    <PageLoayout className={`${styles.layout}`}>
      <Header />
      <Outlet />
    </PageLoayout>
  )
}

export default Layout
