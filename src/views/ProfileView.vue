<template>
  <div class="profile-screen">
    <!-- 顶部个人信息区 -->
    <div class="profile-header">
      <!-- 粒子效果 -->
      <div class="header-particles">
        <div class="header-particle"></div>
        <div class="header-particle"></div>
        <div class="header-particle"></div>
        <div class="header-particle"></div>
        <div class="header-particle"></div>
        <div class="header-particle"></div>
      </div>
      
      <!-- 设置按钮 -->
      <div class="settings-btn">
        <i class="ri-settings-3-line"></i>
      </div>
      
      <!-- 用户头像 -->
      <div class="avatar-container" id="rotateAvatar" @click="toggleAvatarFlip">
        <div class="hexagon-avatar" :style="{ transform: isAvatarFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }">
          <!-- 正面: 头像 -->
          <!-- 背面: 能量值（通过CSS 3D旋转展示） -->
          <div class="energy-value">
            <div class="energy-title">能量值</div>
            <div class="energy-number">1,280</div>
          </div>
        </div>
        <div class="avatar-level">5</div>
      </div>
      
      <!-- 用户名与签名 -->
      <div class="profile-name">李明</div>
      <div class="profile-bio">专注生活，拒绝沉迷</div>
    </div>
    
    <div class="profile-content">
      <!-- 勋章墙 -->
      <div class="profile-section">
        <div class="section-header">
          <div class="section-title">
            <i class="ri-medal-line"></i>
            勋章墙
          </div>
          <a href="#" class="view-all">
            查看全部 <i class="ri-arrow-right-s-line"></i>
          </a>
        </div>
        
        <div class="medals-grid">
          <div class="medal-item" v-for="(medal, index) in medals" :key="index">
            <div class="medal-icon">
              <div :class="medal.unlocked ? 'medal-unlocked' : 'medal-locked'">
                <i :class="medal.icon"></i>
              </div>
            </div>
            <div class="medal-name">{{ medal.name }}</div>
          </div>
        </div>
      </div>
      
      <!-- 设置菜单 -->
      <div class="profile-section">
        <div class="section-title">
          <i class="ri-settings-4-line"></i>
          设置
        </div>
        
        <div class="settings-menu">
          <div class="menu-item" v-for="(item, index) in settingsMenu" :key="index">
            <div class="menu-icon">
              <i :class="item.icon"></i>
            </div>
            <div class="menu-content">
              <div class="menu-title">{{ item.title }}</div>
              <div class="menu-desc">{{ item.desc }}</div>
            </div>
            <div class="menu-arrow">
              <i class="ri-arrow-right-s-line"></i>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 我的家庭 -->
      <div class="profile-section family-section">
        <div class="section-header">
          <div class="section-title">
            <i class="ri-home-heart-line"></i>
            我的家庭
          </div>
          <a href="#" class="view-all">
            管理家庭 <i class="ri-arrow-right-s-line"></i>
          </a>
        </div>
        
        <div class="family-preview">
          <div class="family-images">
            <div class="family-images-overlay"></div>
            <div class="family-member-avatar central">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="我的头像">
            </div>
            <div class="family-member-avatar top-left">
              <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="家人头像">
            </div>
            <div class="family-member-avatar top-right">
              <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="家人头像">
            </div>
          </div>
          
          <div class="family-stats">
            <div class="family-stat-item" v-for="(stat, index) in familyStats" :key="index">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 消息中心 -->
      <div class="profile-section messages-section">
        <div class="section-header">
          <div class="section-title">
            <i class="ri-message-3-line"></i>
            消息中心
          </div>
          <a href="#" class="view-all">
            查看全部 <i class="ri-arrow-right-s-line"></i>
          </a>
        </div>
        
        <div class="message-item" v-for="(message, index) in messages" :key="index">
          <div :class="'message-icon ' + message.type">
            <i :class="message.iconClass"></i>
          </div>
          <div class="message-content">
            <div class="message-text">{{ message.text }}</div>
            <div class="message-time">{{ message.time }}</div>
          </div>
        </div>
      </div>
      
      <!-- 个性化功能 -->
      <div class="profile-section customize-section">
        <div class="section-title">
          <i class="ri-brush-line"></i>
          个性化
        </div>
        
        <div class="menu-title custom-title">选择主题色</div>
        <div class="theme-selector">
          <div 
            v-for="(theme, index) in themes" 
            :key="index"
            :class="['theme-option', theme.class, selectedTheme === theme.class ? 'selected' : '']"
            @click="selectTheme(theme.class)"
          ></div>
        </div>
        
        <div class="menu-item custom-menu-item">
          <div class="menu-icon">
            <i class="ri-focus-3-line"></i>
          </div>
          <div class="menu-content">
            <div class="menu-title">专注模式设置</div>
            <div class="menu-desc">自定义专注时间与应用限制</div>
          </div>
          <div class="menu-arrow">
            <i class="ri-arrow-right-s-line"></i>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 客服按钮 -->
    <div class="support-btn">
      <i class="ri-customer-service-2-line"></i>
    </div>
    
    <!-- 引入底部导航组件 -->
    <bottom-nav />
  </div>
</template>

<script>
import BottomNav from '@/components/BottomNav.vue'

export default {
  name: 'ProfileView',
  components: {
    BottomNav
  },
  data() {
    return {
      isAvatarFlipped: false,
      selectedTheme: 'theme-blue',
      medals: [
        { name: '初心者', icon: 'ri-seedling-line', unlocked: true },
        { name: '连续7天', icon: 'ri-calendar-check-line', unlocked: true },
        { name: '自律达人', icon: 'ri-shield-star-line', unlocked: true },
        { name: '时间管理', icon: 'ri-time-line', unlocked: false }
      ],
      settingsMenu: [
        { title: '账户与安全', desc: '隐私设置、账号管理', icon: 'ri-shield-user-line' },
        { title: '通知管理', desc: '消息提醒、打卡提醒', icon: 'ri-notification-3-line' },
        { title: '主题设置', desc: '界面风格、暗黑模式', icon: 'ri-palette-line' }
      ],
      familyStats: [
        { value: '3', label: '家庭成员' },
        { value: '68%', label: '互动活跃度' },
        { value: '2', label: '未读鼓励' }
      ],
      messages: [
        { 
          type: 'like', 
          iconClass: 'ri-heart-fill like', 
          text: '张小月赞了你的动态', 
          time: '10分钟前' 
        },
        { 
          type: 'task', 
          iconClass: 'ri-task-line task', 
          text: '小组"专注学习"发布了新任务', 
          time: '2小时前' 
        }
      ],
      themes: [
        { class: 'theme-blue' },
        { class: 'theme-green' },
        { class: 'theme-purple' },
        { class: 'theme-orange' },
        { class: 'theme-pink' }
      ]
    }
  },
  methods: {
    toggleAvatarFlip() {
      this.isAvatarFlipped = !this.isAvatarFlipped
    },
    selectTheme(themeClass) {
      this.selectedTheme = themeClass
    }
  }
}
</script>

<style scoped>
.profile-screen {
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  scrollbar-color: rgba(30, 136, 229, 0.3) transparent;
}

.profile-screen::-webkit-scrollbar {
  width: 4px;
}

.profile-screen::-webkit-scrollbar-track {
  background: transparent;
}

.profile-screen::-webkit-scrollbar-thumb {
  background-color: rgba(30, 136, 229, 0.3);
  border-radius: 4px;
}

.profile-content {
  padding-bottom: 85px; /* 确保底部导航不遮挡内容 */
  flex: 1;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  position: relative;
}

/* 引入滚动阴影效果 */
.profile-screen::after {
  content: '';
  position: absolute;
  bottom: 70px;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(to top, rgba(248, 249, 250, 0.9), transparent);
  pointer-events: none;
  z-index: 5;
}

/* 顶部个人信息区 */
.profile-header {
  min-height: 230px;
  background: linear-gradient(135deg, rgba(30, 136, 229, 0.95), rgba(124, 77, 255, 0.95));
  color: white;
  position: relative;
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  box-shadow: 0 5px 20px rgba(30, 136, 229, 0.3);
  margin-bottom: 10px;
}

.profile-header::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background-color: #f8f9fa;
  border-radius: 50% 50% 0 0;
  opacity: 0.2;
}

.header-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.header-particle {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: profile-float 15s linear infinite;
}

.header-particle:nth-child(1) { left: 10%; top: 20%; width: 4px; height: 4px; animation-duration: 12s; }
.header-particle:nth-child(2) { left: 25%; top: 60%; width: 6px; height: 6px; animation-duration: 16s; }
.header-particle:nth-child(3) { left: 40%; top: 40%; width: 5px; height: 5px; animation-duration: 14s; }
.header-particle:nth-child(4) { left: 60%; top: 70%; width: 7px; height: 7px; animation-duration: 18s; }
.header-particle:nth-child(5) { left: 75%; top: 30%; width: 5px; height: 5px; animation-duration: 15s; }
.header-particle:nth-child(6) { left: 85%; top: 50%; width: 4px; height: 4px; animation-duration: 13s; }

@keyframes profile-float {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-30px) translateX(15px);
    opacity: 0.6;
  }
  100% {
    transform: translateY(-60px) translateX(0);
    opacity: 0;
  }
}

.settings-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.15);
  z-index: 10;
  transition: all 0.3s ease;
}

.settings-btn:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: scale(1.05);
}

.settings-btn i {
  font-size: 22px;
  color: white;
}

.avatar-container {
  position: relative;
  margin: 5px 0 20px;
  z-index: 5;
  transition: all 0.3s ease;
}

.avatar-container:hover {
  transform: translateY(-8px) scale(1.05);
}

.hexagon-avatar {
  width: 95px;
  height: 95px;
  position: relative;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  background-image: url('https://randomuser.me/api/portraits/men/32.jpg');
  background-size: cover;
  background-position: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  border: 3px solid rgba(255, 255, 255, 0.5);
}

.avatar-level {
  position: absolute;
  bottom: -8px;
  right: -8px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1E88E5, #7C4DFF);
  color: white;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  border: 2px solid white;
  z-index: 6;
}

.profile-name {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 10px;
  letter-spacing: 1px;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 5;
}

.profile-bio {
  font-size: 14px;
  opacity: 0.9;
  max-width: 80%;
  text-align: center;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 18px;
  border-radius: 20px;
  backdrop-filter: blur(5px);
  margin-top: 5px;
  z-index: 5;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* 能量值 */
.energy-value {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  background: linear-gradient(135deg, #FF9800, #FF5722);
}

.energy-title {
  font-size: 14px;
  margin-bottom: 5px;
  color: rgba(255, 255, 255, 0.9);
}

.energy-number {
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

/* 勋章墙与设置区 */
.profile-section {
  background: white;
  border-radius: 18px;
  margin: 15px;
  padding: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.profile-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  position: relative;
}

.section-title i {
  font-size: 22px;
  margin-right: 8px;
  color: var(--secondary-color);
  background: linear-gradient(135deg, #1E88E5, #7C4DFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.view-all {
  font-size: 14px;
  color: var(--secondary-color);
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 15px;
  background: rgba(30, 136, 229, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
}

.view-all:hover {
  background: rgba(30, 136, 229, 0.2);
}

.view-all i {
  font-size: 16px;
  margin-left: 3px;
}

/* 勋章墙 */
.medals-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.medal-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;
}

.medal-item:hover {
  transform: translateY(-5px);
}

.medal-icon {
  width: 65px;
  height: 65px;
  margin-bottom: 10px;
  position: relative;
}

.medal-unlocked {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #304FFE, #7C4DFF);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(124, 77, 255, 0.3);
}

.medal-unlocked::before {
  content: '';
  position: absolute;
  width: 150%;
  height: 150%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  transform: rotate(45deg);
  animation: medal-shine 3s linear infinite;
}

@keyframes medal-shine {
  0% {
    left: -100%;
    top: -100%;
  }
  100% {
    left: 100%;
    top: 100%;
  }
}

.medal-unlocked i {
  font-size: 28px;
  color: white;
  z-index: 1;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.medal-locked {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #f1f3f4;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: grayscale(1);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.medal-locked:hover {
  filter: grayscale(0.5);
  opacity: 0.9;
}

.medal-locked i {
  font-size: 28px;
  color: #aaa;
}

.medal-name {
  font-size: 12px;
  color: #666;
  text-align: center;
  font-weight: 500;
  background: #f8f9fa;
  padding: 4px 8px;
  border-radius: 10px;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 设置菜单 */
.settings-menu {
  margin-top: 20px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  transform: translateX(5px);
  background-color: rgba(30, 136, 229, 0.03);
  border-radius: 10px;
  padding-left: 10px;
}

.menu-item:hover .menu-arrow {
  opacity: 1;
  transform: translateX(5px);
}

.menu-icon {
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(30, 136, 229, 0.1), rgba(124, 77, 255, 0.1));
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  transition: all 0.3s ease;
}

.menu-item:hover .menu-icon {
  transform: scale(1.1);
  background: linear-gradient(135deg, rgba(30, 136, 229, 0.2), rgba(124, 77, 255, 0.2));
}

.menu-icon i {
  font-size: 22px;
  background: linear-gradient(135deg, #1E88E5, #7C4DFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.menu-content {
  flex: 1;
  transition: all 0.3s ease;
}

.menu-title {
  font-size: 16px;
  color: #333;
  margin-bottom: 3px;
  font-weight: 500;
}

.custom-title {
  margin: 15px 0 5px;
  font-size: 14px;
}

.menu-desc {
  font-size: 12px;
  color: #666;
  transition: all 0.3s ease;
}

.menu-item:hover .menu-desc {
  color: #1E88E5;
}

.menu-arrow {
  color: #ccc;
  font-size: 20px;
  opacity: 0.6;
  transition: all 0.3s ease;
}

/* 我的家庭 */
.family-section {
  margin-top: 15px;
}

.family-preview {
  margin-top: 15px;
}

.family-images {
  width: 100%;
  height: 120px;
  background: linear-gradient(135deg, rgba(52, 152, 219, 0.2), rgba(255, 64, 129, 0.2));
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}

.family-images-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(52, 152, 219, 0.3), transparent);
  z-index: 1;
}

.family-member-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  border: 3px solid white;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.family-member-avatar.central {
  width: 75px;
  height: 75px;
  z-index: 3;
}

.family-member-avatar.top-left {
  top: 30px;
  left: 50px;
}

.family-member-avatar.top-right {
  top: 30px;
  right: 50px;
}

.family-member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.family-stats {
  display: flex;
  justify-content: space-between;
}

.family-stat-item {
  text-align: center;
  flex: 1;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  color: var(--secondary-color);
  background: linear-gradient(135deg, #3498DB, #FF4081);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-label {
  font-size: 12px;
  color: #666;
  margin-top: 5px;
}

/* 消息中心 */
.messages-section {
  margin-top: 15px;
}

.message-item {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.message-item:last-child {
  border-bottom: none;
}

.message-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

.message-icon.like {
  background-color: rgba(231, 76, 60, 0.1);
}

.message-icon.task {
  background-color: rgba(241, 196, 15, 0.1);
}

.message-icon i.like {
  color: #E74C3C;
}

.message-icon i.task {
  color: #F1C40F;
}

.message-content {
  flex: 1;
}

.message-text {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.message-time {
  font-size: 12px;
  color: #999;
}

/* 个性化功能 */
.customize-section {
  margin-top: 15px;
}

.theme-selector {
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
  margin: 15px 0;
  gap: 18px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.theme-selector::-webkit-scrollbar {
  display: none;
}

.theme-option {
  min-width: 65px;
  height: 65px;
  border-radius: 15px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.theme-option:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.theme-option.selected {
  border: 3px solid var(--secondary-color);
  box-shadow: 0 5px 15px rgba(30, 136, 229, 0.3);
  transform: scale(1.05) translateY(-5px);
}

.theme-blue {
  background: linear-gradient(135deg, #304FFE, #1E88E5);
}

.theme-green {
  background: linear-gradient(135deg, #2ECC71, #1ABC9C);
}

.theme-purple {
  background: linear-gradient(135deg, #7C4DFF, #7222C9);
}

.theme-orange {
  background: linear-gradient(135deg, #F39C12, #E67E22);
}

.theme-pink {
  background: linear-gradient(135deg, #E91E63, #C2185B);
}

.custom-menu-item {
  margin-top: 10px;
}

/* 客服悬浮按钮 */
.support-btn {
  position: fixed;
  bottom: 85px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #304FFE, #7C4DFF);
  box-shadow: 0 3px 10px rgba(124, 77, 255, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 100;
}

.support-btn i {
  font-size: 24px;
}

/* 优化勋章网格布局 */
@media (max-width: 340px) {
  .medals-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  .theme-selector {
    justify-content: space-between;
  }
  
  .family-stats {
    flex-direction: column;
  }
  
  .family-stat-item {
    margin-bottom: 10px;
  }
}
</style> 