/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 08:34:15
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-30 20:54:19
 * @FilePath: \xuct-calendar-antd-pc\src\layouts\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { Outlet } from 'umi'
import { Header } from '@/layouts/components'
import { Layout as PageLoayout } from 'antd'
import styles from './index.less'
import Loading from '@/components/Loading/Loading'
import { useState } from 'react'

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
