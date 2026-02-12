// URL 解析/格式化工具

interface ParsedUrl {
  protocol: string
  host: string
  pathname: string
  params: Record<string, string>
  hash: string
  origin: string
}

/**
 * 解析 URL 为结构化对象
 */
export function parseUrl(url: string): ParsedUrl {
  try {
    const u = new URL(url, window.location.origin)
    const params: Record<string, string> = {}
    u.searchParams.forEach((value, key) => {
      params[key] = value
    })
    return {
      protocol: u.protocol,
      host: u.host,
      pathname: u.pathname,
      params,
      hash: u.hash,
      origin: u.origin,
    }
  } catch {
    return {
      protocol: '',
      host: '',
      pathname: url,
      params: {},
      hash: '',
      origin: '',
    }
  }
}

/**
 * 向 URL 追加查询参数
 */
export function appendParams(
  url: string,
  params: Record<string, string | number | boolean>,
): string {
  const u = new URL(url, window.location.origin)
  Object.entries(params).forEach(([key, value]) => {
    u.searchParams.set(key, String(value))
  })
  // 如果原始 URL 是相对路径，返回相对路径
  if (!url.startsWith('http')) {
    return u.pathname + u.search + u.hash
  }
  return u.toString()
}

/**
 * 从 URL 中提取指定参数
 */
export function getUrlParam(url: string, key: string): string | null {
  try {
    const u = new URL(url, window.location.origin)
    return u.searchParams.get(key)
  } catch {
    return null
  }
}
