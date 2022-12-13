/*
 * @Author: Derek Xu
 * @Date: 2022-12-13 16:02:04
 * @LastEditors: Derek Xu
 * @LastEditTime: 2022-12-13 18:27:17
 * @FilePath: \xuct-calendar-antd-pc\src\layouts\components\UserInfoForm.tsx
 * @Description:
 *
 * Copyright (c) 2022 by 楚恬商行, All Rights Reserved.
 */
import React, { FC, useEffect, useState } from 'react'
import { Avatar, Button, Col, Divider, Drawer, Input, message, Row, Upload, UploadProps } from 'antd'
import { FormattedMessage, useModel } from 'umi'
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons'
import styles from '../index.less'
import { ProFormText } from '@ant-design/pro-components'

interface IPageOption {
  open: boolean
  setOpen: (e: React.MouseEvent | React.KeyboardEvent) => void
}

interface DescriptionItemProps {
  title: string
  content: React.ReactNode
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
  <div className='site-description-item-profile-wrapper'>
    <p className='site-description-item-profile-p-label'>{title}:</p>
    {content}
  </div>
)

const UserInfoForm: FC<IPageOption> = ({ open, setOpen }) => {
  const { initialState } = useModel('@@initialState')
  const [member, setMember] = useState<USER.Userinfo>()
  const [userNameAuth, setUserNameAuth] = useState<USER.UserAuth>()
  const [phoneAuth, setPhoneAuth] = useState<USER.UserAuth>()
  const [emailAuth, setEmailAuth] = useState<USER.UserAuth>()
  const [nameEdit, setNameEdit] = useState<boolean>(false)

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
      <Row className={styles.item} justify='center' align='middle'>
        <Col span={2}>
          <FormattedMessage id='pages.person.center.name.label' />
        </Col>
        <Col span={18}>
          <Input style={{ width: '100%' }} maxLength={20} defaultValue={member?.name} disabled={!nameEdit} bordered={false} />
        </Col>
        <Col span={4}>
          {nameEdit ? (
            <Button type='link' onClick={() => setNameEdit(false)}>
              保存
            </Button>
          ) : (
            <Button type='link' danger onClick={() => setNameEdit(true)}>
              修改
            </Button>
          )}
        </Col>
      </Row>
      <Row className={styles.item} justify='center' align='middle'>
        <Col span={2}>
          <FormattedMessage id='pages.person.center.name.label' />
        </Col>
        <Col span={18}>
          <Input style={{ width: '100%' }} maxLength={20} defaultValue='https://ant.design' disabled={!nameEdit} bordered={false} />
        </Col>
        <Col span={4}>
          {nameEdit ? (
            <Button type='link' onClick={() => setNameEdit(false)}>
              保存
            </Button>
          ) : (
            <Button type='link' danger onClick={() => setNameEdit(true)}>
              修改
            </Button>
          )}
        </Col>
      </Row>
    </Drawer>
  )
}

export default UserInfoForm
