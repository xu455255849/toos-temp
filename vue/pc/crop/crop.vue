<template>
  <div class="component-crop">
    <div class="mask" v-show="option.showCrop">
      <div class="out-block">
        <p>图片裁剪</p>
        <div class="crop">
          <vueCropper
            ref="cropper"
            :img="option.cropUrl"
            :fixed="true"
            :fixedNumber="option.fixedNumber"
            :autoCrop="true"
          ></vueCropper>
        </div>
        <div class="tc" style="padding: 20px">
          <el-button @click="option.showCrop = false">取 消</el-button>
          <el-button type="primary" @click="upload">确 定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VueCropper from 'vue-cropper'
  export default {
    name: "component-crop",
    props: {
      option: {
        type: Object
      }
    },
    methods: {
      upload () {
        this.$emit('upload')
      }
    },
    components: {
      VueCropper
    }
  }
</script>

<style lang="less">
  .component-crop {
    .mask {
      position: fixed;
      z-index: 99999;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: rgba(0,0,0,0.5);
      .out-block {
        background: #fff;
        width: 35%;
        margin: 100px auto;
        p {
          font-size: 16px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-bottom:1px solid #e5e5e5;
        }
        .crop {
          margin: 20px 0;
          width: 100%;
          height: 250px;
        }
      }
    }
  }
</style>
