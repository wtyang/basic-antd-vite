// 权限控制组件

import type { ReactNode } from 'react'
import { useAccess } from '@/hooks/useAccess'

interface AccessProps {
  permission: string | string[]
  mode?: 'all' | 'any'
  fallback?: ReactNode
  children: ReactNode
}

/**
 * 权限控制组件 — 根据权限标识控制子组件的显示/隐藏
 *
 * @example
 * <Access permission="product:delete">
 *   <Button danger>删除</Button>
 * </Access>
 *
 * <Access permission={['product:edit', 'product:create']} mode="any">
 *   <Button>编辑</Button>
 * </Access>
 */
export default function Access({
  permission,
  mode = 'any',
  fallback = null,
  children,
}: AccessProps) {
  const { hasPermission } = useAccess()

  if (hasPermission(permission, mode)) {
    return <>{children}</>
  }

  return <>{fallback}</>
}
