/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 16:56:52
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-14 14:47:24
 * @FilePath: \xuct-calendar-antd-pc\src\layouts\components\Header.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FC, useEffect, useState } from 'react'
import { Header } from 'antd/lib/layout/layout'
import { Space } from 'antd'
import AvatarDropdown from './AvatarDropdown'
import { history } from 'umi'
import { SettingOutlined } from '@ant-design/icons'
import styles from './header.less'
import SettingForm from './SettingForm'

interface IPageOption {
  setLoading: (loading: boolean) => void
}

const HeaderContainer: FC<IPageOption> = (props) => {
  const { setLoading } = props
  const [setOpen, setSetOpen] = useState<boolean>(false)

  return (
    <>
      <Header className={styles.header}>
        <div className='logo'>123123</div>
        <div className={styles.right}>
          <Space>
            <div className={styles.menu} onClick={() => setSetOpen(true)}>
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
      <SettingForm
        open={setOpen}
        setOpen={() => {
          setSetOpen(false)
        }}
      ></SettingForm>
    </>
  )
}

export default HeaderContainer
