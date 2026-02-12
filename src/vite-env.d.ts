/// <reference types="vite/client" />

// 环境变量类型声明
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_AUTH_MODE: 'jwt' | 'sso'
  readonly VITE_SSO_AUTHORITY: string
  readonly VITE_SSO_CLIENT_ID: string
  readonly VITE_SSO_REDIRECT_URI: string
  readonly VITE_SSO_SCOPE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
