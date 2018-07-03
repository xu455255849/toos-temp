<template>
  <quill-editor v-model="form.content"
                ref="myQuillEditor"
                :options="editorOption"
  ></quill-editor>
</template>

<script>
  import '../../../assets/quill/quill.core.css'
  import '../../../assets/quill/quill.snow.css'
  import '../../../assets/quill/quill.bubble.css'
  import { quillEditor, Quill } from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
  Quill.register('modules/ImageExtend', ImageExtend);
    export default {
        name: "index",
      data () {
          return {
            editorOption: {
              placeholder: '请输入课程介绍...',
              modules: {
                ImageExtend: {
                  action: 'http://upload.qiniup.com/',
                  loading: true,
                  name: 'file',
                  size: 2, //图片大小 限制2mb
                  sizeError: () => {
                    this.$message.error('图片大小不能超过2M')
                  },
                  response: (res) => {
                    return this.$store.state.app.imgPrefix + res.key
                  },
                  end: () => {},
                  start: async () => {},
                  change: async (xhr, formData) => {
                    const file = formData.get('file');
                    formData.append('token', this.qnToken)
                  }
                },
                toolbar: {
                  container: [
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['link', 'image'],
                    ['blockquote', 'code-block'],

                    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                    [{ 'direction': 'rtl' }],                         // text direction

                    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                    //[{ 'font': [] }],
                    [{ 'align': [] }],

                    ['clean']                                         // remove formatting button
                  ],
                  handlers: {
                    'image': function () {  // 劫持原来的图片点击按钮事件
                      QuillWatch.emit(this.quill.id)
                    }
                  }
                }
              }
            },
          }
      },
      method: {
        async fileSelect (param) {
          if (param.file.size / 1024 / 1024 > 2) {
            this.$message.error('上传图片大小不能超过 2MB!');
            return false
          }
          if (param.file.type !== 'image/png' && param.file.type !== 'image/jpeg' ) {
            this.$message.error('上传图片只能是 JPG 或 PNG 格式!');
            return false
          }
          this.cropOption.showCrop = true;
          this.$refs.crop.$refs.cropper.startCrop();
          this.cropOption.cropUrl = URL.createObjectURL(param.file)
        },
        upload () {
          // 获取截图的blob数据
          this.$refs.crop.$refs.cropper.getCropBlob( async (blob) => {
            let qn = await uploadQiniu(blob);
            let res = await uploadImg(qn.data.key);
            if (res.data.statusCode == 200) {
              this.cropOption.showCrop = false;
              this.form.imgUrl = res.data.data.url;
              this.$refs.crop.$refs.cropper.stopCrop();
              this.$refs.crop.$refs.cropper.clearCrop()
            }
          });
        },
      }
    }
</script>

<style scoped>

</style>
