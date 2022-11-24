/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 08:34:15
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-23 20:27:29
 * @FilePath: \xuct-calendar-antd-pc\src\locales\en-US.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import component from './en-US/component'
import globalHeader from './en-US/globalHeader'
import pages from './en-US/pages'
import pwa from './en-US/pwa'
import settingDrawer from './en-US/settingDrawer'
import codeMessage from './zh-CN/codeMessage'

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.copyright.produced': 'Produced by Ant Financial Experience Department',
  'app.preview.down.block': 'Download this page to your local project',
  'app.welcome.link.fetch-blocks': 'Get all block',
  'app.welcome.link.block-list': 'Quickly build standard, pages based on `block` development',
  ...globalHeader,
  ...settingDrawer,
  ...pwa,
  ...component,
  ...pages,
  ...codeMessage
}
