/*
 * @Author: Derek Xu
 * @Date: 2022-11-23 11:21:04
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-30 20:44:48
 * @FilePath: \xuct-calendar-antd-pc\src\pages\User\Account\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { ProCard } from '@ant-design/pro-components'
import { EditOutlined, HomeOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Breadcrumb, Button, Input, message, Tabs, Upload, UploadProps } from 'antd'
import { FormattedMessage, getIntl, history, useModel } from 'umi'
import { ModifyPassword, SystemSetting, UserInfo } from './components'
import styles from './index.less'
import { useState } from 'react'

const Account = () => {
  const [modalVisit, setModalVisit] = useState<boolean>(false)

  const items = [
    { label: getIntl().formatMessage({ id: 'pages.person.center.userinfo.tab' }), key: 'item-1', children: <UserInfo setModalVisit={setModalVisit} /> }, // 务必填写 key
    { label: getIntl().formatMessage({ id: 'pages.person.center.system.tab' }), key: 'item-2', children: <SystemSetting /> }
  ]

  return (
    <div className={styles.page}>
      <Tabs className={styles.left} tabPosition='left' items={items} style={{ height: '100%' }} />
      <ModifyPassword modalVisit={modalVisit} setModalVisit={setModalVisit}></ModifyPassword>
    </div>
  )
}

export default Account
