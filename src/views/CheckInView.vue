<template>
  <div class="checkin-screen">
    <!-- 顶部栏 -->
    <div class="top-bar">
      <h2 class="page-title">每日打卡</h2>
      <div class="action-buttons">
        <tech-icon icon="History" :size="24" custom-class="action-icon" />
      </div>
    </div>
    
    <!-- 日历区域 -->
    <div class="calendar-section">
      <div class="month-selector">
        <div class="selector-buttons">
          <tech-icon icon="Left" :size="20" @click="prevMonth" custom-class="selector-icon" />
          <h3>{{ currentMonthYear }}</h3>
          <tech-icon icon="Right" :size="20" @click="nextMonth" custom-class="selector-icon" />
        </div>
        <div class="month-stats">
          <div class="month-stat-item">
            <span class="stat-number">{{ checkinDays }}</span>
            <span class="stat-label">打卡天数</span>
          </div>
          <div class="month-stat-item">
            <span class="stat-number">{{ continuousDays }}</span>
            <span class="stat-label">连续打卡</span>
          </div>
        </div>
      </div>
      
      <div class="calendar">
        <div class="weekday-headers">
          <div class="weekday-header" v-for="day in weekdays" :key="day">{{ day }}</div>
        </div>
        <div class="calendar-days">
          <div 
            v-for="(day, index) in calendarDays" 
            :key="index"
            class="calendar-day" 
            :class="{ 
              'empty': !day.date, 
              'today': day.isToday,
              'checked-in': day.checkedIn
            }"
          >
            <span v-if="day.date" class="day-number">{{ day.date }}</span>
            <div v-if="day.checkedIn" class="check-mark">
              <tech-icon icon="Check" :size="14" />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 今日打卡 -->
    <div class="today-checkin">
      <h3 class="section-title">今日打卡</h3>
      
      <div class="checkin-card" :class="{ 'checked': todayChecked }">
        <div class="checkin-info">
          <h4>健康用眼打卡</h4>
          <p>{{ formatDate(new Date()) }}</p>
          <div class="checkin-tasks">
            <div class="task-item">
              <div class="task-check" :class="{ 'completed': todayChecked }">
                <tech-icon v-if="todayChecked" icon="Check" :size="16" />
              </div>
              <span>坚持健康用眼</span>
            </div>
            <div class="task-item">
              <div class="task-check" :class="{ 'completed': todayChecked }">
                <tech-icon v-if="todayChecked" icon="Check" :size="16" />
              </div>
              <span>远离视频沉迷</span>
            </div>
          </div>
        </div>
        
        <div class="checkin-action">
          <button 
            class="checkin-btn" 
            :class="{ 'checked': todayChecked }" 
            @click="handleCheckin"
            :disabled="todayChecked"
          >
            <span v-if="!todayChecked">立即打卡</span>
            <span v-else>已打卡</span>
          </button>
        </div>
      </div>
    </div>
    
    <!-- 打卡记录 -->
    <div class="checkin-records">
      <div class="records-header">
        <h3 class="section-title">打卡记录</h3>
        <a href="#" class="more-link">
          <span>全部记录</span>
          <tech-icon icon="Right" :size="14" />
        </a>
      </div>
      
      <div class="record-list">
        <div class="record-item" v-for="(record, index) in recentRecords" :key="index">
          <div class="record-date">
            <div class="record-day">{{ record.day }}</div>
            <div class="record-month">{{ record.month }}</div>
          </div>
          <div class="record-content">
            <div class="record-title">{{ record.title }}</div>
            <div class="record-details">{{ record.details }}</div>
          </div>
          <div class="record-status" :class="{ 'success': record.status === 'success' }">
            {{ record.status === 'success' ? '成功' : '失败' }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部导航 -->
    <bottom-nav />
    
    <!-- 打卡成功弹窗 -->
    <div class="checkin-success-modal" v-if="showSuccessModal">
      <div class="success-modal-content">
        <div class="success-icon">
          <tech-icon icon="Check" :size="40" />
        </div>
        <h3>打卡成功</h3>
        <p>您已连续打卡 {{ continuousDays }} 天</p>
        <div class="particle-container">
          <div class="success-particle" v-for="i in 20" :key="i"></div>
        </div>
      </div>
    </div>
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
  data() {
    return {
      currentDate: new Date(),
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      weekdays: ['日', '一', '二', '三', '四', '五', '六'],
      checkinDays: 15,
      continuousDays: 7,
      todayChecked: false,
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
      ]
    }
  },
  computed: {
    currentMonthYear() {
      const month = this.currentDate.toLocaleString('zh-CN', { month: 'long' })
      const year = this.currentDate.getFullYear()
      return `${year}年${month}`
    },
    calendarDays() {
      const year = this.currentYear
      const month = this.currentMonth
      
      // 获取当月第一天和最后一天
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      
      const daysInMonth = lastDay.getDate()
      const firstDayOfWeek = firstDay.getDay()
      
      // 创建日历数组
      const calendar = []
      
      // 填充前面的空白
      for (let i = 0; i < firstDayOfWeek; i++) {
        calendar.push({
          date: null,
          isToday: false,
          checkedIn: false
        })
      }
      
      // 填充日期
      const today = new Date()
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day)
        const isToday = date.toDateString() === today.toDateString()
        
        // 检查是否打卡
        const dateKey = this.formatDateKey(date)
        const checkedIn = !!this.checkinData[dateKey]
        
        calendar.push({
          date: day,
          isToday,
          checkedIn: checkedIn || (day < today.getDate() && Math.random() > 0.2) // 模拟历史打卡数据
        })
      }
      
      return calendar
    }
  },
  methods: {
    prevMonth() {
      this.currentDate = new Date(this.currentYear, this.currentMonth - 1, 1)
      this.currentMonth = this.currentDate.getMonth()
      this.currentYear = this.currentDate.getFullYear()
    },
    nextMonth() {
      this.currentDate = new Date(this.currentYear, this.currentMonth + 1, 1)
      this.currentMonth = this.currentDate.getMonth()
      this.currentYear = this.currentDate.getFullYear()
    },
    formatDate(date) {
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    formatDateKey(date) {
      return this.formatDate(date).replace(/-/g, '')
    },
    handleCheckin() {
      if (this.todayChecked) return
      
      // 模拟打卡
      this.todayChecked = true
      
      // 更新打卡数据
      const today = new Date()
      const dateKey = this.formatDateKey(today)
      this.checkinData[dateKey] = {
        date: this.formatDate(today),
        time: new Date().toLocaleTimeString()
      }
      
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
    }
  }
}
</script>

<style scoped>
.checkin-screen {
  width: 100%;
  height: 100%;
  background-color: #f8f9fa;
  padding-bottom: 70px;
  overflow-y: auto;
  position: relative;
}

/* 顶部栏 */
.top-bar {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--dark-blue);
}

.action-buttons {
  display: flex;
  gap: 15px;
}

.action-icon {
  cursor: pointer;
  color: var(--dark-blue);
}

/* 日历区域 */
.calendar-section {
  margin: 20px;
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.month-selector {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.selector-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.selector-buttons h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--dark-blue);
}

.selector-icon {
  cursor: pointer;
  color: #666;
  padding: 5px;
  border-radius: 50%;
  background-color: #f5f5f5;
}

.month-stats {
  display: flex;
  justify-content: space-around;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 10px;
}

.month-stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 20px;
  font-weight: 700;
  color: var(--secondary-color);
}

.stat-label {
  font-size: 12px;
  color: #666;
}

.calendar {
  width: 100%;
}

.weekday-headers {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 10px;
}

.weekday-header {
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: #999;
  padding: 5px 0;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.calendar-day {
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-size: 14px;
}

.calendar-day.empty {
  background-color: transparent;
}

.calendar-day.today {
  background-color: rgba(30, 136, 229, 0.1);
  font-weight: bold;
  color: var(--secondary-color);
}

.calendar-day.checked-in {
  background-color: rgba(46, 204, 113, 0.1);
  color: var(--primary-color);
}

.calendar-day.checked-in .day-number {
  opacity: 0.7;
}

.check-mark {
  position: absolute;
  bottom: 2px;
  width: 16px;
  height: 16px;
  background-color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

/* 今日打卡 */
.today-checkin {
  margin: 0 20px 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--dark-blue);
  margin-bottom: 15px;
}

.checkin-card {
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
}

.checkin-card.checked {
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.1), rgba(30, 136, 229, 0.1));
  border: 1px solid rgba(46, 204, 113, 0.3);
}

.checkin-card::before {
  content: '';
  position: absolute;
  top: -100px;
  left: -100px;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, rgba(46, 204, 113, 0.5), rgba(30, 136, 229, 0.5));
  border-radius: 50%;
  opacity: 0;
  transform: scale(0);
  transition: all 0.5s;
  z-index: 0;
}

.checkin-card.checked::before {
  opacity: 0.1;
  transform: scale(10);
}

.checkin-info {
  flex: 1;
  z-index: 1;
}

.checkin-info h4 {
  font-size: 18px;
  font-weight: 600;
  color: var(--dark-blue);
  margin-bottom: 5px;
}

.checkin-info p {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

.checkin-tasks {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #666;
}

.task-check {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
}

.task-check.completed {
  border-color: var(--primary-color);
  background-color: var(--primary-color);
  color: white;
}

.checkin-action {
  display: flex;
  align-items: center;
  z-index: 1;
}

.checkin-btn {
  padding: 12px 24px;
  background: var(--primary-gradient);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(30, 136, 229, 0.3);
  transition: all 0.3s;
}

.checkin-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 7px 20px rgba(30, 136, 229, 0.4);
}

.checkin-btn.checked {
  background: #f0f0f0;
  color: #999;
  box-shadow: none;
}

.checkin-btn:disabled {
  cursor: default;
}

/* 打卡记录 */
.checkin-records {
  margin: 0 20px 20px;
}

.records-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.more-link {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--secondary-color);
  text-decoration: none;
  font-size: 14px;
}

.record-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.record-item {
  background-color: white;
  border-radius: 12px;
  padding: 15px;
  display: flex;
  align-items: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.record-date {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

.record-day {
  font-size: 24px;
  font-weight: 700;
  color: var(--dark-blue);
}

.record-month {
  font-size: 12px;
  color: #666;
}

.record-content {
  flex: 1;
}

.record-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--dark-blue);
  margin-bottom: 5px;
}

.record-details {
  font-size: 14px;
  color: #666;
}

.record-status {
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 20px;
  background-color: #f1f1f1;
  color: #999;
}

.record-status.success {
  background-color: rgba(46, 204, 113, 0.1);
  color: var(--primary-color);
}

/* 打卡成功弹窗 */
.checkin-success-modal {
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
  animation: fadeIn 0.3s;
}

.success-modal-content {
  width: 80%;
  max-width: 300px;
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  animation: scaleIn 0.3s;
}

.success-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #2ECC71, #1E88E5);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  color: white;
}

.success-modal-content h3 {
  font-size: 24px;
  font-weight: 600;
  color: var(--dark-blue);
  margin-bottom: 10px;
}

.success-modal-content p {
  font-size: 16px;
  color: #666;
}

.particle-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.success-particle {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--primary-color);
  opacity: 0.7;
  animation: particleExplode 1.5s forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes particleExplode {
  0% {
    transform: translate(0, 0) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx), var(--ty)) scale(1);
    opacity: 0;
  }
}

/* 动态生成粒子位置 */
.success-particle:nth-child(1) { --tx: -100px; --ty: -100px; }
.success-particle:nth-child(2) { --tx: 100px; --ty: -100px; }
.success-particle:nth-child(3) { --tx: -100px; --ty: 100px; }
.success-particle:nth-child(4) { --tx: 100px; --ty: 100px; }
.success-particle:nth-child(5) { --tx: -50px; --ty: -150px; }
.success-particle:nth-child(6) { --tx: 50px; --ty: -150px; }
.success-particle:nth-child(7) { --tx: -50px; --ty: 150px; }
.success-particle:nth-child(8) { --tx: 50px; --ty: 150px; }
.success-particle:nth-child(9) { --tx: -150px; --ty: -50px; }
.success-particle:nth-child(10) { --tx: 150px; --ty: -50px; }
.success-particle:nth-child(11) { --tx: -150px; --ty: 50px; }
.success-particle:nth-child(12) { --tx: 150px; --ty: 50px; }
.success-particle:nth-child(13) { --tx: -120px; --ty: -80px; }
.success-particle:nth-child(14) { --tx: 120px; --ty: -80px; }
.success-particle:nth-child(15) { --tx: -120px; --ty: 80px; }
.success-particle:nth-child(16) { --tx: 120px; --ty: 80px; }
.success-particle:nth-child(17) { --tx: -80px; --ty: -120px; }
.success-particle:nth-child(18) { --tx: 80px; --ty: -120px; }
.success-particle:nth-child(19) { --tx: -80px; --ty: 120px; }
.success-particle:nth-child(20) { --tx: 80px; --ty: 120px; }
</style> 