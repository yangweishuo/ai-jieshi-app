<template>
  <div class="checkin-screen" :class="{'page-entering': justCheckedIn && !animationEnded}">
    <!-- 顶部导航 -->
    <div class="checkin-header">
      <div class="back-btn" @click="goBack">
        <tech-icon icon="ArrowLeftS" :size="24" />
      </div>
      <div class="header-title">打卡详情</div>
    </div>

    <!-- 打卡成功卡片 - 优化了高度和间距 -->
    <div class="success-card" :class="{'card-entering': justCheckedIn && !animationEnded}">
      <div class="celebration-particles">
        <span v-for="n in 15" :key="n" class="particle"></span>
      </div>
      <div class="success-icon-container">
        <div class="success-icon">
          <tech-icon icon="Check" :size="40" />
        </div>
        <div class="success-glow"></div>
      </div>
      <h2 class="success-title">打卡成功！</h2>
      <p class="success-subtitle">恭喜你完成今日打卡，继续坚持！</p>
      <div class="streak-badge">
        <tech-icon icon="Fire" :size="16" />
        连续打卡：{{ continuousDays }}天
        <div class="streak-stars">
          <span class="star" v-for="n in Math.min(continuousDays, 3)" :key="n"></span>
        </div>
      </div>
    </div>

    <!-- 打卡奖励 -->
    <div class="reward-card" :class="{'card-entering': justCheckedIn && !animationEnded, 'card-delay-1': justCheckedIn}">
      <div class="reward-header">
        <tech-icon icon="Gift" :size="20" />
        打卡奖励
      </div>

      <div class="rewards-list">
        <div class="reward-item" @click="handleRewardClick('成长值')">
          <div class="reward-icon">
            <tech-icon icon="Medal" :size="22" />
          </div>
          <div class="reward-content">
            <div class="reward-name">成长值 +10</div>
            <div class="reward-desc">提升等级进度，解锁更多专属特权</div>
          </div>
        </div>

        <div class="reward-item" @click="handleRewardClick('戒断评分')">
          <div class="reward-icon">
            <tech-icon icon="ShieldStar" :size="22" />
          </div>
          <div class="reward-content">
            <div class="reward-name">戒断评分 +5%</div>
            <div class="reward-desc">提高戒断成功率，稳步前进</div>
          </div>
        </div>

        <div class="reward-item" @click="handleRewardClick('时间额度')">
          <div class="reward-icon">
            <tech-icon icon="Time" :size="22" />
          </div>
          <div class="reward-content">
            <div class="reward-name">时间额度 +10分钟</div>
            <div class="reward-desc">今日短视频使用时长上限提升</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 打卡历史 -->
    <div class="history-card" :class="{'card-entering': justCheckedIn && !animationEnded, 'card-delay-2': justCheckedIn}">
      <div class="history-header">
        <tech-icon icon="Calendar" :size="20" />
        打卡历史
      </div>

      <div class="weekday-headers">
        <div class="weekday-header" v-for="day in weekdays" :key="day">{{ day }}</div>
      </div>
      
      <div class="calendar-grid">
        <div v-for="(day, index) in calendarDays" :key="index" 
          class="calendar-day" 
          :class="{ 
            'empty': !day.date, 
            'today': day.isToday, 
            'checked': day.checkedIn 
          }">
          {{ day.date }}
        </div>
      </div>
    </div>

    <!-- 打卡分享 -->
    <div class="share-card" :class="{'card-entering': justCheckedIn && !animationEnded, 'card-delay-3': justCheckedIn}">
      <div class="share-header">
        <tech-icon icon="Share" :size="20" />
        分享打卡
      </div>

      <p class="share-note">分享打卡记录，激励自己也鼓励他人！</p>

      <div class="share-buttons">
        <div class="share-btn share-wechat" @click="shareToWeChat">
          <div class="share-icon">
            <tech-icon icon="Wechat" :size="25" />
          </div>
          <div class="share-label">微信</div>
        </div>

        <div class="share-btn share-group" @click="shareToGroup">
          <div class="share-icon">
            <tech-icon icon="People" :size="25" />
          </div>
          <div class="share-label">小组</div>
        </div>

        <div class="share-btn share-weibo" @click="shareToWeibo">
          <div class="share-icon">
            <tech-icon icon="Weibo" :size="25" />
          </div>
          <div class="share-label">微博</div>
        </div>
      </div>
    </div>
    
    <!-- 返回确认对话框 -->
    <div class="confirm-dialog" v-if="showBackConfirm">
      <div class="confirm-content">
        <h3>确认离开?</h3>
        <p>您刚刚完成打卡，确定要离开此页面吗？</p>
        <div class="confirm-buttons">
          <button class="cancel-btn" @click="cancelBack">取消</button>
          <button class="confirm-btn" @click="performBackNavigation">确认离开</button>
        </div>
      </div>
    </div>
    
    <!-- 底部导航 -->
    <bottom-nav />
  </div>
</template>

<script>
import TechIcon from '../components/TechIcon.vue'
import BottomNav from '../components/BottomNav.vue'

export default {
  name: 'CheckInView',
  components: {
    TechIcon,
    BottomNav
  },
  props: {
    fromPage: {
      type: String,
      default: 'home'
    },
    justCheckedIn: {
      type: Boolean,
      default: false
    },
    initialContinuousDays: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentDate: new Date(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      checkinDays: 15,
      continuousDays: 0,
      showSuccessModal: false,
      checkinData: {}, // 模拟打卡数据
      recentRecords: [
        {
          day: '16',
          month: '5月',
          title: '健康用眼打卡',
          details: '完成2项任务',
          status: 'success'
        },
        {
          day: '15',
          month: '5月',
          title: '健康用眼打卡',
          details: '完成2项任务',
          status: 'success'
        },
        {
          day: '14',
          month: '5月',
          title: '健康用眼打卡',
          details: '完成2项任务',
          status: 'success'
        }
      ],
      showBackConfirm: false, // 控制返回确认对话框
      animationEnded: false,
      pageTransitioning: false
    }
  },
  created() {
    // 从props初始化内部状态
    this.continuousDays = this.initialContinuousDays
    
    // 从localStorage读取打卡数据
    this.loadCheckinData()
    
    // 监听返回键事件
    window.addEventListener('popstate', this.handleBackButton)
  },
  unmounted() {
    // 清理监听器
    window.removeEventListener('popstate', this.handleBackButton)
  },
  mounted() {
    // 如果是刚刚打卡，则显示入场动画
    if (this.justCheckedIn) {
      setTimeout(() => {
        this.animationEnded = true
      }, 1500)
    } else {
      this.animationEnded = true
    }
  },
  computed: {
    currentMonthYear() {
      const month = this.currentDate.toLocaleString('zh-CN', { month: 'long' })
      const year = this.currentDate.getFullYear()
      return `${year}年${month}`
    },
    calendarDays() {
      // 创建更完整的日历数据，包括空白日期
      const calendar = []
      
      // 获取本月第一天是星期几
      const date = new Date(this.currentYear, this.currentMonth, 1)
      const firstDayOfWeek = date.getDay() // 0是星期日，1是星期一，依此类推
      
      // 填充当月第一天前的空白
      for (let i = 0; i < firstDayOfWeek; i++) {
        calendar.push({
          date: null,
          isToday: false,
          checkedIn: false
        })
      }
      
      // 填充日期
      // 获取当月天数
      const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0).getDate()
      const today = new Date().getDate()
      
      for (let day = 1; day <= lastDay; day++) {
        // 处理打卡状态 - 获取当前日期的打卡状态
        const currentDate = new Date(this.currentYear, this.currentMonth, day)
        const dateKey = this.formatDateKey(currentDate)
        const hasCheckedIn = !!this.checkinData[dateKey]
        
        calendar.push({
          date: day,
          isToday: day === today,
          checkedIn: hasCheckedIn || day === today // 今天显示为已打卡
        })
      }
      
      return calendar
    },
    todayChecked() {
      const today = new Date()
      const dateKey = this.formatDateKey(today)
      return !!this.checkinData[dateKey]
    }
  },
  methods: {
    formatDate(date) {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    formatDateKey(date) {
      return this.formatDate(date).replace(/-/g, '')
    },
    loadCheckinData() {
      try {
        const storedData = localStorage.getItem('checkinData')
        if (storedData) {
          this.checkinData = JSON.parse(storedData)
        }
      } catch (e) {
        console.error('加载打卡数据失败', e)
      }
    },
    handleCheckin() {
      if (this.todayChecked) return
      
      // 模拟打卡
      const today = new Date()
      const dateKey = this.formatDateKey(today)
      this.checkinData[dateKey] = {
        date: this.formatDate(today),
        time: new Date().toLocaleTimeString()
      }
      
      // 保存到localStorage
      localStorage.setItem('checkinData', JSON.stringify(this.checkinData))
      
      // 显示成功弹窗
      this.showSuccessModal = true
      
      // 5秒后关闭弹窗
      setTimeout(() => {
        this.showSuccessModal = false
      }, 3000)
      
      // 更新打卡计数
      this.continuousDays++
      this.checkinDays++
      
      // 添加到最近记录
      const day = today.getDate().toString()
      const month = today.toLocaleString('zh-CN', { month: 'short' })
      
      this.recentRecords.unshift({
        day,
        month,
        title: '健康用眼打卡',
        details: '完成2项任务',
        status: 'success'
      })
    },
    goBack() {
      // 如果是刚刚打卡，且需要确认，显示确认对话框
      if (this.justCheckedIn && !this.pageTransitioning) {
        this.showBackConfirm = true
      } else {
        this.performBackNavigation()
      }
    },
    performBackNavigation() {
      this.pageTransitioning = true
      this.showBackConfirm = false
      
      // 根据来源页面返回
      if (this.fromPage === 'home') {
        this.$router.push('/home')
      } else {
        this.$router.go(-1)
      }
    },
    handleBackButton(e) {
      // 如果正在打卡并且动画尚未完成，阻止返回并显示确认对话框
      if (this.justCheckedIn && !this.animationEnded) {
        e.preventDefault()
        this.showBackConfirm = true
      }
    },
    cancelBack() {
      this.showBackConfirm = false
    },
    shareToWeChat() {
      // 模拟分享到微信的行为
      alert('分享到微信功能即将上线')
    },
    shareToGroup() {
      // 模拟分享到小组的行为
      alert('分享到小组功能即将上线')
    },
    shareToWeibo() {
      // 模拟分享到微博的行为
      alert('分享到微博功能即将上线')
    },
    handleRewardClick(rewardType) {
      // 处理奖励点击事件
      let message = '';
      
      switch(rewardType) {
        case '成长值':
          message = '已获得10点成长值，继续坚持提升等级！';
          break;
        case '戒断评分':
          message = '戒断评分提升5%，你的意志力越来越强！';
          break;
        case '时间额度':
          message = '今日短视频时间额度已增加10分钟！';
          break;
        default:
          message = '奖励已领取！';
      }
      
      // 显示提示消息
      alert(message);
    }
  }
}
</script>

<style scoped>
.checkin-screen {
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 80px; /* 确保底部留出足够空间给导航栏 */
}

/* 让底部导航栏固定在屏幕底部 */
:deep(.bottom-nav) {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
}

/* 页面进入动画 */
.page-entering {
  background-color: rgba(46, 204, 113, 0.03);
}

.card-entering {
  animation: card-slide-in 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.card-delay-1 {
  animation-delay: 0.2s;
}

.card-delay-2 {
  animation-delay: 0.4s;
}

.card-delay-3 {
  animation-delay: 0.6s;
}

@keyframes card-slide-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 顶部导航 */
.checkin-header {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 5;
}

.back-btn {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #f8f9fa;
  margin-right: 15px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.back-btn:hover, .back-btn:active {
  background-color: #e9ecef;
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

/* 确认对话框 */
.confirm-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fade-in 0.3s ease;
}

.confirm-content {
  width: 80%;
  max-width: 320px;
  background-color: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: scale-in 0.3s ease;
}

.confirm-content h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
  font-size: 20px;
}

.confirm-content p {
  margin-bottom: 25px;
  color: #666;
  font-size: 16px;
  line-height: 1.5;
}

.confirm-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.cancel-btn, .confirm-btn {
  padding: 10px 20px;
  border-radius: 30px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn {
  background-color: #f1f2f6;
  color: #666;
}

.confirm-btn {
  background-color: var(--primary-color, #2ECC71);
  color: white;
}

.cancel-btn:hover {
  background-color: #e9ecef;
}

.confirm-btn:hover {
  background-color: #27ae60;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scale-in {
  from { 
    opacity: 0;
    transform: scale(0.9);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
}

/* 打卡成功卡片 - 优化版 */
.success-card {
  margin: 15px 15px 20px;
  padding: 35px 20px 30px;
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.9), rgba(26, 188, 156, 0.9));
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(46, 204, 113, 0.3);
  position: relative;
  overflow: hidden;
  color: white;
  text-align: center;
  transition: all 0.3s ease;
  min-height: 347px; /* 确保最小高度 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.success-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px rgba(46, 204, 113, 0.4);
}

.success-card::before {
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

.success-card::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%);
  opacity: 0.5;
  animation: pulse 3s infinite linear;
}

@keyframes pulse {
  0% { transform: scale(0.8); opacity: 0.3; }
  50% { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(0.8); opacity: 0.3; }
}

.success-icon-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 30px;
}

.success-icon {
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.success-glow {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  filter: blur(10px);
  z-index: 1;
  animation: glow 2s infinite alternate;
}

@keyframes glow {
  from { opacity: 0.5; transform: scale(1); }
  to { opacity: 0.8; transform: scale(1.1); }
}

.success-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 15px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: pop-in 0.6s ease-out;
}

@keyframes pop-in {
  0% { transform: scale(0.8); opacity: 0; }
  70% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

.success-subtitle {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 30px;
  line-height: 1.5;
  padding: 0 15px;
  max-width: 300px; /* 控制文本宽度 */
  margin-left: auto;
  margin-right: auto;
}

.streak-badge {
  width: fit-content;
  padding: 12px 25px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 0 auto;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.streak-badge:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* 打卡成功卡片装饰 */
.celebration-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.particle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  transform: translate(-50%, -50%);
}

.particle:nth-child(1) { animation: float-particle 3s infinite ease-in-out 0.1s; top: 20%; left: 30%; }
.particle:nth-child(2) { animation: float-particle 3.5s infinite ease-in-out 0.2s; top: 80%; left: 80%; }
.particle:nth-child(3) { animation: float-particle 4s infinite ease-in-out 0.3s; top: 40%; left: 70%; width: 6px; height: 6px; }
.particle:nth-child(4) { animation: float-particle 3.2s infinite ease-in-out 0.4s; top: 70%; left: 20%; width: 10px; height: 10px; }
.particle:nth-child(5) { animation: float-particle 3.8s infinite ease-in-out 0.5s; top: 30%; left: 85%; width: 5px; height: 5px; }
.particle:nth-child(6) { animation: float-particle 4.2s infinite ease-in-out 0.6s; top: 85%; left: 40%; }
.particle:nth-child(7) { animation: float-particle 3.6s infinite ease-in-out 0.7s; top: 60%; left: 90%; width: 7px; height: 7px; }
.particle:nth-child(8) { animation: float-particle 4.5s infinite ease-in-out 0.8s; top: 15%; left: 60%; width: 6px; height: 6px; }
.particle:nth-child(9) { animation: float-particle 3.9s infinite ease-in-out 0.9s; top: 90%; left: 10%; }
.particle:nth-child(10) { animation: float-particle 4.1s infinite ease-in-out 1s; top: 25%; left: 15%; width: 5px; height: 5px; }
.particle:nth-child(11) { animation: float-particle 3.4s infinite ease-in-out 1.1s; top: 75%; left: 75%; width: 9px; height: 9px; }
.particle:nth-child(12) { animation: float-particle 4.3s infinite ease-in-out 1.2s; top: 35%; left: 25%; }
.particle:nth-child(13) { animation: float-particle 3.7s infinite ease-in-out 1.3s; top: 45%; left: 95%; width: 6px; height: 6px; }
.particle:nth-child(14) { animation: float-particle 4.4s infinite ease-in-out 1.4s; top: 95%; left: 55%; width: 7px; height: 7px; }
.particle:nth-child(15) { animation: float-particle 3.3s infinite ease-in-out 1.5s; top: 5%; left: 45%; width: 8px; height: 8px; }

@keyframes float-particle {
  0% { transform: translate(0, 0) scale(1); opacity: 0.7; }
  50% { transform: translate(10px, -15px) scale(1.2); opacity: 1; }
  100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
}

.streak-stars {
  display: flex;
  gap: 3px;
  margin-left: 5px;
}

.star {
  width: 10px;
  height: 10px;
  background-color: rgba(255, 255, 0, 0.9);
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  display: inline-block;
  animation: twinkle 1.5s infinite alternate;
}

.star:nth-child(1) { animation-delay: 0s; }
.star:nth-child(2) { animation-delay: 0.5s; }
.star:nth-child(3) { animation-delay: 1s; }

@keyframes twinkle {
  from { transform: scale(1); opacity: 0.7; }
  to { transform: scale(1.3); opacity: 1; }
}

/* 响应式适配 */
@media (max-width: 375px) {
  .success-card {
    padding: 25px 15px 20px;
    min-height: 320px;
  }
  
  .success-icon {
    width: 85px;
    height: 85px;
  }
  
  .success-icon-container {
    width: 85px;
    height: 85px;
    margin-bottom: 25px;
  }
  
  .success-title {
    font-size: 28px;
    margin-bottom: 10px;
  }
  
  .success-subtitle {
    font-size: 16px;
    margin-bottom: 25px;
    max-width: 250px;
  }
  
  .streak-badge {
    padding: 10px 20px;
    font-size: 15px;
  }

  .star {
    width: 8px;
    height: 8px;
  }
}

/* 卡片通用样式 */
.reward-card, .history-card, .share-card {
  margin: 15px 15px;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.reward-card:hover, .history-card:hover, .share-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.reward-header, .history-header, .share-header {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 奖励卡片特殊样式 */
.reward-header .tech-icon {
  color: #f1c40f;
}

.rewards-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.reward-item {
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 12px 15px;
  margin-bottom: 5px;
  transition: all 0.2s ease;
}

.reward-item:hover {
  background-color: #f0f0f0;
  transform: translateX(3px);
}

.reward-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f1c40f, #f39c12);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  box-shadow: 0 3px 8px rgba(243, 156, 18, 0.2);
  color: white;
}

.reward-content {
  flex: 1;
}

.reward-name {
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.reward-desc {
  font-size: 14px;
  color: #666;
}

/* 历史卡片日历样式 */
.weekday-headers {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 10px;
}

.weekday-header {
  text-align: center;
  font-size: 12px;
  color: #999;
  font-weight: 600;
  padding: 5px 0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-size: 13px;
  font-weight: 600;
  color: #999;
  min-width: 30px;
  min-height: 30px;
  transition: transform 0.2s ease, background-color 0.2s ease;
  cursor: pointer;
}

.calendar-day:not(.empty):hover {
  transform: scale(1.1);
  background-color: rgba(46, 204, 113, 0.1);
}

.calendar-day.empty {
  background: transparent;
  cursor: default;
}

.calendar-day.checked {
  background-color: var(--primary-color, #2ECC71);
  color: white;
}

.calendar-day.today {
  border: 2px solid var(--primary-color, #2ECC71);
  color: var(--primary-color, #2ECC71);
}

.calendar-day.today.checked {
  background-color: var(--primary-color, #2ECC71);
  color: white;
}

/* 分享卡片样式 */
.share-card {
  margin: 15px 15px 20px;
  text-align: center;
}

.share-header {
  justify-content: center;
}

.share-note {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.share-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
}

.share-btn {
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
}

.share-btn:hover {
  transform: translateY(-3px);
}

.share-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  color: white;
  transition: all 0.2s ease;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.share-btn:hover .share-icon {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
  transform: scale(1.05);
}

.share-label {
  font-size: 12px;
  color: #666;
}

.share-wechat .share-icon {
  background-color: #07C160;
}

.share-group .share-icon {
  background-color: var(--secondary-color, #1E88E5);
}

.share-weibo .share-icon {
  background-color: #E6162D;
}
</style> 