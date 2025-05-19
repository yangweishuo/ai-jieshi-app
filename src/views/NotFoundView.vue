<template>
  <div class="not-found-container">
    <div class="error-content">
      <div class="error-code">404</div>
      <div class="error-title">页面不见了</div>
      <div class="error-desc">抱歉，您访问的页面好像飘走了...</div>
      
      <div class="illustration">
        <div class="astronaut">
          <div class="astronaut-body"></div>
          <div class="astronaut-head"></div>
          <div class="astronaut-arm arm-left"></div>
          <div class="astronaut-arm arm-right"></div>
          <div class="astronaut-leg leg-left"></div>
          <div class="astronaut-leg leg-right"></div>
        </div>
        <div class="planet"></div>
        <div class="stars"></div>
      </div>
      
      <div class="actions">
        <button class="back-home-btn" @click="goToHome">返回首页</button>
        <button class="back-btn" @click="goBack">返回上一页</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',
  methods: {
    goToHome() {
      this.$router.push('/home')
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(145deg, #1a237e, #0d47a1);
  overflow: hidden;
  position: relative;
  color: white;
  font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 2;
  padding: 20px;
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-code {
  font-size: 120px;
  font-weight: 800;
  margin-bottom: 10px;
  background: linear-gradient(to right, #64b5f6, #1e88e5);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.error-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #bbdefb;
}

.error-desc {
  font-size: 16px;
  margin-bottom: 30px;
  color: #90caf9;
  opacity: 0.8;
}

.actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}

.back-home-btn, .back-btn {
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.back-home-btn {
  background: linear-gradient(to right, #42a5f5, #1976d2);
  color: white;
  box-shadow: 0 4px 15px rgba(25, 118, 210, 0.3);
}

.back-home-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(25, 118, 210, 0.4);
}

.back-btn {
  background: transparent;
  border: 2px solid #90caf9;
  color: #90caf9;
}

.back-btn:hover {
  background: rgba(144, 202, 249, 0.1);
  transform: translateY(-3px);
}

/* 插图动画 */
.illustration {
  width: 200px;
  height: 200px;
  position: relative;
  margin: 20px 0;
}

.astronaut {
  position: absolute;
  width: 60px;
  height: 60px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: float-astronaut 5s ease-in-out infinite;
  z-index: 2;
}

@keyframes float-astronaut {
  0%, 100% {
    transform: translate(-50%, -50%) rotate(5deg);
  }
  50% {
    transform: translate(-50%, -60%) rotate(-5deg);
  }
}

.astronaut-body {
  width: 30px;
  height: 45px;
  background-color: #ffffff;
  border-radius: 10px;
  position: absolute;
  top: 10px;
  left: 15px;
}

.astronaut-head {
  width: 25px;
  height: 25px;
  background-color: #f5f5f5;
  border-radius: 50%;
  position: absolute;
  top: -5px;
  left: 17.5px;
  border: 2px solid #e0e0e0;
}

.astronaut-arm {
  width: 10px;
  height: 30px;
  background-color: #f5f5f5;
  position: absolute;
  border-radius: 5px;
}

.arm-left {
  left: 5px;
  top: 15px;
  transform: rotate(-20deg);
  animation: wave-arm 2s ease-in-out infinite;
}

@keyframes wave-arm {
  0%, 100% {
    transform: rotate(-20deg);
  }
  50% {
    transform: rotate(-60deg);
  }
}

.arm-right {
  right: 5px;
  top: 15px;
  transform: rotate(20deg);
}

.astronaut-leg {
  width: 10px;
  height: 20px;
  background-color: #f5f5f5;
  position: absolute;
  bottom: -15px;
  border-radius: 5px;
}

.leg-left {
  left: 15px;
}

.leg-right {
  right: 15px;
}

.planet {
  width: 120px;
  height: 120px;
  background: radial-gradient(circle at 40px 40px, #64b5f6, #1565c0);
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: inset -10px -10px 20px rgba(0, 0, 0, 0.2), 0 0 20px rgba(100, 181, 246, 0.6);
  animation: rotate-planet 20s linear infinite;
}

@keyframes rotate-planet {
  0% {
    transform: translateX(-50%) rotate(0);
  }
  100% {
    transform: translateX(-50%) rotate(360deg);
  }
}

.stars {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.stars::before,
.stars::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(white 1px, transparent 1px),
    radial-gradient(white 1px, transparent 1px);
  background-size: 30px 30px;
  background-position: 0 0, 15px 15px;
  animation: twinkle 3s ease-in-out infinite alternate;
}

.stars::after {
  background-size: 20px 20px;
  background-position: 5px 5px, 15px 15px;
  animation-delay: 1s;
}

@keyframes twinkle {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.8;
  }
}

/* 为移动设备添加响应式样式 */
@media (max-width: 768px) {
  .error-code {
    font-size: 90px;
  }
  
  .error-title {
    font-size: 24px;
  }
  
  .error-desc {
    font-size: 14px;
  }
  
  .actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .illustration {
    width: 160px;
    height: 160px;
  }
}
</style> 