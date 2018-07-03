<template>
    <div class="page-operation">
      <el-input
        class="search"
        :placeholder="options.place"
        v-model="options.searchPara"
        @keyup.enter.native="search">
        <el-button slot="append" style="background: #fff" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <div class="right">
        <el-button v-for="item in options.btnArr" :type="item.type" :key="item.name" @click="item.fn">{{ item.name }}</el-button>
      </div>
    </div>
</template>

<script>
    
    export default {
        name: 'page-operation',
        props: {
          options: {
            type: Object
          }
        },
        data() {
            return {}
        },
        methods: {
          search () {
            this.$emit('search')
          }
        },
        components: {},
        mounted: function () {
          //console.log(this.options)
        },
    }
</script>

<style lang="less">
    .page-operation {
      .search {
        width: 320px;
      }
      .right {
        float: right;
      }
    }
</style>
