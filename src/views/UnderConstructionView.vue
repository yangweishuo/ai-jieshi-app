<template>
  <div class="under-construction-container">
    <div class="content">
      <div class="title-block">
        <div class="construction-emoji">🚧</div>
        <h1 class="title">功能开发中</h1>
        <p class="subtitle">我们正在努力打造更优质的体验</p>
      </div>
      
      <div class="illustration">
        <div class="construction-scene">
          <div class="building">
            <div class="floor floor-1"></div>
            <div class="floor floor-2"></div>
            <div class="floor floor-3"></div>
            <div class="crane">
              <div class="crane-arm"></div>
              <div class="crane-tower"></div>
              <div class="crane-weight"></div>
              <div class="crane-cabin"></div>
              <div class="crane-cable"></div>
            </div>
          </div>
          <div class="worker worker-1"></div>
          <div class="worker worker-2"></div>
          <div class="scaffolding"></div>
        </div>
      </div>
      
      <div class="progress-section">
        <div class="progress-text">
          <span>开发进度</span>
          <span>{{ progressPercent }}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
      </div>
      
      <div class="message">
        <p>预计完成时间: {{ estimatedCompletionDate }}</p>
        <p>{{ message }}</p>
      </div>
      
      <div class="actions">
        <button class="back-home-btn" @click="goToHome">返回首页</button>
        <button class="check-updates-btn" @click="checkUpdates">查看更新</button>
      </div>
    </div>
    
    <div class="decoration decoration-1"></div>
    <div class="decoration decoration-2"></div>
    <div class="decoration decoration-3"></div>
  </div>
</template>

<script>
export default {
  name: 'UnderConstructionView',
  data() {
    return {
      progressPercent: 65,
      estimatedCompletionDate: '2023-12-31',
      message: '此功能将为您带来更科学的用眼管理体验，敬请期待！',
      animationActive: true
    }
  },
  methods: {
    goToHome() {
      this.$router.push('/home')
    },
    checkUpdates() {
      // 这里可以添加查看更新的逻辑，例如弹出对话框或跳转到更新页面
      alert('我们会在功能上线后通知您，感谢您的期待！')
    }
  }
}
</script>

<style scoped>
.under-construction-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  font-family: 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.content {
  max-width: 600px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  z-index: 2;
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

.title-block {
  margin-bottom: 30px;
}

.construction-emoji {
  font-size: 48px;
  margin-bottom: 15px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

.title {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
  background: linear-gradient(to right, #4facfe, #00f2fe);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  font-size: 18px;
  color: #666;
  margin-bottom: 0;
}

.illustration {
  height: 200px;
  position: relative;
  margin: 30px 0;
  overflow: hidden;
}

.construction-scene {
  position: relative;
  width: 100%;
  height: 100%;
}

.building {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 150px;
}

.floor {
  position: absolute;
  width: 100%;
  background: linear-gradient(to right, #e6e6e6, #cccccc);
  border: 1px solid #bbb;
  border-radius: 5px;
}

.floor-1 {
  height: 40px;
  bottom: 0;
  left: 0;
  width: 100%;
}

.floor-2 {
  height: 40px;
  bottom: 42px;
  left: 10px;
  width: 80%;
}

.floor-3 {
  height: 40px;
  bottom: 84px;
  left: 20px;
  width: 60%;
  animation: construct 3s infinite alternate;
}

@keyframes construct {
  0% {
    opacity: 0.3;
    transform: translateY(5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.crane {
  position: absolute;
  bottom: 0;
  right: -60px;
  width: 120px;
  height: 180px;
}

.crane-tower {
  position: absolute;
  bottom: 0;
  left: 50px;
  width: 15px;
  height: 150px;
  background: #ff6b6b;
}

.crane-arm {
  position: absolute;
  top: 30px;
  left: 20px;
  width: 100px;
  height: 15px;
  background: #ff6b6b;
  transform-origin: left center;
  animation: craneArm 5s ease-in-out infinite alternate;
}

@keyframes craneArm {
  0% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(5deg);
  }
}

.crane-weight {
  position: absolute;
  top: 15px;
  left: 20px;
  width: 20px;
  height: 20px;
  background: #555;
  border-radius: 3px;
}

.crane-cabin {
  position: absolute;
  bottom: 150px;
  left: 40px;
  width: 35px;
  height: 25px;
  background: #ffcc5c;
  border-radius: 3px;
}

.crane-cable {
  position: absolute;
  top: 45px;
  left: 80px;
  width: 2px;
  height: 60px;
  background: #333;
  animation: cable 5s ease-in-out infinite alternate;
}

@keyframes cable {
  0% {
    height: 50px;
    transform: rotate(2deg);
  }
  100% {
    height: 70px;
    transform: rotate(-2deg);
  }
}

.worker {
  position: absolute;
  width: 20px;
  height: 30px;
  background: #3498db;
  border-radius: 50% 50% 0 0;
}

.worker::after {
  content: '';
  position: absolute;
  top: -8px;
  left: 2px;
  width: 16px;
  height: 8px;
  background: #f1c40f;
  border-radius: 50% 50% 0 0;
}

.worker-1 {
  bottom: 41px;
  left: 160px;
  animation: work1 4s infinite;
}

.worker-2 {
  bottom: 0;
  left: 80px;
  animation: work2 3s infinite;
}

@keyframes work1 {
  0%, 100% {
    transform: translateX(0) rotateZ(0);
  }
  50% {
    transform: translateX(10px) rotateZ(10deg);
  }
}

@keyframes work2 {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.scaffolding {
  position: absolute;
  bottom: 0;
  left: 140px;
  width: 80px;
  height: 100px;
  border: 2px solid #95a5a6;
  border-bottom: none;
  border-top: none;
  background: linear-gradient(to right, transparent 49%, #95a5a6 49%, #95a5a6 51%, transparent 51%);
}

.progress-section {
  margin: 30px 0;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}

.progress-bar {
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(to right, #4facfe, #00f2fe);
  border-radius: 5px;
  width: 0;
  animation: progressFill 2s forwards 0.5s;
}

@keyframes progressFill {
  from {
    width: 0;
  }
  to {
    width: var(--progress-width);
  }
}

.message {
  margin: 20px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
}

.back-home-btn, .check-updates-btn {
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.back-home-btn {
  background: linear-gradient(to right, #4facfe, #00f2fe);
  color: white;
  box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
}

.back-home-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 188, 212, 0.4);
}

.check-updates-btn {
  background: transparent;
  border: 2px solid #4facfe;
  color: #4facfe;
}

.check-updates-btn:hover {
  background: rgba(79, 172, 254, 0.1);
  transform: translateY(-3px);
}

/* 背景装饰 */
.decoration {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(79, 172, 254, 0.1), rgba(0, 242, 254, 0.1));
  z-index: 1;
}

.decoration-1 {
  width: 300px;
  height: 300px;
  top: -150px;
  left: -150px;
  animation: float 15s infinite alternate;
}

.decoration-2 {
  width: 200px;
  height: 200px;
  bottom: -100px;
  right: -100px;
  animation: float 10s infinite alternate-reverse;
}

.decoration-3 {
  width: 150px;
  height: 150px;
  top: 30%;
  right: 10%;
  animation: float 12s infinite alternate;
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(20px, 20px);
  }
}

/* 为移动设备添加响应式样式 */
@media (max-width: 768px) {
  .content {
    padding: 20px;
  }
  
  .title {
    font-size: 28px;
  }
  
  .subtitle {
    font-size: 16px;
  }
  
  .illustration {
    height: 160px;
  }
  
  .actions {
    flex-direction: column;
    gap: 10px;
  }
  
  .back-home-btn, .check-updates-btn {
    width: 100%;
  }
}
</style> 