import Mock from 'mockjs'

const Random = Mock.Random

// 模拟首页数据API
const getHomeData = () => {
  return {
    code: 200,
    message: 'success',
    data: {
      // 用户基本信息
      userInfo: {
        username: 'testuser',
        nickname: '用户_' + Random.string('number', 4),
        avatar: Random.image('60x60', '#1E88E5', '#fff', 'User'),
        level: Random.integer(1, 10),
        points: Random.integer(0, 10000)
      },
      // 当日使用数据
      todayData: {
        usageTime: Random.integer(0, 360), // 单位：分钟
        restTimes: Random.integer(0, 10),
        eyeExerciseTimes: Random.integer(0, 5),
        goalCompletion: Random.float(0, 1, 0, 2) // 0-1之间的小数，保留2位
      },
      // 一周趋势数据
      weekTrend: Array.from({ length: 7 }, () => ({
        date: Random.date('MM-dd'),
        usageTime: Random.integer(30, 360),
        restTime: Random.integer(10, 60)
      })),
      // 健康建议
      healthSuggestions: [
        '每使用电子设备30-40分钟，请休息至少10分钟',
        '眨眼频率应保持在每分钟15-20次',
        '保持眼睛距离屏幕50-70厘米',
        '定期做眼保健操可以缓解视疲劳'
      ].slice(0, Random.integer(1, 4)),
      // 成就徽章
      achievements: Array.from({ length: Random.integer(3, 6) }, () => ({
        id: Random.id(),
        name: Random.pick(['护眼达人', '作息规律', '自律之星', '健康先锋', '眼部保健', '防沉迷专家']),
        icon: Random.pick(['Trophy', 'Medal', 'Star', 'Like', 'Success', 'Eye']),
        description: Random.sentence(5, 10),
        earnedDate: Random.date('yyyy-MM-dd')
      }))
    }
  }
}

// 模拟健康提示API
const getHealthTips = () => {
  const categories = ['用眼习惯', '睡眠建议', '运动提醒', '饮食建议']
  
  return {
    code: 200,
    message: 'success',
    data: Array.from({ length: Random.integer(5, 10) }, () => ({
      id: Random.id(),
      category: Random.pick(categories),
      title: Random.ctitle(5, 10),
      content: Random.cparagraph(1, 3),
      imageUrl: Random.image('300x200', Random.color(), '#fff', 'Tip'),
      tags: Array.from({ length: Random.integer(1, 3) }, () => 
        Random.pick(['实用', '科学', '简单', '效果好', '专家推荐'])
      ),
      likeCount: Random.integer(0, 1000),
      createdTime: Random.datetime('yyyy-MM-dd HH:mm:ss')
    }))
  }
}

export default {
  getHomeData,
  getHealthTips
} 