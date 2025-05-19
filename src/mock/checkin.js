import Mock from 'mockjs'

const Random = Mock.Random

// 模拟获取打卡记录API
const getCheckinRecords = (options) => {
  // 从查询参数中获取月份，如果没有默认为当前月
  const queryString = options.url.split('?')[1] || ''
  const params = new URLSearchParams(queryString)
  const monthParam = params.get('month') || new Date().getMonth() + 1
  const yearParam = params.get('year') || new Date().getFullYear()
  
  // 获取指定月份的天数
  const daysInMonth = new Date(yearParam, monthParam, 0).getDate()
  
  // 生成一个月的打卡记录
  const records = []
  const checkinDays = Random.integer(Math.floor(daysInMonth * 0.3), Math.floor(daysInMonth * 0.8))
  
  // 随机选择一些日期作为已打卡的日期
  const checkinDates = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    .sort(() => Math.random() - 0.5)
    .slice(0, checkinDays)
  
  for (const date of checkinDates) {
    records.push({
      id: Random.id(),
      date: `${yearParam}-${monthParam.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`,
      checkinTime: Random.time('HH:mm:ss'),
      moodLevel: Random.integer(1, 5),
      usageTime: Random.integer(30, 480), // 单位：分钟
      restTimes: Random.integer(1, 8),
      comment: Random.boolean(0.7) ? Random.csentence(5, 15) : '',
      eyeExercise: Random.boolean(0.6),
      images: Random.boolean(0.3) ? Array.from({ length: Random.integer(1, 3) }, () => 
        Random.image('200x200', Random.color(), '#fff', 'Check-in')
      ) : []
    })
  }
  
  return {
    code: 200,
    message: 'success',
    data: {
      total: records.length,
      records: records.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
  }
}

// 模拟提交打卡API
const submitCheckin = (options) => {
  const data = JSON.parse(options.body)
  
  if (!data) {
    return {
      code: 400,
      message: '打卡数据不能为空',
      data: null
    }
  }
  
  return {
    code: 200,
    message: '打卡成功',
    data: {
      id: Random.id(),
      date: data.date || Random.date('yyyy-MM-dd'),
      checkinTime: Random.time('HH:mm:ss'),
      ...data,
      points: Random.integer(5, 20) // 奖励积分
    }
  }
}

// 模拟获取月度打卡统计API
const getMonthStats = () => {
  return {
    code: 200,
    message: 'success',
    data: {
      totalDays: Random.integer(15, 30),
      continuousMaxDays: Random.integer(3, 15),
      currentContinuousDays: Random.integer(0, 7),
      averageUsageTime: Random.integer(120, 300),
      averageRestTimes: Random.float(2, 6, 0, 1),
      eyeExerciseDays: Random.integer(5, 20),
      moodDistribution: {
        great: Random.integer(3, 10),
        good: Random.integer(5, 15),
        normal: Random.integer(5, 10),
        bad: Random.integer(0, 5),
        terrible: Random.integer(0, 3)
      },
      completionRate: Random.float(0.3, 1, 0, 2) // 打卡完成率
    }
  }
}

export default {
  getCheckinRecords,
  submitCheckin,
  getMonthStats
} 