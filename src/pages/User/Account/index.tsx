/*
 * @Author: Derek Xu
 * @Date: 2022-11-23 11:21:04
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-24 20:20:31
 * @FilePath: \xuct-calendar-antd-pc\src\pages\User\Account\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { ProCard } from '@ant-design/pro-components'
import { EditOutlined, HomeOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Breadcrumb, Button, Input, message, Tabs, Upload, UploadProps } from 'antd'
import { FormattedMessage, history, useModel } from 'umi'
import { SystemSetting } from './components'
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
      <ProCard hoverable bordered className={styles.nav}>
        <Breadcrumb>
          <Breadcrumb.Item
            onClick={() => {
              history.back()
            }}
          >
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <UserOutlined />
            <span>
              <FormattedMessage id='pages.person.center.menu' />
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </ProCard>

      <div className={styles.center}>
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
                <span>姓名</span>
                <div className={styles.input}>
                  <Input placeholder='Basic usage' value={currentUser?.member.name} />
                  <EditOutlined />
                </div>
              </div>
              <div className={styles.cell}>
                <span>账号</span>
                <div className={styles.input}>
                  <Input placeholder='Basic usage' value={11} disabled />
                </div>
              </div>
              <div className={styles.cell}>
                <span>电话</span>
                <div className={styles.input}>
                  <Input placeholder='Basic usage' value={11} disabled />
                  <EditOutlined />
                </div>
              </div>
              <div className={styles.cell}>
                <span>邮箱</span>
                <div className={styles.input}>
                  <Input placeholder='Basic usage' />
                  <EditOutlined />
                </div>
              </div>
              <div className={styles.cell}>
                <span>微信名称</span>
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
                  label: <FormattedMessage id='pages.person.center.system.setting' />,
                  key: '1',
                  children: <SystemSetting />
                },
                {
                  label: `Tab 2`,
                  key: '2',
                  children: `Content of Tab Pane 2`
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
    </div>
  )
}

export default Account
