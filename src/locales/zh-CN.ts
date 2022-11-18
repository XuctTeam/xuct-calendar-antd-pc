/*
 * @Author: Derek Xu
 * @Date: 2022-11-14 19:17:23
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-18 16:20:17
 * @FilePath: \xuct-calendar-antd-pc\src\locales\zh-CN.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import globalHeader from './zh-CN/globalHeader'
import pages from './zh-CN/pages'
import pwa from './zh-CN/pwa'
import settingDrawer from './zh-CN/settingDrawer'
import settings from './zh-CN/settings'
import codeMessage from './zh-CN/codeMessage'

export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.copyright.produced': '楚恬商行技术支持产品',
  'app.preview.down.block': '下载此页面到本地项目',
  'app.welcome.link.fetch-blocks': '获取全部区块',
  'app.welcome.link.block-list': '基于 block 开发，快速构建标准页面',
  ...pages,
  ...globalHeader,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...codeMessage
}
