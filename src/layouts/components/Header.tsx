/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 16:56:52
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-29 22:22:08
 * @FilePath: \xuct-calendar-antd-pc\src\layouts\components\Header.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FC, useCallback, useEffect, useState } from 'react'
import { Header } from 'antd/lib/layout/layout'
import { Menu } from 'antd'
import AvatarDropdown from './AvatarDropdown'
import { getIntl, history, getLocale } from 'umi'
import { HomeOutlined, SettingOutlined, UsergroupDeleteOutlined } from '@ant-design/icons'
import styles from './header.less'

interface IPageOption {
  setLoading: (loading: boolean) => void
}

const HeaderContainer: FC<IPageOption> = (props) => {
  const { setLoading } = props
  const [modalVisit, setModalVisit] = useState(false)
  const [items, setItems] = useState<any[]>()

  useEffect(() => {
    setItems([
      { icon: <HomeOutlined />, label: getIntl().formatMessage({ id: 'component.globalHeader.menu.home' }), key: 'home' }, // 菜单项务必填写 key
      { icon: <UsergroupDeleteOutlined />, label: getIntl().formatMessage({ id: 'component.globalHeader.menu.group' }), key: 'group' },
      { icon: <SettingOutlined />, label: getIntl().formatMessage({ id: 'component.globalHeader.menu.person' }), key: 'center' }
    ])
  }, [getLocale()])

  const list = [
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你收到了 14 份新周报',
      datetime: '2017-08-09',
      type: 'notification'
    },
    {
      id: '000000002',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: '你推荐的 曲妮妮 已通过第三轮面试',
      datetime: '2017-08-08',
      type: 'notification'
    }
  ]

  const menuClick = (item: any) => {
    const { key } = item
    let pathname = '/home'
    switch (key) {
      case 'center':
        pathname = '/account'
        break
    }
    history.push({
      pathname
    })
  }

  return (
    <Header className={styles.header}>
      <div className='logo'>123123</div>
      <div className={styles.right}>
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['home']} items={items} onClick={menuClick} />
        <AvatarDropdown menu modalVisit={modalVisit} setLoading={setLoading} setModalVisit={setModalVisit} />
      </div>
    </Header>
  )
}

export default HeaderContainer
