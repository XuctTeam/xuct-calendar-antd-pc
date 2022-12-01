/*
 * @Author: Derek Xu
 * @Description:
 * @Date: 2022-11-30 10:34:38
 * @LastEditTime: 2022-12-01 22:41:47
 * @FilePath: \xuct-calendar-antd-pc\src\pages\User\Account\components\UserInfo.tsx
 */
import { UploadOutlined } from '@ant-design/icons'
import { ProCard } from '@ant-design/pro-components'
import { Avatar, Button, Col, Divider, message, Row, Upload, UploadProps } from 'antd'
import { FC, useEffect, useState } from 'react'
import { FormattedMessage, useModel } from 'umi'
import BindingPhone from './BindingPhone'
import ModifyPassword from './ModifyPassword'
import styles from './index.less'

const UserInfo: FC = () => {
  const [passwordOpen, setPasswordOpen] = useState<boolean>(false)
  const [phoneOpen, setPhoneOpen] = useState<boolean>(false)
  const { initialState } = useModel('@@initialState')
  const [member, setMember] = useState<USER.Userinfo>()
  const [userNameAuth, setUserNameAuth] = useState<USER.UserAuth>()
  const [phoneAuth, setPhoneAuth] = useState<USER.UserAuth>()
  const [emailAuth, setEmailAuth] = useState<USER.UserAuth>()

  useEffect(() => {
    if (!initialState?.currentUser) return
    const { member, auths } = initialState?.currentUser
    setMember(member)
    setUserNameAuth(getAuth(auths, 'user_name'))
    setPhoneAuth(getAuth(auths, 'phone'))
    setEmailAuth(getAuth(auths, 'email'))
  }, [initialState?.currentUser])

  const getAuth = (auths: USER.UserAuth[], type: string) => {
    return auths.find((item) => item.identityType === type)
  }

  const getAuthTitle = (type: string) => {
    switch (type) {
      case 'user_name':
        return <FormattedMessage id='pages.person.center.userinfo.username.label' />
      default:
        return <FormattedMessage id={`pages.person.center.userinfo.${type}.label`} />
    }
  }

  const getAuthName = (type: string) => {
    switch (type) {
      case 'user_name':
        return userNameAuth?.username
      case 'phone':
        return phoneAuth?.username
      case 'email':
        return emailAuth?.username
      default:
        return ''
    }
  }

  const upload: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text'
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
  }

  return (
    <div className={styles.container}>
      <ProCard hoverable bordered className={styles.userinfo}>
        <Row gutter={16}>
          <Col className='gutter-row' span={6}>
            <div className={styles.avatar}>
              <Avatar src={member?.avatar} size={140} />
              <Upload {...upload}>
                <Button icon={<UploadOutlined />} danger type='dashed'>
                  <FormattedMessage id='pages.person.center.upload.avatar' />
                </Button>
              </Upload>
            </div>
          </Col>
          <Col className='gutter-row' span={16}>
            <div className={styles.cell}>
              <span>
                <FormattedMessage id='pages.person.center.userinfo.name.label' />：
              </span>
              <span>{member?.name}</span>
            </div>
            {['user_name', 'phone', 'email'].map((item, index) => {
              return (
                <div key={index} className={styles.cell}>
                  <span>{getAuthTitle(item)}：</span>
                  <span>{getAuthName(item)}</span>
                </div>
              )
            })}
            <div className={styles.cell}>
              <span>
                <FormattedMessage id='pages.person.center.userinfo.last.login.label' />：
              </span>
              <span>444</span>
            </div>
          </Col>
        </Row>
        <Divider dashed orientation='left'>
          <FormattedMessage id='pages.person.center.userinfo.security.title' />
        </Divider>
        <div className={styles.detail}>
          <span>
            <FormattedMessage id='pages.person.center.userinfo.password.label' />：
          </span>
          <div className={styles.description}>
            <div>
              <FormattedMessage id='pages.person.center.userinfo.password.desc.first' />
            </div>
            <div>
              <FormattedMessage id='pages.person.center.userinfo.password.desc.second' />
            </div>
          </div>
          <Button type='link' danger onClick={() => setPasswordOpen(true)}>
            <FormattedMessage id='pages.person.center.userinfo.modify.password.title' />
          </Button>
        </div>
        <div className={styles.detail}>
          <span>{getAuthTitle('phone')}：</span>
          <div className={styles.description}>
            {phoneAuth ? (
              <>
                <span>
                  <FormattedMessage id='pages.person.center.userinfo.already.bind.phone.title' />
                </span>
                <span>{`： ${getAuthName('phone')}`}</span>
              </>
            ) : (
              <span>
                <FormattedMessage id='pages.person.center.userinfo.un.bind.phone.title' />
              </span>
            )}
            <div>
              【<FormattedMessage id='pages.person.center.userinfo.phone.warning.title' />】
            </div>
          </div>
          <div>
            <Button type='link' danger>
              {phoneAuth ? (
                <FormattedMessage id='pages.person.center.userinfo.phone.unbinding.button' />
              ) : (
                <FormattedMessage id='pages.person.center.userinfo.phone.binding.button' />
              )}
            </Button>
          </div>
        </div>
        <div className={styles.detail}>
          <span>{getAuthTitle('email')}：</span>
          <div className={styles.description}>
            <div>{emailAuth ? `您已经绑定了邮箱：${getAuthName('email')}` : '您暂未绑定邮箱'}</div>
            <div>[邮箱也可以作为登录方式之一]</div>
          </div>
          <div>修改密码</div>
        </div>
        <div className={styles.detail}>
          <span>第三方账号绑定：</span>
          <div className={styles.description}>
            <div>123123</div>
            <div>123123</div>
          </div>
          <div>修改密码</div>
        </div>
        <div className={styles.detail}>
          <span>注销账号：</span>
          <div className={styles.description}>
            <div>1.如果您不再使用此帐号，可以将其注销。注销包括关闭帐号、注销帐号两步。确认关闭后，账号将冻结，进入48小时关闭期。</div>
            <div>2.48小时后系统会再次进行复核，如复核未通过则账号自动恢复。您可根据检查结果重新申请注销。</div>
          </div>
          <div>修改密码</div>
        </div>
      </ProCard>
      <ModifyPassword modalVisit={passwordOpen} setModalVisit={setPasswordOpen}></ModifyPassword>
      <BindingPhone open={phoneOpen} setPhoneOpen={setPhoneOpen}></BindingPhone>
    </div>
  )
}

export default UserInfo
