<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入搜索：">
           <el-date-picker v-model="listQuery.selectDay" type="date" placeholder="选择日" @change="handleResetSearch" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
              class="btn-add"
              @click="handleAddMenu()"
              size="mini">
              添加
            </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="revenueTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.tid}}</template>
        </el-table-column>
        <el-table-column label="关联id" align="center">
          <template slot-scope="scope">{{scope.row.contactId}}</template>
        </el-table-column>
        <el-table-column label="关联编号" align="center">
          <template slot-scope="scope">{{scope.row.number}}</template>
        </el-table-column>
        <el-table-column label="任务内容" align="center">
          <template slot-scope="scope">{{scope.row.taskContent}}</template>
        </el-table-column>
        <el-table-column label="任务时间" align="center">
          <template slot-scope="scope">{{scope.row.taskTime}}</template>
        </el-table-column>
        <el-table-column label="类型" align="center">
          <template slot-scope="scope">
            <span v-if=" scope.row.type==0">其他</span>
            <span v-if=" scope.row.type==1">翻堆</span>
            <span v-if=" scope.row.type==2">浇水</span>
            <span v-if=" scope.row.type==3">饲喂</span>
            <span v-if=" scope.row.type==4">促卵素</span>
            <span v-if=" scope.row.type==5">收取蚓茧</span>
            <span v-if=" scope.row.type==6">翻堆</span>
           </template>
        </el-table-column>
        <el-table-column label="任务状态" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="时间"  width="100" align="center">
          <template slot-scope="scope">{{scope.row.createTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-row>
             <el-button
                 size="mini"
                 type="text"
                 @click="handleUpdate(scope.$index, scope.row)">编辑
             </el-button>
             <el-button size="mini"
                 type="text"
                 @click="handleDelete(scope.$index, scope.row)">删除
             </el-button>
            </el-row>
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
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {fetchList,deleteTask,updateTaskStatus} from '@/api/task';
  import {formatDate} from '@/utils/date';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    selectDay:''
  };
  const defaultTask = {
    id: null,
    name: null,
    description: null,
    adminCount: 0,
    status: 1
  };
  export default {

    name: 'TaskList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        Task: Object.assign({}, defaultTask),
        isEdit: false,

      }
    },
    created() {
      this.getList();
    },

    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    methods: {

      handleResetSearch() {

      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
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
       handleAddMenu() {
              this.$router.push('/task/addTask');
       },

      handleDelete(index, row) {
        this.$confirm('是否要删除该任务?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           console.log();
          deleteTask(row.tid).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },
      handleUpdate(index, row) {
          this.$router.push({path:'/task/updateTask',query:{id:row.tid}});
      },
      /** 修改状态，并将数据进行总结 **/
      handleStatusChange(index, row) {
        updateTaskStatus(row.tid).then(response => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
          row.status = 1;
          this.getList();
        });
      },
      getList() {
        this.listLoading = true;
        this.handleResetSearch();
        fetchList(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data;
          this.total = response.data.total;
        });

      }
    }
  }
</script>
<style></style>


