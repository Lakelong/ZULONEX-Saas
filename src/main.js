import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

function showStartupError() {
  const root = document.querySelector('#app')
  if (!root) return

  const panel = document.createElement('main')
  panel.className = 'startup-error'

  const title = document.createElement('h1')
  title.textContent = '页面暂时无法加载'

  const message = document.createElement('p')
  message.textContent = '请刷新页面重试；若问题持续，请联系系统管理员。'

  const reload = document.createElement('button')
  reload.type = 'button'
  reload.textContent = '重新加载'
  reload.addEventListener('click', () => window.location.reload())

  panel.append(title, message, reload)
  root.replaceChildren(panel)
}

const app = createApp(App)
let mounted = false

app.config.errorHandler = (error, _instance, info) => {
  console.error('Application error:', info, error)
  if (!mounted) showStartupError()
}

try {
  app.mount('#app')
  mounted = true
} catch (error) {
  console.error('Application startup failed:', error)
  showStartupError()
}
