/*
 * @Author: Derek Xu
 * @Date: 2022-12-13 16:02:04
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-14 15:11:31
 * @FilePath: \xuct-calendar-antd-pc\src\layouts\components\UserInfoForm.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import React, { FC, useEffect, useState } from 'react'
import { Avatar, Button, Col, Divider, Drawer, Input, message, Row, Upload, UploadProps } from 'antd'
import { FormattedMessage, useModel } from 'umi'
import { UploadOutlined } from '@ant-design/icons'
import { modifyName } from '@/services/user'
import styles from './UserInfoForm.less'

interface IPageOption {
  open: boolean
  setOpen: (e: React.MouseEvent | React.KeyboardEvent) => void
  onUpateUserName: (name: string) => void
}

const UserInfoForm: FC<IPageOption> = ({ open, setOpen, onUpateUserName }) => {
  const { initialState } = useModel('@@initialState')
  const [member, setMember] = useState<USER.Userinfo>()
  const [userNameAuth, setUserNameAuth] = useState<USER.UserAuth>()
  const [phoneAuth, setPhoneAuth] = useState<USER.UserAuth>()
  const [emailAuth, setEmailAuth] = useState<USER.UserAuth>()
  const [nameEdit, setNameEdit] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [nameLoading, setNameLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!initialState?.currentUser) return
    const { member, auths } = initialState?.currentUser
    setMember(member)
    setName(member.name)
    setUserNameAuth(getAuth(auths, 'user_name'))
    setPhoneAuth(getAuth(auths, 'phone'))
    setEmailAuth(getAuth(auths, 'email'))
  }, [initialState?.currentUser])

  const getAuth = (auths: USER.UserAuth[], type: string) => {
    return auths.find((item) => item.identityType === type)
  }

  const authTitleLabel = {
    user_name: <FormattedMessage id='pages.person.center.userinfo.username.label' />,
    phone: <FormattedMessage id={`pages.person.center.userinfo.phone.label`} />,
    email: <FormattedMessage id={`pages.person.center.userinfo.email.label`} />
  }

  const authTitleDesc = {
    user_name: <FormattedMessage id='pages.person.center.userinfo.username.desc' />,
    phone: <FormattedMessage id='pages.person.center.userinfo.phone.desc' />,
    email: <FormattedMessage id='pages.person.center.userinfo.email.desc' />
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

  const nameOnchage = (e: any) => {
    setName(e.currentTarget.value)
  }

  const saveOrUpdateName = () => {
    if (!nameEdit) {
      setNameEdit(!nameEdit)
      return
    }
    if (!name) {
      setNameEdit(!nameEdit)
      setName(member?.name || '')
      return
    }
    if (nameEdit && member?.name === name) {
      setNameEdit(!nameEdit)
      setName(member?.name || '')
      return
    }
    setNameLoading(true)
    modifyName(name)
      .then(() => {
        onUpateUserName(name)
        setNameLoading(false)
        setNameEdit(!nameEdit)
      })
      .catch((err) => {
        console.log(err)
        setNameLoading(false)
        setNameEdit(!nameEdit)
      })
  }

  return (
    <Drawer title={<FormattedMessage id='pages.userinfo.title' />} width={640} placement='right' closable={false} onClose={setOpen} open={open}>
      <div className={styles.cell}>
        <Avatar src={member?.avatar} size={120} />
        <Upload {...upload}>
          <Button icon={<UploadOutlined />} danger type='dashed'>
            <FormattedMessage id='pages.person.center.upload.avatar' />
          </Button>
        </Upload>
      </div>
      <Divider orientation='left' plain>
        <FormattedMessage id='pages.person.center.userinfo' />
      </Divider>
      <Row className={styles.item} justify='start' align='middle'>
        <Col span={12} className={styles.cell}>
          <span>
            <FormattedMessage id='pages.person.center.name.label' />
          </span>
          <div className={styles.name}>
            {nameEdit ? <Input maxLength={20} value={name} onChange={nameOnchage} /> : <span>{name}</span>}
            <Button type='link' onClick={saveOrUpdateName} danger={!nameEdit} loading={nameLoading}>
              {nameEdit ? <FormattedMessage id='pages.person.center.name.save.button' /> : <FormattedMessage id='pages.person.center.name.update.button' />}
            </Button>
          </div>
        </Col>
        <Col span={12} className={styles.cell}>
          <span>
            <FormattedMessage id='pages.person.center.last.login.time' />
          </span>
          <div>1111</div>
        </Col>
      </Row>
      <Divider orientation='left' plain>
        <FormattedMessage id='pages.person.center.security' />
      </Divider>
      <Row className={`${styles.item}  ${styles.security}`} justify='start' align='middle'>
        <Col span={20} className={styles.col}>
          <div>{authTitleLabel.user_name}</div>
          <div>
            <span>{authTitleDesc.user_name}</span>
            <span>{userNameAuth && `【${userNameAuth.username}】`}</span>
          </div>
        </Col>
        <Col span={4}>{!userNameAuth && <Button>234234</Button>}</Col>
      </Row>
      <Row className={`${styles.item}  ${styles.security}`} justify='start' align='middle'>
        <Col span={20} className={styles.col}>
          <div>{authTitleLabel.phone}</div>
          <div>
            <span>{authTitleDesc.phone}</span>
            <span>{phoneAuth && `【${phoneAuth.username}】`}</span>
          </div>
        </Col>
        <Col span={4}>
          <Button type='link' danger>
            {phoneAuth ? (
              <FormattedMessage id='pages.person.center.userinfo.phone.unbinding.button' />
            ) : (
              <FormattedMessage id='pages.person.center.userinfo.phone.bind.button' />
            )}
          </Button>
        </Col>
      </Row>
      <Row className={`${styles.item}  ${styles.security}`} justify='start' align='middle'>
        <Col span={20} className={styles.col}>
          <div>{authTitleLabel.email}</div>
          <div>
            <span>{authTitleDesc.email}</span>
            <span>{emailAuth && `【${emailAuth.username}】`}</span>
          </div>
        </Col>
        <Col span={4}>11</Col>
      </Row>
    </Drawer>
  )
}

export default UserInfoForm
