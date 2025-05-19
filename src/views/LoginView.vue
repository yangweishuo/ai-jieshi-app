<template>
  <div class="login-screen">
    <!-- 顶部背景 -->
    <div class="login-header">
      <div class="header-curve"></div>
    </div>
    
    <!-- 登录表单区域 -->
    <div class="login-form-container">
      <!-- 标签页切换 -->
      <div class="tabs">
        <div 
          class="tab" 
          :class="{ active: activeTab === 'login' }" 
          @click="activeTab = 'login'"
        >
          登录
        </div>
        <div 
          class="tab" 
          :class="{ active: activeTab === 'register' }" 
          @click="activeTab = 'register'"
        >
          注册
        </div>
      </div>
      
      <!-- 提示消息 -->
      <div class="message" :class="[messageType, { show: showMessage }]">
        {{ messageText }}
      </div>
      
      <!-- 登录表单 -->
      <div class="form-container" :class="{ active: activeTab === 'login' }">
        <div class="input-group">
          <input 
            type="text" 
            placeholder="手机号/邮箱" 
            v-model="loginForm.username"
          >
        </div>
        
        <div class="input-group">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="密码" 
            v-model="loginForm.password"
          >
        </div>
        
        <!-- 验证码登录按钮 -->
        <div class="verification-login">
          <span @click="switchToVerificationLogin">使用验证码登录</span>
        </div>
        
        <!-- 登录按钮 -->
        <button 
          class="primary-button" 
          @click="handleLogin"
        >
          登录
        </button>
        
        <!-- 忘记密码链接 -->
        <div class="forgot-password">
          <a href="#" @click.prevent="forgotPassword">忘记密码?</a>
        </div>
        
        <!-- 第三方登录分隔线 -->
        <div class="divider">
          <span>or</span>
        </div>
        
        <!-- 第三方登录图标 -->
        <div class="social-icons">
          <div class="social-icon-item wechat">
            <tech-icon icon="Wechat" :size="24" />
          </div>
          <div class="social-icon-item qq">
            <tech-icon icon="QqZone" :size="24" />
          </div>
          <div class="social-icon-item weibo">
            <tech-icon icon="Weibo" :size="24" />
          </div>
        </div>
      </div>
      
      <!-- 注册表单 -->
      <div class="form-container" :class="{ active: activeTab === 'register' }">
        <div class="input-group">
          <input 
            type="text" 
            placeholder="手机号" 
            v-model="registerForm.phone"
          >
        </div>
        
        <div class="input-group">
          <input 
            type="text" 
            placeholder="邮箱" 
            v-model="registerForm.email"
          >
        </div>
        
        <div class="input-group">
          <input 
            :type="showRegPassword ? 'text' : 'password'" 
            placeholder="设置密码" 
            v-model="registerForm.password"
          >
        </div>
        
        <div class="input-group">
          <input 
            :type="showRegConfirmPassword ? 'text' : 'password'" 
            placeholder="确认密码" 
            v-model="registerForm.confirmPassword"
          >
        </div>
        
        <!-- 返回登录链接 -->
        <div class="back-to-login">
          <tech-icon icon="ArrowLeft" :size="16" custom-class="back-icon" />
          <span @click="activeTab = 'login'">已有账号，返回登录</span>
        </div>
        
        <!-- 注册按钮 -->
        <button 
          class="primary-button" 
          @click="handleRegister"
        >
          注册
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import TechIcon from '../components/TechIcon.vue'

export default {
  name: 'LoginView',
  components: {
    TechIcon
  },
  data() {
    return {
      activeTab: 'login',
      showPassword: false,
      showRegPassword: false,
      showRegConfirmPassword: false,
      showMessage: false,
      messageType: 'error',
      messageText: '',
      codeBtnDisabled: false,
      codeButtonText: '获取验证码',
      countdown: 60,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    handleLogin() {
      // 表单验证
      if (!this.loginForm.username || !this.loginForm.password) {
        this.showMessageTip('error', '请填写完整的登录信息');
        return;
      }
      
      // 模拟登录API调用(实际项目中应替换为真实API)
      // 存储用户信息到localStorage
      const userInfo = {
        username: this.loginForm.username,
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        level: 3,
        nickname: '李明'
      };
      
      localStorage.setItem('user', JSON.stringify(userInfo));
      
      // 登录成功后跳转到首页
      this.$router.push('/home');
    },
    
    handleRegister() {
      // 表单验证
      if (!this.registerForm.phone || !this.registerForm.email || 
          !this.registerForm.password || !this.registerForm.confirmPassword) {
        this.showMessageTip('error', '请填写完整的注册信息');
        return;
      }
      
      // 手机号格式验证
      const phoneReg = /^1[3-9]\d{9}$/;
      if (!phoneReg.test(this.registerForm.phone)) {
        this.showMessageTip('error', '请输入正确的手机号码');
        return;
      }
      
      // 邮箱格式验证
      const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailReg.test(this.registerForm.email)) {
        this.showMessageTip('error', '请输入正确的邮箱地址');
        return;
      }
      
      // 密码一致性验证
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        this.showMessageTip('error', '两次输入的密码不一致');
        return;
      }
      
      // 密码强度验证
      if (this.registerForm.password.length < 6) {
        this.showMessageTip('error', '密码长度不能少于6位');
        return;
      }
      
      // 模拟注册API调用(实际项目中应替换为真实API)
      // 创建用户信息并存储到localStorage
      const userInfo = {
        username: this.registerForm.email,
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        level: 1,
        nickname: '新用户'
      };
      
      localStorage.setItem('user', JSON.stringify(userInfo));
      
      // 调用注册API
      this.showMessageTip('success', '注册成功，即将跳转...');
      setTimeout(() => {
        this.$router.push('/home');
      }, 1500);
    },
    
    showMessageTip(type, text) {
      this.messageType = type;
      this.messageText = text;
      this.showMessage = true;
      
      setTimeout(() => {
        this.showMessage = false;
      }, 3000);
    },
    
    forgotPassword() {
      this.showMessageTip('info', '请通过邮箱或手机找回密码');
    },
    
    switchToVerificationLogin() {
      this.showMessageTip('info', '验证码登录功能即将上线');
    }
  }
}
</script>

<style scoped>
:root {
  --primary-color: #2ECC71;
  --secondary-color: #1E88E5;
  --primary-gradient: linear-gradient(90deg, #2ECC71, #1E88E5);
  --dark-blue: #333F50;
}

.login-screen {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #fff;
}

/* 顶部背景 */
.login-header {
  height: 120px;
  background: linear-gradient(90deg, #2ECC71, #1E88E5);
  position: relative;
  overflow: hidden;
}

.header-curve {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30px;
  background-color: white;
  border-radius: 50% 50% 0 0;
}

/* 登录表单区域 */
.login-form-container {
  flex: 1;
  padding: 20px 25px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  background-color: white;
}

.form-container {
  display: none;
  opacity: 0;
  transform: translateY(10px);
}

.form-container.active {
  display: flex;
  flex-direction: column;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

/* 标签页切换样式 */
.tabs {
  display: flex;
  margin-bottom: 25px;
  border-bottom: 1px solid #f0f0f0;
}

.tab {
  flex: 1;
  padding: 10px 0;
  text-align: center;
  font-weight: 500;
  color: #999;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 16px;
}

.tab.active {
  color: #1E88E5;
  font-weight: 500;
}

.tab.active:after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #1E88E5;
}

/* 输入框样式 */
.input-group {
  margin-bottom: 15px;
  position: relative;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.3s;
}

.input-group input:focus {
  border-color: #1E88E5;
  outline: none;
}

/* 验证码登录按钮 */
.verification-login {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 15px;
  cursor: pointer;
  background-color: #f8f8ff;
}

.verification-login span {
  color: #1E88E5;
  font-size: 14px;
}

/* 主按钮样式 */
.primary-button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(90deg, #2ECC71, #1E88E5);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 15px;
  transition: all 0.3s;
}

.primary-button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.primary-button:active {
  transform: translateY(1px);
}

/* 忘记密码样式 */
.forgot-password {
  text-align: center;
  margin-bottom: 15px;
}

.forgot-password a {
  color: #1E88E5;
  text-decoration: none;
  font-size: 14px;
}

/* 分隔线样式 */
.divider {
  display: flex;
  align-items: center;
  margin: 20px 0;
  position: relative;
}

.divider:before,
.divider:after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: #f0f0f0;
}

.divider span {
  padding: 0 15px;
  color: #999;
  font-size: 14px;
}

/* 社交图标样式 */
.social-icons {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
}

.social-icon-item {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #f0f0f0;
  transition: all 0.3s;
}

.social-icon-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.social-icon-item.wechat {
  color: #07C160;
}

.social-icon-item.qq {
  color: #12B7F5;
}

.social-icon-item.weibo {
  color: #E6162D;
}

/* 返回登录链接 */
.back-to-login {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
}

.back-to-login span {
  margin-left: 5px;
  color: #1E88E5;
  font-size: 14px;
}

.back-icon {
  color: #1E88E5;
}

/* 提示消息 */
.message {
  padding: 0;
  margin-bottom: 0;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  opacity: 0;
  height: 0;
  overflow: hidden;
  transition: all 0.3s;
}

.message.error {
  background-color: #FFF2F2;
  color: #E74C3C;
  border: 1px solid #FFCCCC;
}

.message.success {
  background-color: #F0FFF0;
  color: #2ECC71;
  border: 1px solid #CCFFCC;
}

.message.info {
  background-color: #F0F8FF;
  color: #1E88E5;
  border: 1px solid #CCE5FF;
}

.message.show {
  opacity: 1;
  height: auto;
  padding: 8px;
  margin-bottom: 15px;
}
</style> 