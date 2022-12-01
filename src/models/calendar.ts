/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 08:34:15
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-02 03:45:12
 * @FilePath: \xuct-calendar-antd-pc\src\models\calendar.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { list } from '@/services/calendar'

export default {
  namespace: 'calendar',
  state: {
    calendars: []
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
