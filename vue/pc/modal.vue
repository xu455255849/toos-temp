<template>
  <div class="component-modal">
    <el-dialog
        :title="options.title"
        :visible.sync="options.isShow"
        :width="width"
        :before-close="close"
        center
    >
      <slot name="ctx"></slot>
      <span slot="footer" class="dialog-footer">
        <el-button @click="options.isShow = false">取 消</el-button>
        <el-button type="primary" :loading="options.loading" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  
  export default {
    name: 'component-modal',
    props: {
      options: {
        type: Object
      },
      width: {
        type: String,
        default: '35%'
      }
    },
    methods: {
      submit () {
        this.$emit('submit')
      },
      close (done) {
        this.$emit('close')
        done()
      }
    }
  }
</script>

<style lang="less">
  .component-modal {
    .el-dialog--center {
      min-width: 480px;
    }
  }
</style>
