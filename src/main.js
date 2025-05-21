import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as Icons from '@icon-park/vue-next'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart, PieChart, RadarChart, SankeyChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
  DataZoomComponent
} from 'echarts/components'
import VueECharts from 'vue-echarts'

// 导入全局样式
import './assets/styles/base.css'

// 在开发环境中引入mock
if (process.env.NODE_ENV === 'development') {
  require('./mock')
}

// 注册 ECharts 需要的组件
use([
  CanvasRenderer,
  LineChart,
  BarChart,
  PieChart,
  RadarChart,
  SankeyChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
  DataZoomComponent
])

const app = createApp(App)

// 注册 ECharts 组件
app.component('v-chart', VueECharts)

// 注册所有图标组件
for (const [key, component] of Object.entries(Icons)) {
  // 只注册真正的组件
  if (component && typeof component === 'object' && component.render) {
    app.component(key, component)
  }
}

app.use(router).mount('#app')
