<template>
  <el-container class="container">
    <!-- 页头 -->
    <el-header class="header-container">
      <h3 class="logo">山友缘后台管理</h3>
      <div class="msg-col">
        <a href="javascript:"><span>管理员 {{ userInfo.nickName }}</span></a>
        <a href="javascript:" @click="loginOut(userInfo.id, userInfo.type)">退出登录</a>
      </div>
    </el-header>
    <el-container style="height: 100%;">
      <!-- 侧边栏 -->
      <el-aside width="250px" class="aside-container" style="height: 100%;">
        <el-menu default-active="2" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" style="overflow: hidden;height: 100%;">
          <el-menu-item index="/admin">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>首页</span>
            </template>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">管理中心</span>
            </template>
            <el-menu-item index="/admin/changePwd">修改密码</el-menu-item>
            <el-menu-item index="/admin/manage">用户管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">活动管理</span>
            </template>
            <el-menu-item index="/admin/activities1">登山活动管理</el-menu-item>
            <el-menu-item index="/admin/activities2">中长途活动管理</el-menu-item>
          </el-submenu>
          <el-menu-item index="/admin/audit">
            <i class="el-icon-setting"></i>
            <span slot="title">内容审计</span>
          </el-menu-item>
          <el-menu-item index="/admin/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">系统管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 内容 -->
      <el-main class="main-container">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">">
          <el-breadcrumb-item v-for="(item, index) in breadList" :key="index" :to="{ path: item.path }">{{ item.meta
          }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 路由组件 -->
        <div class="router-container">
          <div v-if="isHome(this.$route)" class="index">
            <h1>欢迎来到山友缘</h1>
            <h1>欢迎您，管理员{{ userInfo.nickName }}</h1>
          </div>
          <router-view></router-view>
        </div>

      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapGetters } from 'vuex';
import { loginOutLS } from '@/utils/loginOut'
export default {
  data() {
    return {
      //用于动态生成面包屑
      breadList: [],
    }
  },
  watch: {
    //监听路由改变变化面包屑
    $route() {
      this.getBreadcrumb()
    },
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  methods: {
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    },
    isHome(route) {
      return route.name === 'admin'
    },
    //获取面包屑内容
    getBreadcrumb() {
      let matched = this.$route.matched
      if (!this.isHome(matched[0])) {
        matched = [].concat(matched)
      }
      this.breadList = matched
    },
    //管理员退出登录
    async loginOut(id, type) {
      let res = await this.$store.dispatch('userLoginOut', { id: id, type: type })
      if (res == 'ok') {
        this.$router.replace('/login')
      }
    }
  },
  created() {
    this.getBreadcrumb()
  },
  mounted() {
    history.pushState(null, null, document.URL)
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #f6f8fa;
}

.header-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #545c64;
  box-shadow: 0px 5px 5px #afc4d9;

  .logo {
    display: block;
    padding-left: 15px;
    color: aliceblue;
    font-size: 22px;
  }

  .msg-col {
    margin-left: auto;

    a {
      margin-right: 10px;
      color: aliceblue;
    }
  }
}

.aside-container {
  z-index: 999;
}

.main-container {
  background-color: #f6f8fa;
  display: flex;
  flex-direction: column;

  .el-breadcrumb {
    background-color: #fff;
    display: flex;
    justify-content: center;
    font-size: 18px;
    padding: 10px 0;
    margin-bottom: 20px;
  }

  .router-container {
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-content: center;
    flex: 1;

    .index {
      height: 500px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      h1 {
        margin-bottom: 60px;
        font-size: 32px;
      }
    }
  }
}
</style>