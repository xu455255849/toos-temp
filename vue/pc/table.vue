<template>
  <div class="component-table">
    <el-table
        :data="tbData.tableData"
        style="width: 100%"
        v-loading="tbData.loading"
        @expand-change="expandChange"
    >
      <el-table-column
          type="index"
          :index="indexMethod"
          width="60"
      ></el-table-column>
      <template v-for="item in tbData.col">
        <el-table-column
            v-if="item.type == 'operation'"
            :prop="item.data"
            :label="item.label"
            min-width="100"
        >
          <template slot-scope="scope">
            <el-button
                v-for="btn in item.btnArr"
                :key="btn.name"
                type="text"
                size="mini"
                :style="{ color: btn.color }"
                @click="btn.fn(scope.row)"
            >
              <div v-if="btn.name">{{ btn.name}}</div>
              <div v-else-if="scope.row.disable == '0'">禁播</div>
              <span v-else>解封</span>
            </el-button>
          </template>
        </el-table-column>
        
        <!-- 商户管理 -->
        <el-table-column
            v-else-if="item.type == 'tenantType'"
            :prop="item.data"
            :label="item.label"
            min-width="120"
        >
          <template slot-scope="scope">
            <el-select
                v-model="scope.row.inviteStatus"
                placeholder="请选择"
                size="mini"
                @change="item.fn(scope.row.id, scope.row.inviteStatus)"
            >
              <el-option
                  v-for="item in tenantList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
            v-else-if="item.type == 'tenantCategory'"
            :prop="item.data"
            :label="item.label"
            min-width="100"
        >
          <template slot-scope="scope">
            <el-select
                v-model="scope.row.categoryId"
                placeholder="请选择"
                size="mini"
                @change="item.fn(scope.row.id, scope.row.categoryId)"
            >
              <el-option
                  v-for="item in $store.state.app.filterList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
            v-else-if="item.type == 'tenantForbid'"
            :prop="item.data"
            :label="item.label"
            min-width="100"
        >
          <template slot-scope="scope">
            <el-button
                v-for="btn in item.btnArr"
                :key="btn.name"
                :style="{ color: btn.color }"
                type="text"
                size="mini"
                @click="btn.fn(scope.row)"
            >
              <div v-if="btn.name">{{ btn.name}}</div>
              <div v-else>
                <span v-if="scope.row.blockedAt == null">封禁</span>
                <span v-else>解封</span>
              </div>
            </el-button>
          </template>
        </el-table-column>
        <!-- end -->
        
        
        <el-table-column
            v-else-if="item.type == 'img'"
            :prop="item.data"
            :label="item.label"
        >
          <template slot-scope="scope">
            <img class="coverImg" :src="scope.row.coverUrl" onerror="this.src = 'http://static.yunxi.tv/yunxi/business/common/images/defaultcover.png'" />
          </template>
        </el-table-column>
        
        
        <!-- 活动管理 -->
        <el-table-column
            v-else-if="item.type == 'activityCover'"
            :prop="item.data"
            :label="item.label"
            min-width="250"
        >
          <template slot-scope="scope">
            <el-row :gutter="20" type="flex" justify="center" align="middle">
              <el-col :span="12">
                <img class="coverImg" :src="scope.row.coverUrl" onerror="this.src = 'https://static.yunxi.tv/yunxi/yunke/lesson-img.jpg'" />
              </el-col>
              <el-col :span="12">
                <span style="cursor: pointer">{{ scope.row.title }}</span>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
            v-else-if="item.type == 'activityPv'"
            :prop="item.data"
            :label="item.label"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.PV }} / {{ scope.row.UV }}</span>
          </template>
        </el-table-column>
        <el-table-column
            v-else-if="item.type == 'activityCategory'"
            :prop="item.data"
            :label="item.label"
            min-width="160"
        >
          <template slot-scope="scope">
            <el-select
                v-model="scope.row.categoryId"
                placeholder="请选择"
                size="mini"
                multiple
                @change="item.fn(scope.row)"
            >
              <el-option
                  v-for="item in $store.state.app.categoryList"
                  :key="item.id"
                  :label="item.name"
                  :value="String(item.id)"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
            v-else-if="item.type == 'activityOperation'"
            :prop="item.data"
            :label="item.label"
            min-width="150"
        >
          <template slot-scope="scope">
            <el-button
                v-for="btn in item.btnArr"
                :key="btn.name"
                type="text"
                size="mini"
                :style="{ color: btn.color }"
                @click="btn.fn(scope.row)"
            >
              <div v-if="btn.name">{{ btn.name}}</div>
              <div v-else-if="scope.row.disable == '0'">禁播</div>
              <span v-else>解封</span>
            </el-button>
          </template>
        </el-table-column>
        <!-- end -->
        <el-table-column
            v-else-if="item.type == 'financeExpand'"
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
                <span>云犀</span>
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
    <div style="text-align: center" v-show="!tbData.hidePageNation">
      <el-pagination
          background
          layout="prev, pager, next"
          @current-change="changePage"
          :current-page.sync="tbData.currentPage"
          :total="tbData.pageCount"
      ></el-pagination>
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
    data () {
      return {
        tenantList: [
          {
            name: '普通商家',
            id: 0
          },
          {
            name: '渠道商',
            id: 1
          }
        ]
      }
    },
    methods: {
      indexMethod(index) {
        return index + 1 + ((this.tbData.currentPage -1 ) * 10);
      },
      changePage (page) {
        this.tbData.currentPage= page;
        this.$emit('change')
      },
      expandChange () {
        console.log('1111')
      }
    }
  }
</script>

<style lang="less">
  .component-table {
    .coverImg {
      max-width: 100%;
    }
    .el-button+.el-button {
      margin-left: 0;
    }
    .el-table td div {
      margin-right: 10px;
    }
    .el-button--text {
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
  }
</style>
