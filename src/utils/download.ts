// 文件下载工具

/**
 * 通过 URL 下载文件
 */
export function downloadFile(url: string, filename?: string): void {
  const link = document.createElement('a')
  link.href = url
  link.download = filename || ''
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * 下载 Blob 数据为文件
 */
export function downloadBlob(
  data: Blob | ArrayBuffer,
  filename: string,
  mimeType?: string,
): void {
  const blob =
    data instanceof Blob ? data : new Blob([data], { type: mimeType })
  const url = URL.createObjectURL(blob)
  downloadFile(url, filename)
  // 延迟释放 URL，确保下载启动
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

/**
 * 从响应头中提取文件名
 */
export function extractFilename(
  contentDisposition: string | null,
): string | null {
  if (!contentDisposition) return null
  const match = contentDisposition.match(/filename\*?=(?:UTF-8'')?([^;\n]*)/)
  if (match?.[1]) {
    return decodeURIComponent(match[1].replace(/["']/g, ''))
  }
  return null
}
