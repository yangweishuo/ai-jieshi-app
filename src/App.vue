<template>
  <router-view/>
</template>

<script>
import { logAllIcons } from './utils/getIconList'

export default {
  name: 'App',
  mounted() {
    // 在开发环境中输出可用图标列表
    if (process.env.NODE_ENV === 'development') {
      logAllIcons()
    }
  }
}
</script>

<style>
/* 全局样式已移至base.css */
</style>
