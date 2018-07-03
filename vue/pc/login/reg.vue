<template>
  <div class="component-reg">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="demo-ruleForm">
      <el-form-item  label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item  label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="form.code" placeholder="请输入验证码">
          <el-button slot="append" style="padding:0 20px" type="text" @click="getCode" :disabled="form.phone.length !== 11 || time !== 60">{{ codeTxt }}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item  label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.checked"></el-checkbox>
        <span>已阅读并同意
          <el-button type="text" @click="link('http://b.yunxi.tv/business/help/agreement')">《用户注册协议》</el-button>及
          <el-button type="text" @click="link('http://b.yunxi.tv/business/help/agreement-violation')">《云犀直播违规管理条例》</el-button>
        </span>
      </el-form-item>
      <div class="tc">
        <el-button style="width: 100%" type="primary" :disabled="!form.checked" @click="reg">注册</el-button>
        <slot name="ctx"></slot>
      </div>
    </el-form>

  </div>

</template>

<script>
    export default {
        name: "component-reg",
        data() {
          const regUser = new RegExp('^[a-z0-9_\u4e00-\u9fa5]{2,32}$', 'i');
          const regPassword = new RegExp('^[a-z0-9_]{2,20}$', 'i');
          const regPhone = new RegExp('^[0-9]{11,11}$', 'i');
          let checkUser = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入名称'));
            } else {
              if (!regUser.test(value)) {
                callback(new Error('长度在2 到 32 个字符且只能包含中英文、数字和下划线'));
              }
              callback();
            }
          };
          let checkPassword = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if (!regPassword.test(value)) {
                callback(new Error('长度在 2 到 20 个字符且只能包含英文、数字和下划线'));
              }
              callback();
            }
          };
          let checkPhone = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入手机号'));
            } else {
              if (!regPhone.test(value) || value.charAt(0) == '0') {
                callback(new Error('手机号格式不正确'));
              }
              callback();
            }
          };
            return {
              time: 60,
              codeTxt: '获取验证码',
              form: {
                name: '',
                phone: '',
                code: '',
                password: '',
                checked: true,
              },
              rules: {
                name: [
                  { required: true, validator: checkUser, trigger: 'blur' }
                ],
                phone: [
                  { required: true, validator: checkPhone, trigger: 'blur' }
                ],
                password: [
                  { required: true, validator: checkPassword, trigger: 'blur' }
                ],
                code: [
                  { required: true, message: '请输入验证码', trigger: 'blur' },
                ]
              }
            }
        },
        methods: {
          reg () {
            this.$refs['form'].validate( async (valid) => {
              if (valid) {
                let { data } = await this.$http({
                  method: 'post',
                  url: '/business/user/register',
                  data: {
                    code: this.form.code,
                    number: this.form.phone,
                    password: this.form.password,
                    username: this.form.name
                  }
                });
                if (data.statusCode == 200) {
                  this.$message.success('注册成功！');
                  setTimeout(function () {
                    location.reload()
                  }, 2000)
                }
              }
            });
          },
          link (url) {
            window.open(url, "_blank")
          },
          timer () {
            if (this.time > 0) {
              this.time --;
              this.codeTxt = this.time + 's';
              setTimeout( () => {
                this.timer()
              }, 1000)
            } else {
              this.time = 60;
              this.codeTxt = '获取验证码'
            }
          },
          async getCode () {
            this.timer();
            let { data } = await this.$http({
              method: 'post',
              url: '/business/user/sms',
              data: {
                number: this.form.phone,
                from: 1,
                checkNumberUsed: true
              }
            });
            if (data.statusCode == 200) {
              this.$message.success('验证码已发送，请查收')
            }
          }
        },
        mounted: function () {
        }
    }
</script>

<style lang="less">
  .component-reg {

  }

</style>
