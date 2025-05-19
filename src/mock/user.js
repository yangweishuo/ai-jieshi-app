import Mock from 'mockjs'

const Random = Mock.Random

// 模拟登录API
const login = (options) => {
  const { username, password } = JSON.parse(options.body)
  
  if (username && password) {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: Random.guid(),
        username: username,
        nickname: '用户_' + Random.string('number', 4),
        avatar: Random.image('100x100', '#1E88E5', '#fff', 'Avatar')
      }
    }
  } else {
    return {
      code: 400,
      message: '用户名或密码不正确',
      data: null
    }
  }
}

// 模拟注册API
const register = (options) => {
  const { username, phone, password } = JSON.parse(options.body)
  
  if (username && phone && password) {
    return {
      code: 200,
      message: '注册成功',
      data: {
        token: Random.guid(),
        username: username,
        nickname: '用户_' + Random.string('number', 4),
        avatar: Random.image('100x100', '#1E88E5', '#fff', 'Avatar')
      }
    }
  } else {
    return {
      code: 400,
      message: '注册信息不完整',
      data: null
    }
  }
}

// 模拟获取用户信息API
const getUserInfo = () => {
  return {
    code: 200,
    message: 'success',
    data: {
      id: Random.id(),
      username: 'testuser',
      nickname: '用户_' + Random.string('number', 4),
      avatar: Random.image('100x100', '#1E88E5', '#fff', 'Avatar'),
      gender: Random.pick(['男', '女', '保密']),
      age: Random.integer(18, 60),
      phone: '1' + Random.string('number', 10),
      email: Random.email(),
      createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
      lastLoginTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
      role: 'user',
      level: Random.integer(1, 10),
      points: Random.integer(0, 10000),
      checkinDays: Random.integer(0, 365),
      continuousCheckinDays: Random.integer(0, 30)
    }
  }
}

export default {
  login,
  register,
  getUserInfo
} 