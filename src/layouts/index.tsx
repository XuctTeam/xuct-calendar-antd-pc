/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 08:34:15
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-17 09:28:49
 * @FilePath: \xuct-calendar-antd-pc\src\layouts\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FC } from 'react'
import { Link, Outlet, useModel, history, Navigate } from 'umi'
import styles from './index.less'

const loginPath = '/user/login'

const Layout: FC = () => {
  const { initialState } = useModel('@@initialState')
  const { location } = history

  if (!initialState?.currentUser && location.pathname !== loginPath) return <Navigate to='/user/login' />

  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/docs'>Docs</Link>
        </li>
        <li>
          <a href='https://github.com/umijs/umi'>Github</a>
        </li>
      </ul>
      <Outlet />
    </div>
  )
}

export default Layout
