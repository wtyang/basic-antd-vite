// 菜单树构建、路由转换工具

import type { MenuItem } from '@/types/api'

/**
 * 扁平化菜单树（用于搜索、面包屑等场景）
 */
export function flattenMenus(menus: MenuItem[]): MenuItem[] {
  const result: MenuItem[] = []
  const traverse = (items: MenuItem[]) => {
    items.forEach((item) => {
      result.push(item)
      if (item.children?.length) {
        traverse(item.children)
      }
    })
  }
  traverse(menus)
  return result
}

/**
 * 根据路径查找菜单及其父链（用于面包屑）
 */
export function findMenuPath(
  menus: MenuItem[],
  targetPath: string,
): MenuItem[] {
  const path: MenuItem[] = []

  const find = (items: MenuItem[]): boolean => {
    for (const item of items) {
      path.push(item)
      if (item.path === targetPath) return true
      if (item.children?.length && find(item.children)) return true
      path.pop()
    }
    return false
  }

  find(menus)
  return path
}

/**
 * 过滤隐藏菜单（用于侧边栏渲染）
 */
export function filterVisibleMenus(menus: MenuItem[]): MenuItem[] {
  return menus
    .filter((item) => !item.hidden)
    .map((item) => ({
      ...item,
      children: item.children ? filterVisibleMenus(item.children) : undefined,
    }))
}
