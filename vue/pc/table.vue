<template>
  <div class="component-table">
    <el-table
      v-loading="tbData.loading"
      :data="tbData.tableData"
      style="width: 100%">
      <!--<el-table-column
        type="index"
        :index="indexMethod">
      </el-table-column>-->
      <template v-for="item in tbData.col">
        <el-table-column
          v-if="item.type == 'operation'"
          :prop="item.data"
          :label="item.label"
        >
          <template slot-scope="scope">
            <el-button
              v-for="btn in item.btnArr"
              :key="btn.name"
              type="text"
              size="mini"
              :class="{ del: btn.del }"
              @click="btn.fn(scope.row)"
            >{{ btn.name}}</el-button>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="item.type == 'img'"
          :prop="item.data"
          :label="item.label"
        >
          <template slot-scope="scope">
            <img :style="item.style" :src="scope.row.coverUrl"  />
          </template>
        </el-table-column>



        <el-table-column
          v-else-if="item.type == 'user'"
          :prop="item.data"
          :label="item.label"
        >
          <template slot-scope="scope">
            <el-row :gutter="20" type="flex" justify="center" align="middle">
              <el-col :span="8">
                <img class="avatar" :src="scope.row.avatar" />
              </el-col>
              <el-col :span="16">
                <span>{{ scope.row.username }}</span>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="item.type == 'lesson'"
          :prop="item.data"
          :label="item.label"
          min-width="250px"
        >
          <template slot-scope="scope">
            <el-row :gutter="20" type="flex" justify="center" align="middle">
              <el-col :span="10">
                <img class="coverImg" :src="scope.row.coverUrl" @click="showDetail(scope.row)" onerror="this.src = 'https://static.yunxi.tv/yunxi/yunke/lesson-img.jpg'" />
              </el-col>
              <el-col :span="14">
                <span style="cursor: pointer" @click="showDetail(scope.row)">{{ scope.row.title | maxTitle }}</span>
                <span class="jx" v-if="scope.row.isSelection == '1'">精选</span>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="item.type == 'orderTitle'"
          :prop="item.data"
          :label="item.label"
          min-width="250px"
        >
          <template slot-scope="scope">
            <el-row :gutter="20" type="flex" justify="center" align="middle">
              <el-col :span="10">
                <img class="coverImg" :src="scope.row.coverUrl" onerror="this.src = 'https://static.yunxi.tv/yunxi/yunke/lesson-img.jpg'" />
              </el-col>
              <el-col :span="14">
                <span style="cursor: pointer">{{ scope.row.title | maxTitle }}</span>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="item.type == 'comment'"
          :prop="item.data"
          :label="item.label"
        >
          <template slot-scope="scope">
            <el-button
              v-for="(btn, index) in item.btnArr"
              :key="btn.name"
              type="text"
              size="mini"
              :class="{ del: btn.del }"
              @click="btn.fn(scope.row)"
            >
              <template v-if="index == 0">
                <span v-if="scope.row.isForbid == 0">加入黑名单</span>
                <span v-else>取消黑名单</span>
              </template>
              <template v-else>
                <span v-if="scope.row.status == '0'">删除</span>
              </template>
            </el-button>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="item.type == 'live'"
          :prop="item.data"
          :label="item.label"
          min-width="150px"
        >
          <template slot-scope="scope">
            <el-button
              v-for="(btn, index) in item.btnArr"
              :key="btn.name"
              type="text"
              size="mini"
              :class="{ del: btn.del }"
              @click="btn.fn(scope.row)"
            >
              <template v-if="index == 0">
                <span v-if="scope.row.isSelection == '0'">设为精选</span>
                <span v-else>取消精选</span>
              </template>
              <template v-if="index == 4">
                <span v-if="scope.row.isShow == '0'">显示</span>
                <span v-else>隐藏</span>
              </template>
              <template v-else>
                <span>{{ btn.name}}</span>
              </template>
            </el-button>
          </template>
        </el-table-column>


        <el-table-column
          v-else-if="item.type == 'expand'"
          :label="item.label"
          type="expand"
        >
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="收款方">
                <span>云犀云课</span>
              </el-form-item>
              <el-form-item label="付款方式">
                <span>微信支付</span>
              </el-form-item>
              <el-form-item label="交易单号">
                <span>{{ props.row.outTradeNo }}</span>
              </el-form-item>
              <el-form-item label="商户号">
                <span>{{ props.row.mchId }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="item.type == 'expandFound'"
          :label="item.label"
          type="expand"
        >
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="收款方">
                <span>云犀云课</span>
              </el-form-item>
              <el-form-item label="付款方式">
                <span>微信支付</span>
              </el-form-item>
              <el-form-item label="交易单号">
                <span>{{ props.row.tradeNo }}</span>
              </el-form-item>
              <el-form-item label="商户号">
                <span>{{ props.row.mchId }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column
          v-else
          :prop="item.data"
          :label="item.label"
        ></el-table-column>
      </template>
    </el-table>
    <br />
    <div style="text-align: center">
      <el-pagination
        v-show="tbData.showPageNation !== false"
        layout="prev, pager, next"
        @current-change="changePage"
        :current-page.sync="tbData.currentPage"
        :total="tbData.pageCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'component-table',
    props: {
      tbData: {
        type: Object
      }
    },
    data() {
      return {
      name: 'name'
      }
    },
    filters: {
      maxTitle: function (value) {
        let val = new String(value);
        return val.length > 20 ? val.slice(0, 20).trim() + "..." : val.trim();
      }
    },
    methods: {
      showDetail (row) {
        this.$emit('show', row)
      },
      indexMethod(index) {
        return index + 1 + ((this.tbData.currentPage -1 ) * 10);
      },
      changePage (page) {
        this.tbData.currentPage= page;
        this.$emit('change')
      },

    },
    components: {},
    mounted: function () {
    },
  }
</script>

<style lang="less">
  .component-table {
    .el-button--text {
      margin-left: 0;
      margin-right: 10px;
    }
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #909399;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
    .avatar {
      border-radius: 4px;
      height: 40px;
      width: 40px;
    }
    .coverImg {
      width: 96px;
      height: 54px;
      cursor: pointer;
    }
    .del {
      color: #F56C6C;
    }
    .jx {
      background: red;
      color: #fff;
      padding: 5px 10px;
      font-size: 12px;
      opacity: 0.6;
    }
  }
</style>
