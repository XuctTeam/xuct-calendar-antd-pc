/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 16:56:52
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-20 08:49:23
 * @FilePath: \xuct-calendar-antd-pc\src\layouts\components\Header.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FC, useState } from 'react'
import { Header } from 'antd/lib/layout/layout'
import { Space } from 'antd'
import AvatarDropdown from '@/components/AvatarDropdown'
import { SettingOutlined } from '@ant-design/icons'
import SettingForm from './SettingForm'
import styles from './header.less'

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
