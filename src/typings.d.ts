/*
 * @Author: Derek Xu
 * @Date: 2022-11-16 20:15:02
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-30 17:08:45
 * @FilePath: \xuct-calendar-antd-pc\src\typings.d.ts
 * @Description: 
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved. 
 */

declare module 'slash2'
declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module 'omit.js'
declare module 'numeral'
declare module '@antv/data-set'
declare module 'mockjs'
declare module 'react-fittext'
declare module 'bizcharts-plugin-slider'

// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design Dedicated environment variable, please do not use it in your project.
declare let ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: 'site' | undefined

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false

// 以下变量声明对应config.[env].ts文件内define的变量
declare const API_URL: string
declare const APP_CLIENT: string
declare const IMAGE_URL: string
