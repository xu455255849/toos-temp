<template>
  <div class="component-table">
    <el-table
      :data="tbData.tableData"
      v-loading="tbData.loading"
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
          :min-width="item.width"
        >
          <template slot-scope="scope">
            <el-button
              v-for="btn in item.btnArr"
              :key="btn.name"
              v-if="btn.show"
              type="text"
              size="mini"
              :style="{ color: btn.color }"
              @click="btn.fn(scope.row)"
            >
              <span v-if="btn.name">{{ btn.name}}</span>
              <span v-else>{{ btn.mixName(scope.row) }}</span>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          :label="item.label"
          :min-width="item.width"
          :prop="item.data"
          v-else-if="item.type == 'order'"
        >
          <template slot-scope="scope">
            <el-button
              :key="btn.name"
              :style="{ color: btn.color }"
              @click="btn.fn(scope.row)"
              size="mini"
              type="text"
              v-for="btn in item.btnArr"
              v-if="btn.isShow(scope.row)"
            >
              <span v-if="btn.name">{{ btn.name}}</span>
              <span v-else>{{ btn.mixName(scope.row) }}</span>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.type == 'img'"
          :prop="item.data"
          :label="item.label"
        >
          <template slot-scope="scope">
            <img class="coverImg" :src="scope.row.coverUrl" onerror="this.src = 'http://static.yunxi.tv/yunxi/business/common/images/defaultcover.png'" />
          </template>
        </el-table-column>
        
        <el-table-column
          v-else-if="item.type == 'account'"
          :prop="item.data"
          :label="item.label"
        >
          <template slot-scope="scope">
            <el-button
              v-for="btn in item.btnArr"
              :key="btn.name"
              type="text"
              size="mini"
              @click="btn.fn(scope.row)"
              v-show="scope.row.username !== 'admin' || btn.name == '重置密码'"
            >{{ btn.name }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.type == 'contact'"
          :prop="item.data"
          :label="item.label"
        >
          <template slot-scope="scope">
            <p>{{ scope.row.username }}</p>
            <p>{{ scope.row.number }}</p>
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
        background
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
    methods: {
      indexMethod(index) {
        return index + 1 + ((this.tbData.currentPage -1 ) * 10);
      },
      changePage (page) {
        this.tbData.currentPage= page;
        this.$emit('change')
      },
      
    }
  }
</script>

<style lang="less">
  .component-table {
    .coverImg {
      width: 32px;
      height: 32px;
    }
    .el-table th>.cell {
      text-align: center;
    }
    .el-table .cell {
      text-align: center;
    }
  }
</style>
