// 富文本处理工具

/**
 * 清理 HTML 内容（防 XSS）
 */
export function sanitizeHtml(html: string): string {
  const div = document.createElement('div')
  div.textContent = html
  return div.innerHTML
}

/**
 * 从 HTML 中提取纯文本
 */
export function extractText(html: string): string {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}

/**
 * 截取富文本摘要
 */
export function getHtmlSummary(html: string, maxLength = 200): string {
  const text = extractText(html)
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
