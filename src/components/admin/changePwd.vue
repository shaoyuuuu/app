<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
    style="width: 600px;padding-top: 50px;">
    <el-form-item label="原密码" prop="oldpass">
      <el-input type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPass">
      <el-input type="password" v-model="ruleForm.newPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认新密码" prop="checkNewPass">
      <el-input type="password" v-model="ruleForm.checkNewPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    let passRex = /^[a-zA-Z0-9_~@#%&*.]{6,18}$/
    var validateOldPass = (rule, value, callback) => {
      callback();
      if (value === '') {
        callback(new Error('请输入原密码'))
      } else if (!passRex.test(value)) {
        callback(
          new Error(
            '密码格式错误，长度在6-18位，由大小写字母、数字、_~@#%&*.组成'
          )
        )
      }
    }
    var validateNewPass = (rule, value, callback) => {
      callback();
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (!passRex.test(value)) {
        callback(
          new Error(
            '密码格式错误，长度在6-18位，由大小写字母、数字、_~@#%&*.组成'
          )
        )
      } else {
        if (this.ruleForm.checkNewPass !== '') {
          this.$refs.ruleForm.validateField('checkNewPass')
        }
        callback()
      }
    }
    var validateCheckNewPass = (rule, value, callback) => {
      callback();
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        oldpass: '',
        newPass: '',
        checkNewPass: '',
      },
      rules: {
        oldpass: [
          { validator: validateOldPass, trigger: 'blur' },
          { required: true, message: '请输入原密码', trigger: 'blur' },
        ],
        newPass: [
          { validator: validateNewPass, trigger: 'blur' },
          { required: true, message: '请输入新密码', trigger: 'blur' },
        ],
        checkNewPass: [
          { validator: validateCheckNewPass, trigger: 'blur' },
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await this.$store.dispatch('adminChangePwd', { id: this.userInfo.id, oldPwd: this.ruleForm.oldpass, newPwd: this.ruleForm.newPass })
          if (res=='ok') {
            this.$message({
              showClose: true,
              duration: 1500,
              message: '修改密码成功！',
              type: 'success'
            })
            this.resetForm("ruleForm")
          } else {
            this.$message({
              showClose: true,
              duration: 1500,
              message: '修改密码失败！请稍后重试',
              type: 'error'
            })
          }
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
  computed: {
    ...mapGetters(['userInfo']),
  }
}
</script>

<style></style>