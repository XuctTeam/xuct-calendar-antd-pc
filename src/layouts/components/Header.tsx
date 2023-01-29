/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 16:56:52
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-01-29 16:34:12
 * @FilePath: \xuct-calendar-antd-pc\src\layouts\components\Header.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import AvatarDropdown from '@/components/AvatarDropdown'
import MenuDropdown from '@/components/MenuDropdown'
import { Divider } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { FC } from 'react'

import styles from './header.less'

interface IPageOption {}

const HeaderContainer: FC<IPageOption> = ({}) => {
  return (
    <Header className={styles.header}>
      <div className='logo'>12313</div>
      <div className={styles.right}>
        <MenuDropdown />
        <Divider type='vertical' style={{ height: '20px' }} />
        <AvatarDropdown menu />
      </div>
    </Header>
  )
}

export default HeaderContainer
