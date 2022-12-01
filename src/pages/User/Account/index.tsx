/*
 * @Author: Derek Xu
 * @Date: 2022-11-23 11:21:04
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-01 22:55:50
 * @FilePath: \xuct-calendar-antd-pc\src\pages\User\Account\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { Tabs } from 'antd'
import { FormattedMessage } from 'umi'
import { SystemSetting, UserInfo } from './components'

import styles from './index.less'

const Account = () => {
  const items = [
    {
      label: <FormattedMessage id='pages.person.center.userinfo.tab' />,
      key: 'item-1',
      children: <UserInfo />
    }, // 务必填写 key
    { label: <FormattedMessage id='pages.person.center.system.tab' />, key: 'item-2', children: <SystemSetting /> }
  ]

  return <Tabs tabPosition='left' className={styles.page} items={items} style={{ height: '100%' }} />
}

export default Account
