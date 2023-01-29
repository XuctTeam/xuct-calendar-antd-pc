/*
 * @Author: Derek Xu
 * @Date: 2022-11-24 14:07:32
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-01-29 16:15:08
 * @FilePath: \xuct-calendar-antd-pc\src\components\AvatarDropdown\index.tsx
 * @Description:
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

import HeaderDropdown from '@/components/HeaderDropdown'
import { logout } from '@/services/login'
import { ExclamationCircleOutlined, LockOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { setAlpha } from '@ant-design/pro-components'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { Avatar, Modal, Spin } from 'antd'
import { ItemType } from 'antd/es/menu/hooks/useItems'
import { stringify } from 'querystring'
import type { MenuInfo } from 'rc-menu/lib/interface'
import React, { useCallback, useState } from 'react'
import { flushSync } from 'react-dom'
import { history, useIntl, useModel } from 'umi'
import PasswordForm from './PasswordForm'
import UserInfoForm from './UserInfoForm'

export type GlobalHeaderRightProps = {
  menu?: boolean
}

const Name = () => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  const nameClassName = useEmotionCss(({ token }) => {
    return {
      width: '70px',
      height: '48px',
      overflow: 'hidden',
      lineHeight: '48px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      [`@media only screen and (max-width: ${token.screenMD}px)`]: {
        display: 'none'
      }
    }
  })

  return <span className={`${nameClassName} anticon`}>{currentUser?.member.name}</span>
}

const AvatarLogo = () => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || {}

  const avatarClassName = useEmotionCss(({ token }) => {
    return {
      marginRight: '8px',
      color: token.colorPrimary,
      verticalAlign: 'top',
      background: setAlpha(token.colorBgContainer, 0.85),
      [`@media only screen and (max-width: ${token.screenMD}px)`]: {
        margin: 0
      }
    }
  })

  return <Avatar size='small' className={avatarClassName} src={currentUser?.member.avatar} alt='avatar' />
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const [passOpen, setPassOpen] = useState<boolean>(false)
  const [infoOpen, setInfoOpen] = useState<boolean>(false)
  const init = useIntl()
  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover
      }
    }
  })
  const { initialState, setInitialState } = useModel('@@initialState')

  const loading = (
    <span className={actionClassName}>
      <Spin
        size='small'
        style={{
          marginLeft: 8,
          marginRight: 8
        }}
      />
    </span>
  )

  if (!initialState) {
    return loading
  }

  const { currentUser } = initialState

  if (!currentUser || !currentUser.member.name) {
    return loading
  }

  const menuItems: ItemType[] = [
    ...(menu
      ? [
          {
            key: 'userinfo',
            icon: <UserOutlined />,
            label: init.formatMessage({ id: 'component.globalHeader.user' })
          }
        ]
      : []),
    {
      key: 'password',
      icon: <LockOutlined />,
      label: init.formatMessage({ id: 'component.globalHeader.modify.password' })
    },
    {
      type: 'divider' as const
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: init.formatMessage({ id: 'component.globalHeader.logout' })
    }
  ]

  const onMenuClick = (event: MenuInfo) => {
    const { key } = event
    switch (key) {
      case 'logout':
        loginOut()
        break
      case 'password':
        setPassOpen(true)
        break
      case 'userinfo':
        setInfoOpen(true)
        break
    }
  }

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = () => {
    //await outLogin();
    Modal.confirm({
      title: init.formatMessage({ id: 'pages.modal.commit.title' }),
      icon: <ExclamationCircleOutlined />,
      content: init.formatMessage({ id: 'pages.logout.content' }),
      centered: true,
      onOk: () => {
        quitLogin()
      }
    })
  }

  const quitLogin = useCallback(async () => {
    try {
      await logout()
    } catch (err) {
      console.log(err)
      return
    }
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
  }, [setInitialState])

  const infoClose = (e: any) => {
    setInfoOpen(false)
  }

  const onUpdateUserName = useCallback(
    (name: string) => {
      const { member, auths } = currentUser
      flushSync(() => {
        setInitialState((s) => ({ ...s, currentUser: { member: { ...member, name: name }, auths } }))
      })
    },
    [setInitialState]
  )

  const onUpdateAvatar = useCallback(
    (avatar: string) => {
      const { member, auths } = currentUser
      flushSync(() => {
        setInitialState((s) => ({ ...s, currentUser: { member: { ...member, avatar: avatar }, auths } }))
      })
    },
    [setInitialState]
  )

  return (
    <>
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: onMenuClick,
          items: menuItems
        }}
      >
        <span className={actionClassName}>
          <AvatarLogo />
          <Name />
        </span>
      </HeaderDropdown>
      <PasswordForm open={passOpen} setOpen={setPassOpen} />
      <UserInfoForm open={infoOpen} setOpen={infoClose} onUpdateUserName={onUpdateUserName} onUpdateAvatar={onUpdateAvatar}></UserInfoForm>
    </>
  )
}

export default AvatarDropdown
