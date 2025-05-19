import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as Icons from '@icon-park/vue-next'

// 导入全局样式
import './assets/styles/base.css'

// 在开发环境中引入mock
if (process.env.NODE_ENV === 'development') {
  require('./mock')
}

const app = createApp(App)

// 注册所有图标组件
for (const [key, component] of Object.entries(Icons)) {
  // 只注册真正的组件
  if (component && typeof component === 'object' && component.render) {
    app.component(key, component)
  }
}

app.use(router).mount('#app')
