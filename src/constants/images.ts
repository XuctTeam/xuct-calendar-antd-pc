/*
 * @Author: Derek Xu
 * @Date: 2022-11-30 17:06:52
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-30 17:10:16
 * @FilePath: \xuct-calendar-antd-pc\src\constants\images.ts
 * @Description:
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */

const DEFAULT_IMAGES_SERVER = process.env.IMAGE_URL

export default {
  /** 默认头像 */
  DEFAULT_AVATAR: DEFAULT_IMAGES_SERVER + 'group1/M00/00/00/CgAQDGKEgb2AE6fzAAB0mLZqMmI800.png',
  /** 登录背景图标 */
  DEFAULT_LOG_IMAGE: DEFAULT_IMAGES_SERVER + 'group1/M00/00/00/CgAQDGNQu-mAclO8AAG2mZwIlII892_big.png',
  /** 客服二维码 */
  DEFAULT_QR_IMAGE: DEFAULT_IMAGES_SERVER + 'group1/M00/00/00/CgAQDGKGB9iAIInkAAH5qvJoHLs183.png',
  /** 邀请分享二维码 */
  DEFAULT_ATTEND_BACKGROUD: DEFAULT_IMAGES_SERVER + 'group1/M00/00/00/CgAQDGKVeDSAGalcAADOrzkbMvs223.png',

  GROUP_ADD: DEFAULT_IMAGES_SERVER + 'group1/M00/00/00/CgAQDGKwT62ASKrrAAAFnqNFSFE176.png',

  GROUP_SEARCH: DEFAULT_IMAGES_SERVER + 'group1/M00/00/00/CgAQDGKwT9qASeuMAAAGmf3CT0c489.png'
}
