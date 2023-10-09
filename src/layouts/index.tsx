/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 08:34:15
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-10-09 11:30:39
 * @FilePath: \xuct-calendar-antd-pc\src\layouts\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { Header } from '@/layouts/components'
import { Layout as PageLayout } from 'antd'
import { Outlet } from 'umi'
import styles from './index.less'

const Layout: React.FC = () => {
  return (
    <PageLayout className={`${styles.layout}`}>
      <Header />
      <Outlet />
    </PageLayout>
  )
}

export default Layout
