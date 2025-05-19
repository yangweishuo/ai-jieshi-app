import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Splash',
    component: () => import('../views/SplashView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/checkin',
    name: 'CheckIn',
    component: () => import('../views/CheckInView.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/UnderConstructionView.vue')
  },
  {
    path: '/focus',
    name: 'Focus',
    component: () => import('../views/UnderConstructionView.vue')
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('../views/ForbiddenView.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // 这里可以添加身份验证逻辑
  // 例如: 检查用户是否已登录，未登录则跳转到登录页面
  
  // 模拟已登录状态，实际项目中应当从存储中获取
  const isAuthenticated = localStorage.getItem('user') !== null
  
  // 需要身份验证的路由（除登录、404、403和启动页面外）
  const requiresAuth = !['/login', '/404', '/403', '/'].includes(to.path)
  
  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router 