<template>
  <div class="home-screen">
    <div class="home-content">
      <!-- 顶部栏 -->
      <div class="top-bar">
        <div class="user-profile" @click="showUserOptions">
          <div class="user-avatar">
            <img :src="userInfo.avatar" alt="用户头像">
          </div>
          <div class="user-info">
            <div class="user-name">{{ userInfo.nickname }}</div>
            <div class="user-level">坚持者 Lv.{{ userInfo.level }}</div>
          </div>
          
          <!-- 用户选项弹出菜单 -->
          <div class="user-options" v-if="showOptions">
            <div class="option-item" @click="goToProfile">
              <tech-icon icon="User" :size="16" />
              <span>个人资料</span>
            </div>
            <div class="option-item" @click="logout">
              <tech-icon icon="Logout" :size="16" />
              <span>退出登录</span>
            </div>
          </div>
        </div>
        <div class="notification-icon">
          <tech-icon icon="Notice" :size="22" />
          <div class="notification-badge">2</div>
        </div>
      </div>
      
      <!-- 视频使用限制状态 -->
      <div class="video-limit-status">
        <div class="limit-title">
          <tech-icon icon="Time" :size="24" />
          <h3>今日短视频使用时长</h3>
        </div>
        <div class="time-progress">
          <div class="time-bar" :style="{ width: videoTimePercent + '%' }"></div>
        </div>
        <div class="time-info">
          <div class="time-used">{{ videoTimeMinutes }}分钟</div>
          <div class="time-limit">限制: {{ videoTimeLimit }}分钟</div>
        </div>
      </div>
      
      <!-- 打卡卡片 -->
      <div class="check-in-card" :class="{ 'checked': isCheckedIn }">
        <div class="check-in-header">
          <div class="check-in-title">
            <tech-icon icon="Calendar" :size="24" />
            今日打卡
          </div>
          <div class="streak-count">连续3天</div>
        </div>
        <div class="check-in-note">每日打卡可获得成长值和戒断评分加成！</div>
        <button class="check-in-btn ripple" @click="checkIn" v-if="!isCheckedIn">立即打卡</button>
        <button class="check-in-btn ripple checked" v-else disabled>已打卡</button>
      </div>
      
      <!-- 社交圈动态预览 -->
      <div class="social-feed-preview">
        <div class="social-header">
          <div class="social-title">
            <tech-icon icon="People" :size="24" />
            社交圈动态
          </div>
          <a href="#" class="view-all">查看全部</a>
        </div>
        
        <div class="social-feed-item">
          <div class="social-user-avatar">
            <div class="hexagon-avatar" style="background-image: url('https://randomuser.me/api/portraits/women/42.jpg')"></div>
          </div>
          <div class="social-content">
            <div class="social-user-name">张小月</div>
            <div class="social-text">今天成功没看短视频，改读了一小时书，感觉真好！#戒短视频 #读书</div>
            <div class="social-time">10分钟前</div>
          </div>
        </div>
        
        <div class="social-feed-item">
          <div class="social-user-avatar">
            <div class="hexagon-avatar" style="background-image: url('https://randomuser.me/api/portraits/men/67.jpg')"></div>
          </div>
          <div class="social-content">
            <div class="social-user-name">王强</div>
            <div class="social-text">连续7天未使用短视频，感觉自己精力充沛了很多！</div>
            <div class="social-time">1小时前</div>
          </div>
        </div>
      </div>
      
      <!-- 徽章成就预览 -->
      <div class="achievement-preview">
        <div class="achievement-header">
          <div class="achievement-title">
            <tech-icon icon="Medal" :size="24" />
            成就徽章
          </div>
          <a href="#" class="view-all">查看全部</a>
        </div>
        
        <div class="badges-container">
          <div class="badge-item">
            <div class="badge-icon">
              <div class="holographic-badge">
                <tech-icon icon="Leaf" :size="30" />
              </div>
            </div>
            <div class="badge-name">初心者</div>
          </div>
          
          <div class="badge-item">
            <div class="badge-icon">
              <div class="holographic-badge">
                <tech-icon icon="CalendarDot" :size="30" />
              </div>
            </div>
            <div class="badge-name">坚持7天</div>
          </div>
          
          <div class="badge-item">
            <div class="badge-icon">
              <div class="holographic-badge" style="background: linear-gradient(135deg, #bdc3c7, #95a5a6);">
                <tech-icon icon="People" :size="30" />
              </div>
            </div>
            <div class="badge-name">社交达人</div>
          </div>
        </div>
      </div>

      <!-- 额外内容区域，用于演示滚动效果 -->
      <div class="extra-padding-bottom"></div>
    </div>
    
    <!-- 底部导航 -->
    <bottom-nav />
  </div>
</template>

<script>
import TechIcon from '../components/TechIcon.vue'
import BottomNav from '../components/BottomNav.vue'

export default {
  name: 'HomeView',
  components: {
    TechIcon,
    BottomNav
  },
  data() {
    return {
      today: this.formatDate(new Date()),
      isCheckedIn: false,
      videoTimePercent: 35, // 视频使用时间百分比
      videoTimeMinutes: 35, // 视频使用时间(分钟)
      videoTimeLimit: 100, // 视频使用时间限制(分钟)
      animateNumbers: false,
      userInfo: {
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        nickname: '李明',
        level: 3
      },
      showOptions: false
    }
  },
  created() {
    // 从localStorage获取用户信息
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      try {
        const storedUser = JSON.parse(userStorage);
        this.userInfo = {
          ...this.userInfo,
          ...storedUser
        };
      } catch (e) {
        console.error('解析用户数据失败', e);
      }
    }
  },
  mounted() {
    // 启动数字动画
    setTimeout(() => {
      this.animateNumbers = true;
      this.animateValue('video-time-counter', 0, this.videoTimeMinutes, 1500);
    }, 500);
    
    // 为卡片添加悬浮动画
    const cards = document.querySelectorAll('.check-in-card, .social-feed-preview, .achievement-preview');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-3px)';
        card.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
      });
    });
  },
  methods: {
    formatDate(date) {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    checkIn() {
      this.isCheckedIn = true
      // 触发打卡动画效果
      this.createParticleExplosion()
      
      // 更新连续打卡天数并保存到localStorage
      const checkinData = JSON.parse(localStorage.getItem('checkinData') || '{"continuousDays": 0}')
      checkinData.continuousDays = (checkinData.continuousDays || 0) + 1
      checkinData.lastCheckin = this.today
      localStorage.setItem('checkinData', JSON.stringify(checkinData))
      
      // 跳转到打卡详情页面，带上参数
      setTimeout(() => {
        this.$router.push({
          path: '/checkin',
          query: {
            from: 'home',
            justCheckedIn: 'true',
            continuousDays: checkinData.continuousDays.toString()
          }
        })
      }, 1000)
    },
    createParticleExplosion() {
      // 创建粒子爆炸效果
      const container = document.createElement('div')
      container.className = 'particle-explosion'
      document.querySelector('.home-screen').appendChild(container)
      
      // 创建30个粒子
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div')
        particle.className = 'explosion-particle'
        
        // 随机角度和距离
        const angle = Math.random() * Math.PI * 2
        const distance = 50 + Math.random() * 100
        
        // 计算位置
        const tx = Math.cos(angle) * distance
        const ty = Math.sin(angle) * distance
        
        // 设置CSS变量
        particle.style.setProperty('--tx', `${tx}px`)
        particle.style.setProperty('--ty', `${ty}px`)
        
        // 随机颜色
        const hue = Math.floor(Math.random() * 60) + 120 // 绿色系
        particle.style.backgroundColor = `hsla(${hue}, 100%, 60%, 0.8)`
        
        // 随机大小
        const size = Math.floor(Math.random() * 10) + 5
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        
        // 随机延迟
        particle.style.animationDelay = `${Math.random() * 0.2}s`
        
        container.appendChild(particle)
      }
      
      // 动画结束后移除
      setTimeout(() => {
        container.remove()
      }, 1500)
    },
    animateValue(elementId, start, end, duration) {
      if (start === end) return;
      const range = end - start;
      let current = start;
      const increment = end > start ? 1 : -1;
      const stepTime = Math.abs(Math.floor(duration / range));
      const obj = document.querySelector('.time-used');
      
      const timer = setInterval(() => {
        current += increment;
        obj.innerHTML = current + '分钟';
        if (current == end) {
          clearInterval(timer);
        }
      }, stepTime);
    },
    showUserOptions(event) {
      event.stopPropagation(); // 阻止事件冒泡
      this.showOptions = !this.showOptions;
      
      // 添加一个全局点击事件监听器来关闭菜单
      if (this.showOptions) {
        setTimeout(() => {
          document.addEventListener('click', this.closeUserOptions);
        }, 0);
      }
    },
    closeUserOptions() {
      this.showOptions = false;
      document.removeEventListener('click', this.closeUserOptions);
    },
    goToProfile() {
      // 实现跳转到个人资料页面的逻辑
      console.log('跳转到个人资料页面');
    },
    logout() {
      // 实现退出登录的逻辑
      localStorage.removeItem('user');
      this.showOptions = false;
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.home-screen {
  width: 100%;
  height: 100vh;
  background-color: #f8f9fa;
  position: relative;
  overflow: hidden;
  animation: fade-in 0.5s ease-out;
}

.home-content {
  width: 100%;
  height: calc(100vh - 70px);
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch; /* 增强iOS滑动体验 */
  padding-bottom: 20px;
  scroll-behavior: smooth; /* 平滑滚动 */
}

/* 下拉刷新指示器 */
.home-content::-webkit-scrollbar {
  width: 4px;
}

.home-content::-webkit-scrollbar-thumb {
  background-color: rgba(30, 136, 229, 0.3);
  border-radius: 4px;
}

.home-content::-webkit-scrollbar-track {
  background: transparent;
}

/* 为了确保有足够的内容可以滚动 */
.extra-padding-bottom {
  height: 20px;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 顶部状态栏 */
.top-bar {
  height: 60px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 10;
}

.user-profile {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  font-size: 16px;
  color: #333;
}

.user-level {
  font-size: 12px;
  color: var(--secondary-color);
}

.notification-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.notification-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 18px;
  height: 18px;
  background-color: var(--warning-color);
  border-radius: 50%;
  color: white;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(231, 76, 60, 0.3);
  animation: bounce 1s infinite alternate;
}

@keyframes bounce {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
}

/* 视频限制状态 */
.video-limit-status {
  padding: 20px;
  background: linear-gradient(135deg, rgba(30, 136, 229, 0.8), rgba(124, 77, 255, 0.8));
  margin: 15px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(30, 136, 229, 0.2);
  color: white;
  position: relative;
  overflow: hidden;
  animation: slide-up 0.6s ease-out backwards;
  animation-delay: 0.1s;
}

.video-limit-status::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==');
  opacity: 0.2;
  pointer-events: none;
}

.limit-title {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.limit-title i, 
.limit-title .tech-icon {
  margin-right: 10px;
}

.limit-title h3 {
  font-size: 18px;
  font-weight: 600;
}

.time-progress {
  background-color: rgba(255, 255, 255, 0.2);
  height: 8px;
  border-radius: 5px;
  margin-bottom: 10px;
  position: relative;
}

.time-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 0;
  background: linear-gradient(to right, #FFF, rgba(255, 255, 255, 0.7));
  border-radius: 5px;
  animation: grow-width 1.5s ease-out forwards;
}

@keyframes grow-width {
  to {
    width: 35%;
  }
}

.time-info {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.time-used {
  font-weight: 600;
}

.time-limit {
  opacity: 0.8;
}

/* 打卡卡片 */
.check-in-card {
  background-color: white;
  border-radius: 15px;
  margin: 15px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  animation: slide-up 0.6s ease-out backwards;
  animation-delay: 0.2s;
}

.check-in-card.checked {
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.8), rgba(26, 188, 156, 0.8));
  color: white;
}

.check-in-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.check-in-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
}

.check-in-title i, 
.check-in-title .tech-icon {
  margin-right: 8px;
  color: var(--primary-color);
}

.check-in-card.checked .check-in-title,
.check-in-card.checked .streak-count {
  color: white;
}

.check-in-card.checked .check-in-title i,
.check-in-card.checked .check-in-title .tech-icon {
  color: white;
}

.streak-count {
  font-size: 16px;
  font-weight: 600;
  color: var(--primary-color);
}

.check-in-note {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

.check-in-card.checked .check-in-note {
  color: rgba(255, 255, 255, 0.9);
}

.check-in-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #2ECC71, #1ABC9C);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.check-in-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(46, 204, 113, 0.3);
}

.check-in-btn.checked {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.5);
  pointer-events: none;
}

/* 社交圈动态 */
.social-feed-preview {
  background-color: white;
  border-radius: 15px;
  margin: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 20px;
  position: relative;
  overflow: hidden;
  animation: slide-up 0.6s ease-out backwards;
  animation-delay: 0.3s;
}

.social-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.social-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
}

.social-title i,
.social-title .tech-icon {
  margin-right: 8px;
  color: var(--secondary-color);
}

.view-all {
  color: var(--secondary-color);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
}

.social-feed-item {
  display: flex;
  align-items: flex-start;
  padding: 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.social-feed-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.social-user-avatar {
  width: 50px;
  height: 50px;
  position: relative;
  margin-right: 15px;
}

.hexagon-avatar {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
}

.hexagon-avatar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.1), transparent);
  z-index: 1;
}

.social-content {
  flex: 1;
}

.social-user-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.social-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  line-height: 1.4;
}

.social-time {
  font-size: 12px;
  color: #999;
}

/* 徽章成就 */
.achievement-preview {
  background-color: white;
  border-radius: 15px;
  margin: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 20px;
  animation: slide-up 0.6s ease-out backwards;
  animation-delay: 0.4s;
}

.achievement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.achievement-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
}

.achievement-title i,
.achievement-title .tech-icon {
  margin-right: 8px;
  color: var(--accent-color);
}

.badges-container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.badge-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  transition: all 0.3s ease;
}

.badge-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 8px;
  position: relative;
}

.holographic-badge {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2ECC71, #1E88E5);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 15px rgba(30, 136, 229, 0.3);
  position: relative;
  overflow: hidden;
  color: white;
}

.holographic-badge::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: rotate(45deg);
  animation: holographic-spin 3s linear infinite;
}

@keyframes holographic-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.badge-name {
  font-size: 12px;
  color: #666;
  text-align: center;
}

/* 粒子爆炸特效 */
.particle-explosion {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 999;
}

.explosion-particle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background-color: rgba(46, 204, 113, 0.8);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  animation: explode 1s ease-out forwards;
}

@keyframes explode {
  0% {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx), var(--ty));
    opacity: 0;
  }
}

/* 水波纹效果 */
.ripple {
  position: relative;
  overflow: hidden;
}

.ripple::after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform .5s, opacity 1s;
}

.ripple:active::after {
  transform: scale(0, 0);
  opacity: .3;
  transition: 0s;
}

/* 头像呼吸光效 */
.user-avatar::after {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border-radius: 50%;
  border: 2px solid rgba(30, 136, 229, 0.3);
  animation: pulse-border 2s infinite;
  opacity: 0;
}

@keyframes pulse-border {
  0% {
    transform: scale(0.95);
    opacity: 0.7;
  }
  70% {
    transform: scale(1.05);
    opacity: 0;
  }
  100% {
    transform: scale(0.95);
    opacity: 0;
  }
}

/* 悬浮效果 */
.check-in-card:hover,
.social-feed-preview:hover,
.achievement-preview:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

/* 添加社交项目悬浮效果 */
.social-feed-item:hover {
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  transform: translateX(3px);
}

/* 徽章悬浮效果 */
.badge-item:hover {
  transform: translateY(-5px);
}

.badge-item:hover .holographic-badge {
  box-shadow: 0 8px 15px rgba(30, 136, 229, 0.5);
}

/* 滚动提示 */
@keyframes scroll-hint {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.user-options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 150px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  margin-top: 5px;
  z-index: 10;
  animation: fadeIn 0.2s ease-out;
}

.option-item {
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
  transition: background-color 0.2s;
}

.option-item:hover {
  background-color: #f5f5f5;
}
</style> 