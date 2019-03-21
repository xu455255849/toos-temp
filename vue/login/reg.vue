<template>
  <div class="page-reg">
    <el-form :model="form" :rules="rules" class="demo-ruleForm" label-width="80px" ref="form">
      <el-form-item label="企业名称" prop="name">
        <el-input placeholder="请输入企业名称" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="企业地区" prop="name2">
        <div style="width: 600px;">
          <div data-toggle="distpicker" id="target">
            <select class="form-province" data-province="" id="data-province" v-model="form.province"></select>
            <select class="form-province" data-city="" id="data-city" v-model="form.city"></select>
            <el-input placeholder="请输入企业邮箱" style="display: none;" v-model="form.email1"></el-input>
          </div>
        </div>
        <el-input placeholder="请输入企业名称" style="display: none" v-model="form.name2"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input placeholder="请输入企业邮箱" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input placeholder="请输入手机号" v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input placeholder="请输入验证码" style="width: 50%" v-model="form.code"></el-input>
        <el-button :disabled="(!form.phone)||downTime" @click="getCode" style="float: right;width: 112px;"
                   type="primary">{{ vertyTxt }}
        </el-button>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input placeholder="请输入密码" type="password" v-model="form.password"></el-input>
      </el-form-item>
      <div class="tc">
        <el-button :disabled="!(form.province&&form.city&&form.name&&form.email&&form.phone&&form.code&&form.password)"
                   @click="reg" style="width: 100%" type="primary">注册
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  
  import jquery from 'jquery';
  
  export default {
    name: 'page-reg',
    data() {
      return {
        vertyTxt: '获取验证码',
        downTime: false,
        form: {
          name: '',
          email: '',
          phone: '',
          code: '',
          password: '',
          checked: false,
          province: '',
          city: '',
        },
        rules: {
          name2: [
            {required: true, message: '请输入企业名称', trigger: 'blur'},
            {min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入企业名称', trigger: 'blur'},
            {min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur'}
          ],
          emai1: [
            {required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'},
          ],
          email: [
            {required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {min: 11, max: 11, message: '请输入正确的手机号码', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          code: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
          ]
        }
      }
    },
    filters: {},
    methods: {
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
      async reg() {
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
        const res = await this.$api.base.reg({
          code: this.form.code,
          email: this.form.email,
          number: this.form.phone,
          password: this.form.password,
          username: this.form.name,
          province: this.form.province,
          city: this.form.city
        });
        if (res.fail()) {
          this.$message.error(res.message);
          return false
        }
        this.$message({
          message: '注册成功, 1s 后返回登录页',
          type: 'success'
        });
        setTimeout(() => {
          this.$emit('return');
        }, 1200);
      },
      async getCode() {
        const res = await this.$api.base.getCode({
          number: this.form.phone,
          from: 1,
          checkNumberUsed: true
        });
        if (res.fail()) {
          this.$message.error(res.message);
          return false
        }
        this.startDownTime();
        this.$message({
          message: '验证码已发送，请查收',
          type: 'success'
        });
      }
    },
    components: {},
    mounted: function () {
      jquery('#target').distpicker();
    },
  }
</script>

<style scoped>
  
  .form-province {
    padding: 10px 15px;
    display: inline-block;
    height: 40px;
    margin-right: 28px;
    outline: none;
    border: 1px solid #dcdfe6;
    background-color: #fff;
    width: 132px;
    color: #666;
  }

</style>
