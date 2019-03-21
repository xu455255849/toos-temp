<template>
  <div class="page-editLogin">
    <el-form :model="form" :rules="rules" class="demo-ruleForm" id="formed" label-width="80px" ref="form"
             v-if="form.isLogin">
      <el-form-item label="账号" prop="name">
        <el-input placeholder="请输入邮箱/手机号" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="forgetPwd" style="float: right" type="text">忘记密码?</el-button>
      </el-form-item>
      <div class="tc">
        <el-button :disabled="!(form.name&&form.password)" @click="login('form')" style="width: 100%" type="primary">
          登录
        </el-button>
        <input style="display: none" type="submit" value="Submit">
      </div>
    </el-form>
    
    <el-form :model="form" :rules="rules" class="demo-ruleForm" label-width="80px" ref="form" v-else>
      <el-form-item label="手机号" prop="resetName">
        <el-input placeholder="请输入手机号" v-model="form.resetName"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input placeholder="请输入验证码" style="width: 50%" v-model="form.code"></el-input>
        <el-button :disabled="(!form.resetName)||downTime" @click="getCode(form.resetName)"
                   style="float: right;width: 112px;" type="primary">{{ vertyTxt }}
        </el-button>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入新的密码" type="password" v-model="form.resetPassword"></el-input>
      </el-form-item>
      
      <div class="tc">
        <el-button :disabled="!(form.resetName&&form.code&&form.resetPassword)" @click="revise" style="width: 100%"
                   type="primary">修改密码
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  
  export default {
    name: 'page-editLogin',
    props: {
      form: {
        type: Object,
      },
      clip: {
        type: String,
      }
    },
    data() {
      return {
        downTime: false,
        vertyTxt: '获取验证码',
        rules: {
          name: [
            {required: true, message: '请输入邮箱/手机号', trigger: 'blur'},
            {min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur'}
          ],
          resetName: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          resetPassword: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
          ],
        }
      }
    },
    methods: {
      async revise() {
        if (this.form.resetPassword.length < 2 || this.form.resetPassword.length > 20) {
          this.$message({
            message: '密码长度必须在长度在 2 到 32 个字符之间',
            type: 'warning'
          });
          return false
        }
        const res = await this.$api.base.resetPwd({
          number: this.form.resetName,
          code: this.form.code,
          password: this.form.resetPassword,
        });
        if (res.fail()) {
          this.$message.error(res.message);
          return false
        }
        this.$message.success('密码修改成功!');
        this.form.title = '登录';
        this.form.isLogin = true;
      },
      forgetPwd() {
        this.form.title = '重置密码';
        this.form.isLogin = false;
        this.$refs['form'].resetFields()
      },
      async login() {
        if (this.form.name.length < 2 || this.form.name.length > 20) {
          this.$message({
            message: '账号长度必须在长度在 2 到 20 个字符之间',
            type: 'warning'
          });
          return;
        }
        if (this.form.password.length < 2 || this.form.password.length > 20) {
          this.$message({
            message: '密码长度必须在长度在 2 到 20 个字符之间',
            type: 'warning'
          });
          return;
        }
        const res = await this.$api.base.login({
          login: this.form.name,
          password: this.form.password
        });
        if (res.fail()) {
          this.$message.error(res.message);
          return false
        }
        this.$router.push({name: '订单列表'});
      },
      startDownTime() {
        this.downTime = true;
        this.vertyTxt = '60s';
        var dowmtime = 60;
        var timer = setInterval(() => {
          dowmtime--;
          if (dowmtime < 0) {
            this.downTime = false;
            this.vertyTxt = '获取验证码';
            clearInterval(timer);
          } else {
            this.vertyTxt = dowmtime + 's';
          }
        }, 1000);
      },
      async getCode(tel) {
        if (!telVertify(tel)) {
          this.$message({
            message: '手机格式不正确',
            type: 'warning'
          });
          return;
        }
        const {data} = await this.$ajax('/yunpaishe/user/sms', {
          number: tel,
          from: 2,
        });
        this.startDownTime();
        this.$message({
          message: '验证码已发送',
          type: 'success'
        });
      }
    },
    components: {},
    mounted() {
      var _this = this;
      $("#formed").submit(function (e) {
        _this.login();
        return false;
      });
    },
  }
  
  function telVertify(val) {
    if (/^1[34578]\d{9}$/.test(val)) {
      return true;
    }
    return false;
  }

</script>

<style scoped>
  .tc {
    text-align: center;
  }
  
  .page-editLogin {
    
    
  }
</style>
