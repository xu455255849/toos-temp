<template>
  <div class="component-crop">
    <el-dialog
        title="图片上传"
        :visible.sync="show"
        :width="width"
        :before-close="handleClose"
    >
      <div style="padding-bottom: 20px">
        <el-upload
            style="display: inline"
            action="//"
            :http-request="fileSelect"
            :show-file-list="false"
        >
          <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </el-upload>
        <span style="margin-left: 20px">建议像素 {{ imgWidth }}（宽）* {{ imgHeight }}（高），JPG 或者 PNG 格式，大小不超过 {{ maxSize }} M。</span>
      </div>
      
      <div v-show="showCrop">
        <el-row>
          <el-col :span="12">
            <div style="height: 250px;width: 100%">
              <vueCropper
                  ref="cropper"
                  :img="cropUrl"
                  :fixed="true"
                  :fixedNumber="fixedNumber"
                  :autoCrop="true"
                  @realTime="realTime"
              ></vueCropper>
            </div>
          </el-col>
          <el-col :span="12">
            <div
                :style="{'width': previews.w + 'px',
               'height': previews.h + 'px',
               'overflow': 'hidden',
               'margin': '20px 5px'}"
            >
              <div :style="previews.div">
                <img :src="cropUrl" :style="previews.img" />
              </div>
            </div>
          </el-col>
        </el-row>
        <br />
        <div slot="footer" style="text-align: center">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="upload">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import VueCropper from 'vue-cropper'
  export default {
    name: "ImgCrop",
    props: {
      width: {
        type: String,
        default: '50%'
      },
      imgWidth: {
        type: Number,
        default: 160
      },
      imgHeight: {
        type: Number,
        default: 90
      },
      show: {
        type: Boolean,
        default: false
      },
      maxSize: {
        type: Number,
        default: 2
      },
      fixedNumber: {
        type: Array,
        default: [16, 9]
      },
      tokenUrl: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        showCrop: false,
        cropUrl: '',
        previews: ''
      }
    },
    methods: {
      async fileSelect (param) {
        if (param.file.size / 1024 / 1024 > this.maxSize) {
          const errMessage = `上传图片大小不能超过 ${this.maxSize} MB!`;
          this.$message.warning(errMessage);
          return false
        } else if (param.file.type !== 'image/png' && param.file.type !== 'image/jpeg' ) {
          this.$message.warning('上传图片只能是 JPG 或 PNG 格式!');
          return false
        }
        this.showCrop = true;
        this.$refs.cropper.startCrop();
        this.cropUrl = URL.createObjectURL(param.file)
      },
      
      realTime (data) {
        this.previews = data
      },
      
      upload () {
        this.$refs.cropper.getCropBlob( async (blob) => {
          this.$refs.cropper.stopCrop()
          this.$refs.cropper.clearCrop()
          this.$emit('on-success', blob)
        })
      },
      
      handleClose () {
        this.$emit('on-close')
      }
    },
    components: {
      VueCropper
    }
  }
</script>
