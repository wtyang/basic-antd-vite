import React from 'react'
import { Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps, UploadFile } from 'antd'

const { Dragger } = Upload

interface FileUploadProps extends Omit<UploadProps, 'onChange'> {
  value?: UploadFile[]
  onChange?: (fileList: UploadFile[]) => void
  maxSize?: number // MB
  acceptMsg?: string
}

const FileUpload: React.FC<FileUploadProps> = ({
  value,
  onChange,
  maxSize = 2,
  acceptMsg = '点击或拖拽文件进行上传',
  ...rest
}) => {
  const props: UploadProps = {
    name: 'file',
    multiple: true,
    fileList: value,
    beforeUpload: (file) => {
      const isLtLimit = file.size / 1024 / 1024 < maxSize
      if (!isLtLimit) {
        message.error(`文件必须小于 ${maxSize}MB!`)
      }
      return isLtLimit || Upload.LIST_IGNORE
    },
    onChange: (info) => {
      const { fileList } = info
      onChange?.(fileList)
    },
    ...rest,
  }

  return (
    <div style={{ width: '100%' }}>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">{acceptMsg}</p>
        <p className="ant-upload-hint">
          支持单个或批量上传，单个大小不超过 {maxSize}MB。
        </p>
      </Dragger>
    </div>
  )
}

export default FileUpload
