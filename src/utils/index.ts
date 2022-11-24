/*
 * @Author: Derek Xu
 * @Date: 2022-11-16 11:37:01
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-11-24 10:31:37
 * @FilePath: \xuct-calendar-antd-pc\src\utils\index.ts
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import * as CryptoJS from 'crypto-js'
/**
 *加密处理
 */
export const encryption = (params: any) => {
  let { data, type, param, key } = params
  const result = JSON.parse(JSON.stringify(data))
  if (type === 'Base64') {
    param.forEach((ele: any) => {
      result[ele] = base64(result[ele])
    })
  } else {
    param.forEach((ele: any) => {
      var data = result[ele]
      key = CryptoJS.enc.Latin1.parse(key)
      var iv = key
      // 加密
      var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding
      })
      result[ele] = encrypted.toString()
    })
  }
  return result
}

/**
 * base 64
 * @param str
 * @returns
 */
export const base64 = (str: string): string => {
  // 对字符串进行编码
  var encode = encodeURI(str)
  // 对编码的字符串转化base64
  var base64 = base64_encode(encode)
  return base64
}

const base64_encode = (str: string) => {
  var c1, c2, c3
  var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  var i = 0,
    len = str.length,
    string = ''

  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff
    if (i == len) {
      string += base64EncodeChars.charAt(c1 >> 2)
      string += base64EncodeChars.charAt((c1 & 0x3) << 4)
      string += '=='
      break
    }
    c2 = str.charCodeAt(i++)
    if (i == len) {
      string += base64EncodeChars.charAt(c1 >> 2)
      string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4))
      string += base64EncodeChars.charAt((c2 & 0xf) << 2)
      string += '='
      break
    }
    c3 = str.charCodeAt(i++)
    string += base64EncodeChars.charAt(c1 >> 2)
    string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xf0) >> 4))
    string += base64EncodeChars.charAt(((c2 & 0xf) << 2) | ((c3 & 0xc0) >> 6))
    string += base64EncodeChars.charAt(c3 & 0x3f)
  }
  return string
}

/**
 * 正则判断电话号码
 * @param phone
 * @returns
 */
export const checkMobile = (phone: string): boolean => {
  return /^1[3|4|5|8][0-9]\d{4,8}$/.test(phone)
}

/**
 * 正则验证邮箱
 * @param email
 * @returns
 */
export const checkEmail = (email: string): boolean => {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(email)
}

/**
 * 正则校验密码
 *
 * @param password
 * @returns
 */
export const checkPassowrd = (password: string): boolean => {
  return /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}$/.test(password)
}
