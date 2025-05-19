<template>
  <div class="splash-screen">
    <!-- 背景粒子 -->
    <div class="particles">
      <div class="particle" v-for="i in 10" :key="i"></div>
    </div>
    
    <!-- 应用logo -->
    <div class="splash-logo-container">
      <div class="splash-logo">
        <tech-icon icon="EyesOff" :size="70" :opacity="0.9" />
      </div>
    </div>
    
    <!-- 应用名称 -->
    <h1 class="splash-title">戒视</h1>
    
    <!-- 应用简介 -->
    <p class="splash-subtitle">科技助力健康用眼 · 远离视频沉迷</p>
    
    <!-- 加载动画 -->
    <div class="loading-animation">
      <div class="loading-circle"></div>
    </div>
  </div>
</template>

<script>
import TechIcon from '../components/TechIcon.vue'

export default {
  name: 'SplashView',
  components: {
    TechIcon
  },
  mounted() {
    // 2秒后自动跳转到登录页
    setTimeout(() => {
      this.$router.push('/login')
    }, 2000)
  }
}
</script>

<style scoped>
.splash-screen {
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(135deg, #2ECC71, #1E88E5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.splash-logo-container {
  position: relative;
  width: 150px;
  height: 150px;
  margin-bottom: 30px;
  z-index: 2;
}

.splash-logo {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.splash-logo::before {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: rotate(45deg);
  animation: shine 3s infinite;
}

.splash-logo::after {
  content: '';
  position: absolute;
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  z-index: -1;
}

.splash-title {
  font-size: 36px;
  font-weight: bold;
  color: white;
  margin-bottom: 15px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  letter-spacing: 2px;
}

.splash-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.loading-animation {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-circle {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
}

/* 背景粒子动画 */
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  animation: float 15s linear infinite;
}

.particle:nth-child(1) { left: 10%; top: 20%; animation-duration: 12s; animation-delay: 0s; }
.particle:nth-child(2) { left: 25%; top: 60%; animation-duration: 16s; animation-delay: 1s; }
.particle:nth-child(3) { left: 40%; top: 40%; animation-duration: 14s; animation-delay: 2s; }
.particle:nth-child(4) { left: 60%; top: 70%; animation-duration: 18s; animation-delay: 3s; }
.particle:nth-child(5) { left: 75%; top: 30%; animation-duration: 15s; animation-delay: 4s; }
.particle:nth-child(6) { left: 85%; top: 50%; animation-duration: 13s; animation-delay: 5s; }
.particle:nth-child(7) { left: 90%; top: 10%; animation-duration: 17s; animation-delay: 6s; }
.particle:nth-child(8) { left: 15%; top: 80%; animation-duration: 19s; animation-delay: 7s; }
.particle:nth-child(9) { left: 50%; top: 15%; animation-duration: 20s; animation-delay: 8s; }
.particle:nth-child(10) { left: 30%; top: 90%; animation-duration: 10s; animation-delay: 9s; }
</style> 