/*
 * @Author: Derek Xu
 * @Date: 2023-01-29 16:33:09
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-01-29 16:48:24
 * @FilePath: \xuct-calendar-antd-pc\src\components\MenuDropdown\index.tsx
 * @Description:
 *
 * Copyright (c) 2023 by 楚恬商行, All Rights Reserved.
 */
import { AppstoreAddOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'
import { useSetState } from 'ahooks'
import { Dropdown, MenuProps } from 'antd'
import { FormattedMessage } from 'umi'
import styles from './index.less'
import SettingForm from './SettingForm'

interface State {
  visable: boolean
}

const items: MenuProps['items'] = [
  {
    key: '1',
    label: <FormattedMessage id='component.globalHeader.menu.setting' />,
    icon: <SettingOutlined />
  },
  {
    key: '2',
    label: <FormattedMessage id='component.globalHeader.menu.group' />,
    icon: <TeamOutlined />
  },
  {
    key: '3',
    label: 'Item 3',
    icon: <SettingOutlined />
  }
]

export default function index() {
  const [state, setSetate] = useSetState<State>({
    visable: false
  })

  const onClick: MenuProps['onClick'] = ({ key }) => {
    //message.info(`Click on item ${key}`)
    switch (key) {
      case '1':
        setSetate({
          visable: true
        })
        break
    }
  }

  return (
    <>
      <Dropdown
        trigger={['click']}
        placement='bottom'
        menu={{
          items,
          onClick
        }}
      >
        <div className={styles.menu}>
          <AppstoreAddOutlined />
        </div>
      </Dropdown>
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
