// 本地存储封装 — 安全序列化/反序列化

const PREFIX = 'admin_'

/**
 * 设置存储项（自动 JSON 序列化）
 */
export function setItem<T>(key: string, value: T): void {
  try {
    const serialized = JSON.stringify(value)
    localStorage.setItem(PREFIX + key, serialized)
  } catch (error) {
    console.error(`存储写入失败: ${key}`, error)
  }
}

/**
 * 获取存储项（自动 JSON 反序列化）
 */
export function getItem<T>(key: string, defaultValue?: T): T | undefined {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (raw === null) return defaultValue
    return JSON.parse(raw) as T
  } catch {
    return defaultValue
  }
}

/**
 * 移除存储项
 */
export function removeItem(key: string): void {
  localStorage.removeItem(PREFIX + key)
}

/**
 * 清除所有带前缀的存储项
 */
export function clearAll(): void {
  const keys = Object.keys(localStorage).filter((k) => k.startsWith(PREFIX))
  keys.forEach((k) => localStorage.removeItem(k))
}
