<template>
  <div class="bottom-nav">
    <router-link v-for="item in navItems" :key="item.path" :to="item.path" class="nav-item" :class="{ active: currentRoute === item.path }">
      <div class="nav-icon" :class="{ 'social-nav-icon': item.icon === 'People' }">
        <tech-icon :icon="item.icon" :size="24" :pulse="currentRoute === item.path && item.pulse" />
        <div class="particle-flow" v-if="item.icon === 'People'"></div>
      </div>
      <span class="label">{{ item.label }}</span>
    </router-link>
  </div>
</template>

<script>
import TechIcon from './TechIcon.vue'

export default {
  name: 'BottomNav',
  components: {
    TechIcon
  },
  data() {
    return {
      navItems: [
        { path: '/home', label: '首页', icon: 'Home', pulse: false },
        { path: '/focus', label: '统计', icon: 'TrendingUp', pulse: false },
        { path: '/checkin', label: '社交圈', icon: 'People', pulse: true },
        { path: '/profile', label: '我的', icon: 'User', pulse: false }
      ]
    }
  },
  computed: {
    currentRoute() {
      return this.$route.path
    }
  },
  mounted() {
    // 添加底部菜单的点击波纹效果
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', this.createRippleEffect);
    });
  },
  methods: {
    createRippleEffect(event) {
      const button = event.currentTarget;
      const circle = document.createElement('span');
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
      circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
      circle.classList.add('nav-ripple');

      // 删除已有的ripple元素
      const ripple = button.querySelector('.nav-ripple');
      if (ripple) {
        ripple.remove();
      }

      button.appendChild(circle);

      // 动画结束后移除
      setTimeout(() => {
        circle.remove();
      }, 600);
    }
  }
}
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 100%;
  padding-top: 12px;
  cursor: pointer;
  color: #aaa;
  transition: all 0.3s ease;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.nav-item.active {
  color: var(--secondary-color);
}

.nav-icon {
  position: relative;
  margin-bottom: 5px;
}

.nav-item .label {
  font-size: 12px;
  font-weight: 500;
}

/* 社交菜单特效 */
.social-nav-icon {
  position: relative;
}

.social-nav-icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  background: rgba(30, 136, 229, 0.1);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  opacity: 0;
  transition: all 0.3s ease;
}

.nav-item.active .social-nav-icon::before {
  opacity: 1;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.7;
  }
  70% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}

.particle-flow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* 波纹效果 */
.nav-ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  background: rgba(30, 136, 229, 0.2);
  animation: ripple 0.6s linear;
  pointer-events: none;
}

@keyframes ripple {
  to {
    transform: scale(2.5);
    opacity: 0;
  }
}

/* 悬浮提示 */
.nav-item::before {
  content: attr(data-tooltip);
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.nav-item:hover::before {
  opacity: 0.7;
  transform: translateX(-50%) translateY(0);
  visibility: visible;
}

/* 点击缩放效果 */
.nav-item:active .nav-icon {
  transform: scale(0.85);
  transition: transform 0.2s ease;
}
</style> 