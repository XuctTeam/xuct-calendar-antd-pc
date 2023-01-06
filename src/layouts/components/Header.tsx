/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 16:56:52
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-01-06 16:44:45
 * @FilePath: \xuct-calendar-antd-pc\src\layouts\components\Header.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FC, useState } from 'react'
import { Header } from 'antd/lib/layout/layout'
import { Divider, Popover, Space } from 'antd'
import AvatarDropdown from '@/components/AvatarDropdown'
import { AppstoreAddOutlined, SettingOutlined } from '@ant-design/icons'
import SettingForm from './SettingForm'
import { useSetState } from 'ahooks'

import styles from './header.less'

interface IPageOption {
  setLoading: (loading: boolean) => void
}

interface State {
  visable: boolean
}

const applicationContent = () => {
  return (
    <Space>
      <div>123123123</div>
    </Space>
  )
}

const HeaderContainer: FC<IPageOption> = ({ setLoading }) => {
  const [state, setSetate] = useSetState<State>({
    visable: false
  })

  return (
    <>
      <Header className={styles.header}>
        <div className='logo'>123123</div>
        <div className={styles.right}>
          <Space size='small'>
            <Popover placement='bottom' trigger='click' content={applicationContent()}>
              <div className={styles.menu}>
                <AppstoreAddOutlined />
              </div>
            </Popover>

            <div
              className={styles.menu}
              onClick={() =>
                setSetate({
                  visable: true
                })
              }
            >
              <SettingOutlined />
            </div>
          </Space>
          <Divider type='vertical' style={{ height: '20px' }} />
          <AvatarDropdown menu setLoading={setLoading} />
        </div>
      </Header>
      <SettingForm
        open={state.visable}
        setOpen={() => {
          setSetate({
            visable: false
          })
        }}
      ></SettingForm>
    </>
  )
}

export default HeaderContainer
