<template>
    <div class="component-login">
      <el-form :model="form" :rules="rules" ref="form" label-width="50px" class="demo-ruleForm">
        <el-form-item  label="账号" prop="name">
          <el-input v-model="form.name" placeholder="请输入邮箱/手机号"></el-input>
        </el-form-item>
        <el-form-item  label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <slot name="ctx"></slot>
        <div class="tc" style="padding-top: 20px">
          <el-button style="display: block;width: 100%" type="primary" @click="login">登录</el-button>
        </div>
      </el-form>
    </div>
</template>

<script>

    export default {
        name: 'component-login',
        data() {
            return {
              form: {
                name: '',
                password: ''
              },
              rules: {
                name: [
                  { required: true, message: '请输入邮箱/手机号', trigger: 'blur' },
                  { min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur' }
                ],
                password: [
                  { required: true, message: '请输入密码', trigger: 'blur' },
                  { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ]
              }
            }
        },
        methods: {
          login () {
            this.$refs['form'].validate( async (valid) => {
              if (valid) {
                let { data } = await this.$http({
                  method: 'post',
                  url: '/business/user/login',
                  data: {
                    login: this.form.name,
                    password: this.form.password
                  }
                });
                if (data.statusCode == 200) {
                  this.$message.success('登录成功！');
                  sessionStorage.setItem('menu', '机构主页');
                  //sessionStorage.setItem('user', JSON.stringify(data.data));
                  this.$router.push({ name: '机构主页'})
                }
              }
            });
          }
        }
    }
</script>

<style lang="less">
    .component-login {

    }
</style>
