import Mock from 'mockjs'
import userApi from './user'
import homeApi from './home'
import checkinApi from './checkin'

// 设置延迟，模拟接口请求时间
Mock.setup({
  timeout: '200-600'
})

// 用户相关接口
// 登录
Mock.mock(/\/api\/user\/login/, 'post', userApi.login)
// 注册
Mock.mock(/\/api\/user\/register/, 'post', userApi.register)
// 获取用户信息
Mock.mock(/\/api\/user\/info/, 'get', userApi.getUserInfo)

// 首页相关接口
// 获取首页数据
Mock.mock(/\/api\/home\/data/, 'get', homeApi.getHomeData)
// 获取健康提示
Mock.mock(/\/api\/home\/tips/, 'get', homeApi.getHealthTips)

// 打卡相关接口
// 获取打卡记录
Mock.mock(/\/api\/checkin\/records/, 'get', checkinApi.getCheckinRecords)
// 提交打卡
Mock.mock(/\/api\/checkin\/submit/, 'post', checkinApi.submitCheckin)
// 获取月度打卡统计
Mock.mock(/\/api\/checkin\/stats/, 'get', checkinApi.getMonthStats)

export default Mock 