/*
 * @Author: Derek Xu
 * @Date: 2022-11-16 22:29:30
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-16 23:32:11
 * @FilePath: \xuct-calendar-antd-pc\config\config.ts
 * @Description: 
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved. 
 */
import { defineConfig } from 'umi';
 
export default defineConfig({
    dva: {},
    request: {
        dataField:""
    },
    antd: {
      dark: true,
      compact: true,
    },
    locale: {
      // 默认使用 src/locales/zh-CN.ts 作为多语言文件
      default: 'zh-CN',
      baseSeparator: '-',
  },
  initialState: {},
  model: {},
    
    plugins: ["@umijs/plugins/dist/dva",  "@umijs/plugins/dist/request" , "@umijs/plugins/dist/antd" , "@umijs/plugins/dist/locale" , "@umijs/plugins/dist/initial-state" , "@umijs/plugins/dist/model"],
});