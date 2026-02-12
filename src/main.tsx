import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

async function enableMocking() {
  console.log('[MSW] enableMocking called, MODE:', import.meta.env.MODE)
  if (import.meta.env.MODE !== 'development') {
    return
  }
  const { worker } = await import('./mocks/browser')
  console.log('[MSW] worker imported')
  return worker.start({
    onUnhandledRequest: 'bypass', // 不拦截未处理的请求（如静态资源）
  }).then(() => {
    console.log('[MSW] worker started successfully')
  }).catch(err => {
    console.error('[MSW] worker start failed:', err)
  })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
