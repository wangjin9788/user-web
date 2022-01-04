<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddWeather()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="menuTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.wid}}</template>
        </el-table-column>
        <el-table-column label="温度"  align="center">
          <template slot-scope="scope">{{scope.row.temperature}}</template>
        </el-table-column>
        <el-table-column label="湿度"  align="center">
          <template slot-scope="scope">{{scope.row.humidity}}</template>
        </el-table-column>
        <el-table-column label="类型"  align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type==0">室内</span>
            <span v-if="scope.row.type==1">室外</span>
            </template>
        </el-table-column>
        <el-table-column label="创建时间" width="100" align="center">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[10,15,20]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {getWeather,deleteWeather,updateWeather,createWeather} from '@/api/weather'

  export default {
    name: "weather",
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 10
        },
        parentId: 0
      }
    },
    created() {
      this.getList();
    },
    watch: {
      $route(route) {
        this.getList();
      }
    },
    methods: {
      getList() {
        this.listLoading = true;
        getWeather(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data;
          this.total = response.data.total;
        });
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleAddWeather(index, row) {
        this.$router.push('/weather/addWeather');
      },
      handleUpdate(index, row) {
        console.log(row.wid)
        this.$router.push({path:'/weather/updateWeather',query:{id:row.wid}});
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该天气', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteWeather(row.wid).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      }
    },
  }
</script>

<style scoped>

</style>
