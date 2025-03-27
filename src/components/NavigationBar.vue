<script setup>
import { ElMenu, ElMenuItem, ElSubMenu, ElAvatar } from "element-plus";
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getUserInfo } from '@/api/user.js';

const router = useRouter();
const userInfo = ref(null);
const isLoggedIn = computed(() => !!localStorage.getItem('token'));

onMounted(async () => {
  await loadUserInfo();
});

const loadUserInfo = async () => {
  const username = localStorage.getItem('username');
  if (username) {
    try {
      const res = await getUserInfo(username);
      if (res.code === '200') {
        userInfo.value = res.data;
      }
    } catch (error) {
      console.error('获取用户信息失败', error);
    }
  }
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  userInfo.value = null;
  router.push('/login');
};
</script>

<template>
  <div class="nav-bar-container">
    <el-menu
        class="nav-bar"
        mode="horizontal"
        :router="true"
    >
      <el-menu-item index="/">番茄书城</el-menu-item>
      <el-menu-item index="/cart">购物车</el-menu-item>
      <el-menu-item index="/warehouse">库存管理</el-menu-item>
      
      <div class="flex-spacer"></div>
      
      <template v-if="isLoggedIn">
        <el-sub-menu index="user" class="user-menu">
          <template #title>
            <el-avatar 
              :size="30" 
              :src="userInfo?.avatar" 
              v-if="userInfo && userInfo.avatar">
            </el-avatar>
            <span v-else>{{ userInfo?.name || userInfo?.username || '用户' }}</span>
          </template>
          <el-menu-item index="/profile">个人信息</el-menu-item>
          <el-menu-item @click="logout">退出登录</el-menu-item>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item index="/login">登录</el-menu-item>
        <el-menu-item index="/register">注册</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<style scoped>
.nav-bar-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  height: 60px;
}

.nav-bar {
  display: flex;
  width: 100%;
  margin: 0 auto;
  height: 100%;
}

.flex-spacer {
  flex-grow: 1;
}

.user-menu {
  margin-right: 20px;
}
</style>
