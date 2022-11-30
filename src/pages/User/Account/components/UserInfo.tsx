/*
 * @Author: Derek Xu
 * @Description:
 * @Date: 2022-11-30 10:34:38
 * @LastEditTime: 2022-11-30 14:23:41
 * @FilePath: \xuct-calendar-antd-pc\src\pages\User\Account\components\UserInfo.tsx
 */
import { UploadOutlined } from '@ant-design/icons'
import { ProCard } from '@ant-design/pro-components'
import { Avatar, Button, Col, Divider, message, Row, Upload, UploadProps } from 'antd'
import { FormattedMessage, useModel } from 'umi'
import styles from './index.less'

function UserInfo() {
  const { initialState } = useModel('@@initialState')
  const { currentUser } = initialState || { currentUser: undefined }

  const props: UploadProps = {
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
    <div className={`${styles.container} ${styles.userinfo}`}>
      <ProCard hoverable bordered>
        <Row gutter={16}>
          <Col className='gutter-row' span={6}>
            <div className={styles.avatar}>
              <Avatar src={currentUser?.member.avatar} size={100} />
              <Upload {...props}>
                <Button icon={<UploadOutlined />} danger type='dashed'>
                  <FormattedMessage id='pages.person.center.upload.avatar' />
                </Button>
              </Upload>
            </div>
          </Col>
          <Col className='gutter-row' span={16}>
            <div className={styles.cell}>
              <div>sdfsdf</div>
              <div>4444</div>
            </div>
            <div className={styles.cell}>
              <div>sdfsdf</div>
              <div>444</div>
            </div>
            <div className={styles.cell}>
              <div>sdfsdf</div>
              <div>444</div>
            </div>
            <div className={styles.cell}>
              <div>sdfsdf</div>
              <div>sdfsdf</div>
            </div>
          </Col>
        </Row>
      </ProCard>
    </div>
  )
}

export default UserInfo
