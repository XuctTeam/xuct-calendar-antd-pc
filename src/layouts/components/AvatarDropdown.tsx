import { EditOutlined, ExclamationCircleOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { getIntl, history, useModel } from 'umi'
import { Avatar, Menu, Modal } from 'antd'
import type { ItemType } from 'antd/es/menu/hooks/useItems'
import type { MenuInfo } from 'rc-menu/lib/interface'
import React, { useCallback } from 'react'
import { flushSync } from 'react-dom'
import HeaderDropdown from '@/components/HeaderDropdown'
import ModifyPassword from './ModifyPassword'
import { logout } from '@/services/login'
import { stringify } from 'qs'
import styles from './avatar.less'

export type GlobalHeaderRightProps = {
  menu?: boolean
  modalVisit: boolean
  setModalVisit: (visit: boolean) => void
  setLoading: (loading: boolean) => void
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = (props) => {
  const { initialState, setInitialState } = useModel('@@initialState')
  const { menu, modalVisit, setModalVisit, setLoading } = props
  const { currentUser } = initialState || { currentUser: null }
  const menuItems: ItemType[] = [
    ...(menu
      ? [
          {
            key: 'center',
            icon: <UserOutlined />,
            label: '个人中心'
          },
          {
            key: 'settings',
            icon: <EditOutlined />,
            label: '修改密码'
          },
          {
            type: 'divider' as const
          }
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录'
    }
  ]

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event
      if (key === 'logout') {
        loginOut()
        return
      }
      if (key === 'center') {
        history.push({
          pathname: '/account'
        })
        return
      }
      setModalVisit(true)
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
        _logout()
      }
    })
  }

  const _logout = async () => {
    setLoading(true)
    try {
      await logout()
    } catch (err) {
      setLoading(false)
      console.log(err)
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
      <ModifyPassword modalVisit={modalVisit} setModalVisit={setModalVisit} />
    </>
  )
}

export default AvatarDropdown
