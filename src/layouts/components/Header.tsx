/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 16:56:52
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-10-09 13:39:01
 * @FilePath: \xuct-calendar-antd-pc\src\layouts\components\Header.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import AvatarDropdown from '@/components/AvatarDropdown'
import MenuDropdown from '@/components/MenuDropdown'
import { Divider, Image } from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { FC } from 'react'

import styles from './header.less'

interface IPageOption {}

const HeaderContainer: FC<IPageOption> = ({}) => {
  return (
    <Header className={styles.header}>
      <div className={styles.logo}>
        <Image preview={false} width={30} src='/logo.png' />
        <div>213123123</div>
      </div>
      <div className={styles.right}>
        <MenuDropdown />
        <Divider type='vertical' style={{ height: '20px' }} />
        <AvatarDropdown menu />
      </div>
    </Header>
  )
}

export default HeaderContainer
