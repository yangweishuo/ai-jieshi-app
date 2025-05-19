<template>
  <component 
    v-if="isValidIconName"
    :is="iconComponent" 
    :theme="theme" 
    :size="size" 
    :fill="fillColor" 
    :stroke-width="strokeWidth"
    :class="[
      'tech-icon', 
      { 'tech-icon-pulse': pulse }, 
      { 'tech-icon-spin': spin },
      customClass
    ]"
  />
  <span v-else class="icon-fallback">?</span>
</template>

<script>
import * as Icons from '@icon-park/vue-next'

export default {
  name: 'TechIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number],
      default: '24'
    },
    theme: {
      type: String,
      default: 'outline'
    },
    strokeWidth: {
      type: Number,
      default: 2
    },
    customClass: {
      type: String,
      default: ''
    },
    pulse: {
      type: Boolean,
      default: false
    },
    spin: {
      type: Boolean,
      default: false
    },
    blueGradient: {
      type: Boolean,
      default: true
    },
    opacity: {
      type: Number,
      default: 0.7
    }
  },
  data() {
    return {
      isValidIconName: false
    }
  },
  computed: {
    iconComponent() {
      // 直接返回IconPark中对应的组件
      return Icons[this.icon]
    },
    fillColor() {
      if (!this.blueGradient) return [];
      
      // 创建蓝色系渐变填充
      return [
        `rgba(30, 136, 229, ${this.opacity})`,
        `rgba(30, 136, 229, ${this.opacity * 0.8})`, 
        `rgba(30, 136, 229, ${this.opacity * 0.6})`,
        `rgba(30, 136, 229, ${this.opacity * 0.4})`
      ];
    }
  },
  mounted() {
    // 检查图标是否存在于IconPark中
    this.isValidIconName = !!Icons[this.icon]
    
    if (!this.isValidIconName && process.env.NODE_ENV === 'development') {
      console.warn(`图标 "${this.icon}" 不存在，请检查图标名称是否正确。`)
    }
  }
}
</script>

<style scoped>
.tech-icon {
  vertical-align: middle;
  display: inline-block;
}

.icon-fallback {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #f0f0f0;
  color: #999;
  font-size: 16px;
}
</style> 