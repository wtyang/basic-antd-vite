// 前端缓存更新检测

import { notification } from 'antd'

interface VersionCheckOptions {
  interval?: number
  immediate?: boolean
  onUpdate?: () => void
}

let currentVersion: string | null = null
let checkTimer: ReturnType<typeof setInterval> | null = null

/**
 * 检查服务端版本
 */
async function checkVersion(onUpdate?: () => void): Promise<void> {
  try {
    const response = await fetch(`/version.json?t=${Date.now()}`, {
      cache: 'no-cache',
    })
    if (!response.ok) return

    const data = await response.json()
    const serverVersion = data.version as string

    if (!currentVersion) {
      // 首次记录版本号
      currentVersion = serverVersion
      return
    }

    if (currentVersion !== serverVersion) {
      // 发现新版本
      if (onUpdate) {
        onUpdate()
      } else {
        notification.info({
          message: '发现新版本',
          description: '系统已更新，请刷新页面以获取最新版本。',
          duration: 0,
          btn: undefined,
          key: 'version-update',
          onClick: () => {
            window.location.reload()
          },
        })
      }
    }
  } catch {
    // 静默失败，不影响正常使用
  }
}

/**
 * 启动版本检测轮询
 */
export function startVersionCheck(options: VersionCheckOptions = {}): void {
  const { interval = 5 * 60 * 1000, immediate = true, onUpdate } = options

  // 避免重复启动
  if (checkTimer) return

  if (immediate) {
    checkVersion(onUpdate)
  }

  checkTimer = setInterval(() => {
    checkVersion(onUpdate)
  }, interval)
}

/**
 * 停止版本检测
 */
export function stopVersionCheck(): void {
  if (checkTimer) {
    clearInterval(checkTimer)
    checkTimer = null
  }
}
