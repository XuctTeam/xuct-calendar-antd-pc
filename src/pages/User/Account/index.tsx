/*
 * @Author: Derek Xu
 * @Date: 2022-11-23 11:21:04
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-23 16:10:22
 * @FilePath: \xuct-calendar-antd-pc\src\pages\User\Account\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { ProCard } from '@ant-design/pro-components'
import { EditOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Breadcrumb, Input, Tabs } from 'antd'
import { history } from 'umi'
import styles from './index.less'

const Account = () => {
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
            <span>Application List</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </ProCard>

      <div className={styles.center}>
        <div className={styles.left}>
          <ProCard title='我的信息' hoverable bordered>
            <div className={styles.avatar}>
              <Avatar src='https://joeschmoe.io/api/v1/random' size={100} />
              <span>qweqwe</span>
              <span>qweqwe</span>
            </div>
            <div className={styles.info}>
              <div className={styles.account}>
                <UserOutlined /> <span>详细信息</span>
              </div>
              <div className={styles.cell}>
                <span>姓名</span>
                <div className={styles.input}>
                  <Input placeholder='Basic usage' />
                  <EditOutlined />
                </div>
              </div>
              <div className={styles.cell}>
                <span>姓名</span>
                <div className={styles.input}>
                  <Input placeholder='Basic usage' />
                  <EditOutlined />
                </div>
              </div>
              <div className={styles.cell}>
                <span>姓名</span>
                <div className={styles.input}>
                  <Input placeholder='Basic usage' />
                  <EditOutlined />
                </div>
              </div>
              <div className={styles.cell}>
                <span>姓名</span>
                <div className={styles.input}>
                  <Input placeholder='Basic usage' />
                  <EditOutlined />
                </div>
              </div>
              <div className={styles.cell}>
                <span>姓名</span>
                <div className={styles.input}>
                  <Input placeholder='Basic usage' />
                  <EditOutlined />
                </div>
              </div>
            </div>
          </ProCard>
        </div>

        <div className={styles.right}>
          <ProCard title='个人设置'>
            <Tabs
              defaultActiveKey='1'
              items={[
                {
                  label: `Tab 1`,
                  key: '1',
                  children: `Content of Tab Pane 1`
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
