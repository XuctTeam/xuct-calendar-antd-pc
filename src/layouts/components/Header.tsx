/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 16:56:52
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-13 09:30:07
 * @FilePath: \xuct-calendar-antd-pc\src\layouts\components\Header.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FC, useEffect, useState } from 'react'
import { Header } from 'antd/lib/layout/layout'
import { Menu, Space } from 'antd'
import AvatarDropdown from './AvatarDropdown'
import { FormattedMessage, history } from 'umi'
import { HomeOutlined, SettingOutlined, UsergroupDeleteOutlined } from '@ant-design/icons'
import styles from './header.less'

interface IPageOption {
  setLoading: (loading: boolean) => void
}

const HeaderContainer: FC<IPageOption> = (props) => {
  const { setLoading } = props
  const [menuKey, setMenuKey] = useState<string[]>(['home'])

  useEffect(() => {
    const { pathname } = history.location
    if (pathname.includes('account')) {
      setMenuKey(['center'])
    }
  }, [])

  const menuClick = (item: any) => {
    const { key } = item
    let pathname = '/home'
    switch (key) {
      case 'center':
        pathname = '/account'
        break
    }
    setMenuKey([key])
    history.push({
      pathname
    })
  }

  return (
    <Header className={styles.header}>
      <div className='logo'>123123</div>
      <div className={styles.right}>
        <Space>
          <div className={styles.menu}>
            <SettingOutlined />
          </div>
          <AvatarDropdown menu setLoading={setLoading} />
        </Space>
        {/* <Menu
          theme='dark'
          mode='horizontal'
          selectedKeys={menuKey}
          items={[
            {
              icon: <HomeOutlined />,
              label: <FormattedMessage id='component.globalHeader.menu.home' />,
              key: 'home'
            }, // 菜单项务必填写 key
            { icon: <UsergroupDeleteOutlined />, label: <FormattedMessage id='component.globalHeader.menu.group' />, key: 'group' },
            { icon: <SettingOutlined />, label: <FormattedMessage id='component.globalHeader.menu.person' />, key: 'center' }
          ]}
          onClick={menuClick}
        /> */}
      </div>
    </Header>
  )
}

export default HeaderContainer
