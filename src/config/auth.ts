// 认证方式配置

export type AuthMode = 'jwt' | 'sso'
export type SsoProtocol = 'oidc' | 'cas'

export const authConfig = {
  mode: (import.meta.env.VITE_AUTH_MODE || 'jwt') as AuthMode,
}

export const ssoConfig = {
  protocol: 'oidc' as SsoProtocol,
  authority: import.meta.env.VITE_SSO_AUTHORITY || '',
  clientId: import.meta.env.VITE_SSO_CLIENT_ID || '',
  redirectUri: import.meta.env.VITE_SSO_REDIRECT_URI || '',
  scope: import.meta.env.VITE_SSO_SCOPE || 'openid profile',
}

/**
 * 构建 SSO 登录 URL
 */
export function buildSsoLoginUrl(): string {
  const { authority, clientId, redirectUri, scope } = ssoConfig
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope,
    state: Math.random().toString(36).slice(2),
  })
  return `${authority}/authorize?${params.toString()}`
}
