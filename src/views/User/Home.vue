<template>
  <el-container>
    <el-header>
      <div v-if="userInfo.nickName">
        欢迎{{ userInfo.nickName }}来到山友缘
        <a href="javascript:" @click="loginOut(userInfo.id, userInfo.type)">退出登录</a>
      </div>
      <div v-else>
        <router-link to="/login">登录</router-link>
      </div>
    </el-header>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {

    }
  },
  methods: {
    async loginOut(id, type) {
      let res = await this.$store.dispatch('userLoginOut', { id: id, type: type })
      if (res == 'ok') {
        this.$router.replace('/login')
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  mounted() {
  },
}
</script>

<style></style>