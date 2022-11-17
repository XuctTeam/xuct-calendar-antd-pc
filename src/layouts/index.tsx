/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 08:34:15
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-17 15:30:11
 * @FilePath: \xuct-calendar-antd-pc\src\layouts\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FC } from 'react'
import { Outlet, useModel, history, Navigate } from 'umi'

const loginPath = '/user/login'

const Layout: FC = () => {
  const { initialState } = useModel('@@initialState')
  const { location } = history

  if (!initialState?.currentUser && location.pathname !== loginPath) return <Navigate to='/user/login' />

  return <Outlet />
}

export default Layout
