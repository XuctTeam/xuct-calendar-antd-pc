/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 08:34:15
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-25 17:09:37
 * @FilePath: \xuct-calendar-antd-pc\src\layouts\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { useState } from 'react'
import { Outlet } from 'umi'
import { Header, Loading } from '@/layouts/components'
import { Layout as PageLoayout } from 'antd'
import styles from './index.less'

const Layout: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  return (
    <>
      <PageLoayout className={`${styles.layout}`}>
        <Header setLoading={setLoading} />
        <Outlet />
      </PageLoayout>
      <Loading loading={loading}></Loading>
    </>
  )
}

export default Layout
