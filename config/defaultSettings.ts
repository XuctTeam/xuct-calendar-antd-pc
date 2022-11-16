/*
 * @Author: Derek Xu
 * @Date: 2022-11-14 19:17:23
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-16 11:05:29
 * @FilePath: \xuct-calendar-antd-pc\config\defaultSettings.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { Settings as LayoutSettings } from '@ant-design/pro-components'

/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean
  logo?: string
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Ant Design Pro',
  pwa: false,
  logo: 'https://images.xuct.net.cn/group1/M00/00/00/CgAQDGNQu-mAclO8AAG2mZwIlII892_big.png',
  iconfontUrl: ''
}

export default Settings
