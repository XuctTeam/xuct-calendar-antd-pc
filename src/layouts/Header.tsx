/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 16:56:52
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-21 09:05:40
 * @FilePath: \xuct-calendar-antd-pc\src\pages\Home\ui\Header.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { FC } from 'react'
import { Header } from 'antd/lib/layout/layout'
import { message, Space } from 'antd'
import NoticeIcon from '@/components/NoticeIcon/NoticeIcon'
import AvatarDropdown from '@/layouts/AvatarDropdown'
import styles from './header.less'
import { SelectLang } from 'umi'

const HeaderContainer: FC = () => {
  const list = [
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '你收到了 14 份新周报',
      datetime: '2017-08-09',
      type: 'notification'
    },
    {
      id: '000000002',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: '你推荐的 曲妮妮 已通过第三轮面试',
      datetime: '2017-08-08',
      type: 'notification'
    }
  ]

  return (
    <Header className={styles.header}>
      <div>123123</div>
      <div className={styles.center}></div>
      <Space className={`${styles.right}`} size='middle'>
        <NoticeIcon
          count={10}
          onItemClick={(item) => {
            message.info(`${item.title} 被点击了`)
          }}
          onClear={(title: string, key: string) => message.info('点击了清空更多')}
          loading={false}
          clearText='清空'
          viewMoreText='查看更多'
          onViewMore={() => message.info('点击了查看更多')}
          clearClose
        >
          <NoticeIcon.Tab tabKey='notification' count={2} list={list} title='通知' emptyText='你已查看所有通知' showViewMore />
          <NoticeIcon.Tab tabKey='message' count={2} list={list} title='消息' emptyText='您已读完所有消息' showViewMore />
          <NoticeIcon.Tab tabKey='event' title='待办' emptyText='你已完成所有待办' count={2} list={list} showViewMore />
        </NoticeIcon>
        <AvatarDropdown menu />
        <div className={`${styles.lang}`} data-lang>
          {SelectLang && <SelectLang />}
        </div>
      </Space>
    </Header>
  )
}

export default HeaderContainer
