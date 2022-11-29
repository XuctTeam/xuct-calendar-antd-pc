/*
 * @Author: Derek Xu
 * @Date: 2022-11-23 11:21:04
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-29 21:23:39
 * @FilePath: \xuct-calendar-antd-pc\src\pages\User\Account\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { ProCard } from '@ant-design/pro-components'
import { EditOutlined, HomeOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Breadcrumb, Button, Input, message, Tabs, Upload, UploadProps } from 'antd'
import { FormattedMessage, history, useModel } from 'umi'
import { GroupManager, SystemSetting } from './components'
import styles from './index.less'

const Account = () => {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || { currentUser: undefined }

  const props: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text'
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.left}>
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
                label: <FormattedMessage id='pages.person.center.group.tab' />,
                key: '1',
                children: <GroupManager />
              },
              {
                label: <FormattedMessage id='pages.person.center.system.tab' />,
                key: '2',
                children: <SystemSetting />
              },
              {
                label: `Tab 3`,
                key: '3',
                children: `Content of Tab Pane 3`
              }
            ]}
          />
        </ProCard>
      </div>
    </div>
  )
}

export default Account
