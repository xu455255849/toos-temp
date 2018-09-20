<template>
  <div class="component-table">
    <el-table
        :data="tbData.tableData"
        style="width: 100%"
        v-loading="tbData.loading"
    >
      <el-table-column
          type="index"
          :index="indexMethod"
          width="70"
      ></el-table-column>
      <template v-for="item in tbData.col">
        <el-table-column
            v-if="item.type == 'operation'"
            :prop="item.data"
            :label="item.label"
            :min-width="item.width"
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
              <span v-else>{{ btn.mixName(scope.row) }}</span>
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
                clearable
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
                style="position: relative"
                v-model="scope.row.categoryId"
                placeholder="请选择"
                size="mini"
                multiple
            >
              <el-option
                  v-for="item in $store.state.app.categoryList"
                  :key="item.id"
                  :label="item.name"
                  :value="String(item.id)"
              ></el-option>
              <el-button @click="item.fn(scope.row)" style="width: 100%;position: absolute;bottom: -30px;z-index: 999" size="mini" type="primary">保存</el-button>
            </el-select>
          </template>
        </el-table-column>
        <!-- end -->
        
        <el-table-column
            v-else-if="item.type == 'avatar'"
            :prop="item.data"
            :label="item.label"
        >
          <template slot-scope="scope">
            <img class="avatar" :src="scope.row.avatar" onerror="this.src = 'https://static.yunxi.tv/yunxi/business/common/images/defaultavatar.png'" />
            {{ scope.row.username }}
          </template>
        </el-table-column>
        
        <el-table-column
            v-else
            :prop="item.data"
            :label="item.label"
            :min-width="item.width"
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
      }
    }
  }
</script>

<style lang="less">
  .component-table {
    .coverImg {
      max-width: 100%;
    }
    .avatar {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 10px;
    }
    .el-button+.el-button {
      margin-left: 0;
    }
    .el-button--text {
      margin-right: 10px;
    }
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 120px;
      color: #909399;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
</style>
