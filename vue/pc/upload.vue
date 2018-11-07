<template>
  <div class="page-live-create">
    <el-upload
      ref="upload"
      action="//"
      :http-request="fileSelect"
      multiple
      :show-file-list="false"
    >
      <el-button @click="" type="primary">上传<i class="el-icon-upload el-icon&#45;&#45;right"></i></el-button>
    </el-upload>
    <p @click="upload">测试上传图片</p>
    
  </div>
</template>
<script>
  
  export default {
    data() {
      return {
        show: false,
        id: '11',
        
      }
    },
    methods: {
      async fileSelect (param) {
        if (param.file.size / 1024 / 1024 > 1) {
          this.$message.error("文件大小不能超过1M")
          return false
        }
        if (param.file.type !== 'image/jpeg' && param.file.type !== 'image/png' ) {
    
        }
        let { data } = await axios({
          method: "post",
          headers: {
            'Content-Type' : 'multipart/form-data',
          },
          url: "/business/whitelist/import",
          data: {
            activityId: this.$route.query.id,
            file: param.file
          },
          transformRequest: [function (data, headers) {
            let formData = new FormData();
            Object.keys(data).forEach(function(key){
              formData.append(key, data[key])
            });
            return formData;
          }]
        })
      },
    },
  }
</script>