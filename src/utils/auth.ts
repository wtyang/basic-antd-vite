// Token 操作工具

import { getItem, setItem, removeItem } from './storage'

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

export function getToken(): string | undefined {
  return getItem<string>(ACCESS_TOKEN_KEY)
}

export function setToken(token: string): void {
  setItem(ACCESS_TOKEN_KEY, token)
}

export function removeToken(): void {
  removeItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken(): string | undefined {
  return getItem<string>(REFRESH_TOKEN_KEY)
}

export function setRefreshToken(token: string): void {
  setItem(REFRESH_TOKEN_KEY, token)
}

export function removeRefreshToken(): void {
  removeItem(REFRESH_TOKEN_KEY)
}

/**
 * 清除所有认证信息
 */
export function clearAuth(): void {
  removeToken()
  removeRefreshToken()
}
