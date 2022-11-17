/*
 * @Author: Derek Xu
 * @Date: 2022-11-16 22:29:30
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-17 09:34:47
 * @FilePath: \xuct-calendar-antd-pc\config\config.ts
 * @Description:
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import { defineConfig } from 'umi'
import routes from './routes'

export default defineConfig({
  /**
   * @name 开启 hash 模式
   * @description 让 build 之后的产物包含 hash 后缀。通常用于增量发布和避免浏览器加载缓存。
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: true,
  /**
   * @name 路由的配置，不在路由中引入的文件不会编译
   * @description 只支持 path，component，routes，redirect，wrappers，title 的配置
   * @doc https://umijs.org/docs/guides/routes
   */
  // umi routes: https://umijs.org/docs/routing
  routes,
  /**
   * @name moment 的国际化配置
   * @description 如果对国际化没有要求，打开之后能减少js的包大小
   * @doc https://umijs.org/docs/api/config#ignoremomentlocale
   */
  ignoreMomentLocale: true,

  dva: {},
  request: {},

  antd: {
    //dark: true,
    compact: true
  },

  initialState: {},
  model: {},

  /**
   * @name 国际化插件
   * @doc https://umijs.org/docs/max/i18n
   */
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true
  },

  plugins: [
    '@umijs/plugins/dist/dva',
    '@umijs/plugins/dist/request',
    '@umijs/plugins/dist/antd',
    '@umijs/plugins/dist/locale',
    '@umijs/plugins/dist/initial-state',
    '@umijs/plugins/dist/model'
  ]
})
