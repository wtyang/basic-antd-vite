// 认证相关接口

import request from '../request'
import type {
  LoginParams,
  LoginResult,
  UserInfo,
  MenuResponse,
} from '@/types/api'

/**
 * 账号密码登录
 */
export function login(data: LoginParams) {
  return request.post<LoginResult>('/auth/login', data)
}

/**
 * SSO Code 换 Token
 */
export function ssoLogin(code: string) {
  return request.post<LoginResult>('/auth/sso/token', { code })
}

/**
 * 刷新 Token
 */
export function refreshToken(refreshToken: string) {
  return request.post<LoginResult>('/auth/refresh', { refreshToken })
}

/**
 * 获取当前用户信息
 */
export function getUserInfo() {
  return request.get<UserInfo>('/user/info')
}

/**
 * 获取用户菜单和权限
 */
export function getUserMenus() {
  return request.get<MenuResponse>('/user/menus')
}

/**
 * 退出登录
 */
export function logout() {
  return request.post('/auth/logout')
}
