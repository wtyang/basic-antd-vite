// 权限判断 Hook

import { useUserStore } from '@/store'

export function useAccess() {
  const permissions = useUserStore((s) => s.permissions)

  /**
   * 判断是否拥有指定权限
   * @param permission 权限标识或权限标识数组
   * @param mode 'all' 全部满足 | 'any' 满足任一
   */
  const hasPermission = (
    permission: string | string[],
    mode: 'all' | 'any' = 'any',
  ): boolean => {
    if (!permission) return true

    // 超级管理员权限
    if (permissions.includes('*:*:*') || permissions.includes('*')) {
      return true
    }

    const perms = Array.isArray(permission) ? permission : [permission]
    if (mode === 'any') {
      return perms.some((p) => permissions.includes(p))
    }
    return perms.every((p) => permissions.includes(p))
  }

  return { permissions, hasPermission }
}
