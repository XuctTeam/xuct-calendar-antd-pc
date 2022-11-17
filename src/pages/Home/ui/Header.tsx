/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 16:56:52
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-17 18:18:06
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\ui\Header.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FC } from 'react'
import { Header } from 'antd/lib/layout/layout'

import HeaderDropdown from '@/components/HeaderDropdown'
import { Avatar, Image, Menu } from 'antd'
import { useModel } from 'umi'

const HeaderContainer: FC = () => {
  const { initialState } = useModel('@@initialState')
  const { member } = initialState?.currentUser || { avatar: 'https://joeschmoe.io/api/v1/random' }

  const menuHeaderDropdown = (
    <Menu selectedKeys={[]}>
      <Menu.Item key='center'>个人中心</Menu.Item>
      <Menu.Item key='settings'>个人设置</Menu.Item>
      <Menu.Divider />
      <Menu.Item key='logout'>退出登录</Menu.Item>
    </Menu>
  )

  return (
    <Header>
      <div>123123</div>
      <div className='ant-layout-header-actions-avatar'>
        <HeaderDropdown overlay={menuHeaderDropdown}>
          <div className='avatar'>
            <Avatar src={member?.avatar} />
            <span>我的啊哈哈哈哈</span>
          </div>
        </HeaderDropdown>
      </div>
    </Header>
  )
}

export default HeaderContainer
