/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 08:34:15
 * @LastEditors: Derek Xu
 * @LastEditTime: 2023-01-04 17:48:51
 * @FilePath: \xuct-calendar-antd-pc\src\models\group.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { list } from '@/services/calendar'

export default {
  namespace: 'group',
  state: {
    groups: []
  },

  reducers: {
    list(state: any, { payload }: any) {
      const { calendars } = payload
      return { ...state, calendars }
    }
  },
  effects: {
    *listAsync({ payload }: any, { call, put }: any) {
      const { resolve } = payload
      const { data } = yield call(list)
      put({
        type: 'list',
        payload: {
          calendars: data
        }
      })
      !!resolve && resolve()
    }
  }
}
