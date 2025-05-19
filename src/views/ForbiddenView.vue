<template>
  <div class="forbidden-container">
    <div class="error-content">
      <div class="error-code">403</div>
      <div class="error-title">权限不足</div>
      <div class="error-desc">抱歉，您没有权限访问此页面</div>
      
      <div class="illustration">
        <div class="lock">
          <div class="lock-body"></div>
          <div class="lock-hole"></div>
          <div class="lock-hook"></div>
          <div class="lock-wave"></div>
        </div>
        <div class="shield">
          <div class="shield-icon"></div>
        </div>
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
  name: 'ForbiddenView',
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
.forbidden-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(145deg, #b71c1c, #e53935);
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
  background: linear-gradient(to right, #ffcdd2, #ffebee);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.error-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #ffcdd2;
}

.error-desc {
  font-size: 16px;
  margin-bottom: 30px;
  color: #ffebee;
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
  background: linear-gradient(to right, #ef5350, #f44336);
  color: white;
  box-shadow: 0 4px 15px rgba(244, 67, 54, 0.3);
}

.back-home-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(244, 67, 54, 0.4);
}

.back-btn {
  background: transparent;
  border: 2px solid #ffcdd2;
  color: #ffcdd2;
}

.back-btn:hover {
  background: rgba(255, 205, 210, 0.1);
  transform: translateY(-3px);
}

/* 插图动画 */
.illustration {
  width: 200px;
  height: 200px;
  position: relative;
  margin: 20px 0;
}

.lock {
  position: absolute;
  width: 100px;
  height: 120px;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.lock-body {
  width: 80px;
  height: 70px;
  background-color: #ffd54f;
  border-radius: 10px;
  position: absolute;
  bottom: 0;
  left: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  animation: shake 5s ease-in-out infinite;
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-2px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(2px);
  }
}

.lock-hole {
  width: 20px;
  height: 20px;
  background-color: #b71c1c;
  border-radius: 50%;
  position: absolute;
  bottom: 35px;
  left: 40px;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.2);
}

.lock-hook {
  width: 40px;
  height: 40px;
  border: 10px solid #ffd54f;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.lock-wave {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  opacity: 0;
  animation: ripple 3s linear infinite;
}

@keyframes ripple {
  0% {
    transform: translateX(-50%) scale(0.5);
    opacity: 0.5;
  }
  100% {
    transform: translateX(-50%) scale(2);
    opacity: 0;
  }
}

.shield {
  position: absolute;
  width: 60px;
  height: 80px;
  background-color: rgba(244, 67, 54, 0.3);
  top: 50px;
  left: 120px;
  border-radius: 30px 30px 50% 50%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  animation: pulsate 2s ease-in-out infinite alternate;
}

@keyframes pulsate {
  0% {
    transform: scale(1);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  100% {
    transform: scale(1.05);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  }
}

.shield-icon {
  position: absolute;
  width: 30px;
  height: 30px;
  top: 25px;
  left: 15px;
  background-color: #ffebee;
  transform: rotate(45deg);
}

.shield-icon::before,
.shield-icon::after {
  content: '';
  position: absolute;
  background-color: #ffebee;
}

.shield-icon::before {
  width: 30px;
  height: 5px;
  top: 12.5px;
  left: 0;
}

.shield-icon::after {
  width: 5px;
  height: 30px;
  top: 0;
  left: 12.5px;
}

/* 背景装饰 */
.forbidden-container::before,
.forbidden-container::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  z-index: 1;
}

.forbidden-container::before {
  top: -150px;
  left: -150px;
}

.forbidden-container::after {
  bottom: -150px;
  right: -150px;
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
  
  .lock {
    transform: translateX(-50%) scale(0.8);
  }
  
  .shield {
    transform: scale(0.8);
    left: 100px;
  }
}
</style> 