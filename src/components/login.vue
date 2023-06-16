<template>
  <el-container class="container">
    <el-main class="content">
      <el-row style="width: 100%;margin-bottom:80px;display: flex;justify-content: center;">
        <el-col :xs="23" :sm="12" :md="12" :lg="8" :xl="24" style="display: flex;justify-content: center;">
          <div class="form-container">
            <h1 class="title">Login</h1>
            <el-form :model="LoginForm" status-icon label-position="top" label-width="auto" :rules="rules" ref="LoginForm"
              class="loginForm">
              <el-form-item prop="checkUserName" label="用户名：">
                <el-input type="text" placeholder="请输入用户名" v-model="LoginForm.checkUserName"
                  autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item prop="checkUserpwd" label="密码：">
                <el-input type="password" placeholder="请输入密码" v-model="LoginForm.checkUserpwd"
                  autocomplete="off"></el-input>
              </el-form-item>
              <!-- <el-form-item label="验证码" prop="checkCode" class="code">
              <el-input type="text" v-model="LoginForm.checkCode"></el-input>
              <a href="javascript:;"><img src="" width="100px" height="40px" @click="changeCode" ref="imgCode" /></a>
            </el-form-item> -->
              <el-form-item style="text-align: center;">
                <el-radio-group v-model="userType">
                  <el-radio label="0">普通用户</el-radio>
                  <el-radio label="1">管理员</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-button type="success" class="loginBtn" @click="submitForm('LoginForm')">登录</el-button>
              <div class="msg">
                还没有账号？
                <a href="#">立即注册</a><br>
                <router-link to="/home">返回主页</router-link>
              </div>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    let userNamePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if (value.length < 6 || value.length > 16) {
        callback(new Error('用户名长度在6-16字符之间！'))
      } else {
        callback();
      }
    };
    let userPwdPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length < 6 || value.length > 16) {
        callback(new Error('密码长度在6-16字符之间！'))
      } else {
        callback();
      }
    };
    return {
      //用户类型，0为普通用户，1为管理员
      userType: '0',
      LoginForm: {
        checkUserName: '',
        checkUserpwd: '',
      },
      rules: {
        checkUserName: [
          { validator: userNamePass, trigger: 'blur' }
        ],
        checkUserpwd: [
          { validator: userPwdPass, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.userLogin();
        } else {
          this.warnTip();
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //登录的回调函数
    async userLogin() {
      try {
        const { checkUserName: loginName, checkUserpwd: loginPwd } = this.LoginForm;
        const type = this.userType;
        if (loginName && loginPwd && type) {
          await this.$store.dispatch('userLogin', { loginName, loginPwd, type })
          this.successTip();
          if (type == 1) {
            this.$router.replace({ name: 'admin' })
          } else {
            this.$router.replace('/home')
          }
        }
      } catch (error) {
        this.errorTip();
      }
    },
    register() {

    },
    //成功提示信息
    successTip() {
      this.$message({
        showClose: true,
        duration: 100,
        message: '登录成功，山友缘欢迎您',
        type: 'success'
      })
    },
    //警告提示信息
    warnTip() {
      this.$message({
        showClose: true,
        message: '请检查输入的信息',
        duration: 2000,
        type: 'warning'
      });
    },
    //错误提示信息
    errorTip() {
      this.$message({
        showClose: true,
        message: '用户名或密码错误',
        duration: 2000,
        type: 'error'
      });
    },
  },
  mounted() {
    history.pushState(null, null, document.URL)
    window.addEventListener(
      'popstate',
      function () {
        history.pushState(null, null, document.URL)
      },
      false
    )
  }
}
</script>

<style lang="less" scoped>
.el-main {
  padding: 0;
}

.container {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, #c2fbe8, #6da0af);

  .content {

    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .form-container {
      box-sizing: border-box;
      width: 380px;
      height: 520px;
      padding: 20px 40px;
      background-color: #fff;
      border-radius: 15px;

      .title {
        font-size: 30px;
        text-align: center;
        color: #8bc0c3;
      }

      /deep/.loginForm {
        margin-top: 12px;

        .el-form-item {

          margin-bottom: 16px;

          /* 选中后的字体颜色 */
          .el-radio__input.is-checked+.el-radio__label {
            color: #28d4c1 !important;
          }

          /* 选中后小圆点的颜色 */
          .el-radio__input.is-checked .el-radio__inner {
            background: #28d4c1 !important;
            border-color: #28d4c1 !important;
          }
        }
      }

      .loginBtn {
        box-sizing: border-box;
        text-align: center;
        padding: 15px;
        width: 100%;
        background-image: linear-gradient(to right, #a6c1ee, #c2fbea);
        color: #fff;
      }

      .msg {
        text-align: center;
          margin-top: 20px;
          line-height: 40px;
        a {
          color: #78acb6;
        }
      }
    }
  }
}
</style>