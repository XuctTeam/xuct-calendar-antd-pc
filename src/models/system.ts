/*
 * @Author: Derek Xu
 * @Date: 2022-11-17 08:34:15
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-25 15:25:52
 * @FilePath: \xuct-calendar-antd-pc\src\models\system.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import store from '@/cache'

export default {
  namespace: 'system',
  state: {
    dataView: store.localGetItem('data_view') || '0',
    lunarView: store.localGetItem('lunar_view') || '0',
  },

  reducers: {
    onChageDataView(state: any, {payload}: any) {
      const { dataView } = payload
      store.localSetItem('data_view' , dataView)
      return {...state ,dataView }
    },

    onChageLunarView(state: any, { payload }: any) {
      const { lunarView } = payload
      store.localSetItem('lunar_view', lunarView)
      return {...state , lunarView}
    }
  },
  effects: {
    
  }
}
