// API 通用响应类型
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

// 分页请求参数
export interface PaginationParams {
  current: number
  pageSize: number
}

// 分页响应数据
export interface PaginationResult<T> {
  list: T[]
  total: number
  current: number
  pageSize: number
}

// 登录请求参数
export interface LoginParams {
  username: string
  password: string
  captcha?: string
}

// 登录响应
export interface LoginResult {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

// 用户信息
export interface UserInfo {
  id: number
  username: string
  nickname: string
  avatar: string
  email: string
  roles: string[]
}

// 菜单项（后端返回）
export interface MenuItem {
  id: number
  name: string
  path: string
  component?: string
  icon?: string
  hidden?: boolean
  children?: MenuItem[]
}

// 菜单权限响应
export interface MenuResponse {
  menus: MenuItem[]
  permissions: string[]
}
