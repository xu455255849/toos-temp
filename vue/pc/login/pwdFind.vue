<template>
    <div class="component-find">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="demo-ruleForm">
        <el-form-item  label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="form.code" placeholder="验证码">
            <template slot="append">
              <el-button type="text" style="padding:0 20px" @click="getCode" :disabled="form.phone.length !== 11 || time !== 60">{{ codeTxt }}</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item  label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <div class="tc">
          <el-button style="width: 100%" type="primary" @click="submit">提交</el-button>
          <slot name="ctx"></slot>
        </div>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "component-find",
        data() {
          const regPassword = new RegExp('^[a-z0-9_]{2,20}$', 'i');
          const regPhone = new RegExp('^[0-9]{11,11}$', 'i');
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
              codeTxt: '获取验证码' ,
              form: {
                phone: '',
                code: '',
                password: ''
              },
              rules: {
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
          submit () {
            this.$refs['form'].validate( async (valid) => {
              if (valid) {
                let { data } = await this.$http({
                  method: 'post',
                  url: '/business/user/reset-password',
                  data: {
                    code: this.form.code,
                    number: this.form.phone,
                    password: this.form.password
                  }
                });
                if (data.statusCode == 200) {
                  this.$message.success('密码修改成功！');
                  setTimeout(function () {
                    location.reload()
                  }, 2000)
                }
              }
            });
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
                from: 2
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
  .component-find {
  
  }
</style>
