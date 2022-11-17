/*
 * @Author: Derek Xu
 * @Date: 2022-11-14 19:17:23
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-17 09:24:47
 * @FilePath: \xuct-calendar-antd-pc\src\components\Footer\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { GithubOutlined } from '@ant-design/icons'
import { DefaultFooter } from '@ant-design/pro-components'
import { useIntl } from 'umi'

const Footer: React.FC = () => {
  const intl = useIntl()
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '蚂蚁集团体验技术部出品'
  })

  const currentYear = new Date().getFullYear()

  return (
    <DefaultFooter
      style={{
        background: 'none'
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'calenadr',
          title: '楚日历',
          href: 'https://pro.ant.design',
          blankTarget: true
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ant-design/ant-design-pro',
          blankTarget: true
        },
        {
          key: 'beian',
          title: '宁ICP备2020003618号-1',
          href: 'https://beian.miit.gov.cn/',
          blankTarget: true
        }
      ]}
    />
  )
}

export default Footer
