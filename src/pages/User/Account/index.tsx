/*
 * @Author: Derek Xu
 * @Date: 2022-11-23 11:21:04
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-30 13:29:22
 * @FilePath: \xuct-calendar-antd-pc\src\pages\User\Account\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { ProCard } from '@ant-design/pro-components'
import { EditOutlined, HomeOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Breadcrumb, Button, Input, message, Tabs, Upload, UploadProps } from 'antd'
import { FormattedMessage, getIntl, history, useModel } from 'umi'
import { SystemSetting, UserInfo } from './components'
import styles from './index.less'

const Account = () => {
  const items = [
    { label: getIntl().formatMessage({ id: 'pages.person.center.userinfo.tab' }), key: 'item-1', children: <UserInfo /> }, // 务必填写 key
    { label: getIntl().formatMessage({ id: 'pages.person.center.system.tab' }), key: 'item-2', children: <SystemSetting /> }
  ]

  return (
    <div className={styles.page}>
      <Tabs className={styles.left} tabPosition='left' items={items} style={{ height: '100%' }} />
      {/* <div className={styles.left}>
        <ProCard title={<FormattedMessage id='pages.person.center.userinfo' />} hoverable bordered>
          <div className={styles.avatar}>
            <Avatar src={currentUser?.member.avatar} size={100} />
            <Upload {...props}>
              <Button icon={<UploadOutlined />} danger type='dashed' className={styles.button}>
                <FormattedMessage id='pages.person.center.upload.avatar' />
              </Button>
            </Upload>
          </div>
          <div className={styles.info}>
            <div className={styles.account}>
              <UserOutlined /> <span>{<FormattedMessage id='pages.person.center.info.detail' />}</span>
            </div>
            <div className={styles.cell}>
              <span>
                <FormattedMessage id='pages.person.center.name.label' />
              </span>
              <div className={styles.input}>
                <Input placeholder='Basic usage' value={currentUser?.member.name} />
                <EditOutlined />
              </div>
            </div>
            <div className={styles.cell}>
              <span>
                <FormattedMessage id='pages.person.center.username.label' />
              </span>
              <div className={styles.input}>
                <Input placeholder='Basic usage' value={11} disabled />
              </div>
            </div>
            <div className={styles.cell}>
              <span>
                <FormattedMessage id='pages.person.center.phone.label' />
              </span>
              <div className={styles.input}>
                <Input placeholder='Basic usage' value={11} disabled />
                <EditOutlined />
              </div>
            </div>
            <div className={styles.cell}>
              <span>
                <FormattedMessage id='pages.person.center.email.label' />
              </span>
              <div className={styles.input}>
                <Input placeholder='Basic usage' />
                <EditOutlined />
              </div>
            </div>
            <div className={styles.cell}>
              <span>
                <FormattedMessage id='pages.person.center.wx.label' />
              </span>
              <div className={styles.input}>
                <Input placeholder='Basic usage' />
                <EditOutlined />
              </div>
            </div>
          </div>
        </ProCard>
      </div>

      <div className={styles.right}>
        <ProCard title={<FormattedMessage id='pages.person.center.setting' />}>
          <Tabs
            className={styles.tabs}
            defaultActiveKey='1'
            items={[
              {
                label: <FormattedMessage id='pages.person.center.system.tab' />,
                key: '1',
                children: <SystemSetting />
              },
              {
                label: `Tab 3`,
                key: '2',
                children: `Content of Tab Pane 3`
              }
            ]}
          />
        </ProCard>
      </div> */}
    </div>
  )
}

export default Account
