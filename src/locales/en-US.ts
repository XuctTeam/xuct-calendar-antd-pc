/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 08:34:15
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-27 17:39:30
 * @FilePath: \xuct-calendar-antd-pc\src\locales\en-US.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import component from './en-US/component'
import globalHeader from './en-US/globalHeader'
import pages from './en-US/pages'
import pwa from './en-US/pwa'
import codeMessage from './zh-CN/codeMessage'
import form from './en-US/form'
import repeat from './en-US/repeat'

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
  ...pwa,
  ...component,
  ...form,
  ...pages,
  ...codeMessage,
  ...repeat
}
