/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 08:34:15
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-17 10:05:01
 * @FilePath: \xuct-calendar-antd-pc\src\models\user.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export default {
  namespace: 'user',
  state: {
    auths: []
  },

  reducers: {
    add(state: any) {
      state.num += 1
    }
  },
  effects: {
    *addAsync(_action: any, { put }: any) {
      yield delay(1000)
      yield put({ type: 'add' })
    }
  }
}
