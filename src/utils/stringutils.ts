export default class stringUtils {
  /**
   * 判断字符串是否为空
   * @param str
   * @returns {boolean}
   */
  static isEmpty(str: string) {
    return str == null || str.length === 0 || str === ''
  }

  static isNotEmpty(str: string) {
    return !this.isEmpty(str)
  }

  /**
   * 正则判断电话号码
   * @param phone
   * @returns
   */
  static checkMobile(phone: string) {
    return /^1[3|4|5|8][0-9]\d{4,8}$/.test(phone)
  }

  /**
   * 正则验证邮箱
   * @param email
   * @returns
   */
  static checkEmail(email: string) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(email)
  }

  /**
   * 正则校验密码
   *
   * @param password
   * @returns
   */
  static checkPassowrd(password: string) {
    return /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}$/.test(password)
  }
}
