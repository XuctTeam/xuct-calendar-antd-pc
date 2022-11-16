/*
 * @Author: Derek Xu
 * @Date: 2022-11-16 09:05:04
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-16 09:13:29
 * @FilePath: \xuct-calendar-antd-pc\src\cache\index.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

const prefix = 'calendar_antd_'

export default {
  getItem: (key: string) => {
    return window.sessionStorage.getItem(prefix.concat(key))
  },
  setItem: (key: string, value: any) => {
    window.sessionStorage.setItem(prefix.concat(key), value)
  }
}
