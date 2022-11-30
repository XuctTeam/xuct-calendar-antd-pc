/*
 * @Author: Derek Xu
 * @Date: 2022-11-24 14:07:32
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-30 20:53:54
 * @FilePath: \xuct-calendar-antd-pc\src\layouts\components\AvatarDropdown.tsx
 * @Description:
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { ExclamationCircleOutlined, LogoutOutlined } from '@ant-design/icons'
import { getIntl, history, useModel } from 'umi'
import { Avatar, Menu, Modal } from 'antd'
import type { ItemType } from 'antd/es/menu/hooks/useItems'
import type { MenuInfo } from 'rc-menu/lib/interface'
import React, { useCallback } from 'react'
import { flushSync } from 'react-dom'
import HeaderDropdown from '@/components/HeaderDropdown'
import { logout } from '@/services/login'
import { stringify } from 'qs'
import styles from './avatar.less'

export type GlobalHeaderRightProps = {
  menu?: boolean
  setLoading: (loading: boolean) => void
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = (props) => {
  const { setLoading } = props
  const { initialState, setInitialState } = useModel('@@initialState')
  const { currentUser } = initialState || { currentUser: null }
  const menuItems: ItemType[] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: getIntl().formatMessage({ id: 'component.globalHeader.logout' })
    }
  ]

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event
      if (key === 'logout') {
        loginOut()
        return
      }
    },
    [setInitialState]
  )

  const menuHeaderDropdown = <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick} items={menuItems} />

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = () => {
    //await outLogin();
    Modal.confirm({
      title: getIntl().formatMessage({ id: 'pages.modal.commit.title' }),
      icon: <ExclamationCircleOutlined />,
      content: getIntl().formatMessage({ id: 'pages.logout.content' }),
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        quitLogin()
      }
    })
  }

  const quitLogin = async () => {
    setLoading(true)
    try {
      await logout()
    } catch (err) {
      console.log(err)
      setLoading(false)
      return
    }
    setLoading(false)
    flushSync(() => {
      setInitialState((s) => ({ ...s, currentUser: undefined }))
    })
    const { search, pathname } = window.location
    const urlParams = new URL(window.location.href).searchParams
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect')
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search
        })
      })
    }
  }

  if (!currentUser) return <></>

  return (
    <>
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size='small' className={styles.avatar} src={currentUser.member.avatar} alt='avatar' />
          <span className={`${styles.name}`}>欢迎您：{currentUser.member.name}</span>
        </span>
      </HeaderDropdown>
    </>
  )
}

export default AvatarDropdown
