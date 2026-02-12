// 图片/文件上传工具

import axios from 'axios'
import { getToken } from './auth'

interface UploadOptions {
  action?: string
  headers?: Record<string, string>
  data?: Record<string, string>
  onProgress?: (percent: number) => void
}

interface UploadResult {
  url: string
  name: string
  size: number
}

/**
 * 上传文件到服务器
 */
export async function uploadFile(
  file: File,
  options: UploadOptions = {},
): Promise<UploadResult> {
  const {
    action = '/api/upload',
    headers = {},
    data = {},
    onProgress,
  } = options

  const formData = new FormData()
  formData.append('file', file)
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value)
  })

  const token = getToken()
  const response = await axios.post(action, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    onUploadProgress: (event) => {
      if (event.total && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100)
        onProgress(percent)
      }
    },
  })

  return response.data?.data || response.data
}

/**
 * 上传图片（自动检查类型和大小）
 */
export async function uploadImage(
  file: File,
  options: UploadOptions & { maxSize?: number } = {},
): Promise<UploadResult> {
  const { maxSize = 5, ...rest } = options

  // 检查文件类型
  if (!file.type.startsWith('image/')) {
    throw new Error('请选择图片文件')
  }

  // 检查文件大小（MB）
  if (file.size / 1024 / 1024 > maxSize) {
    throw new Error(`图片大小不能超过 ${maxSize}MB`)
  }

  return uploadFile(file, rest)
}
