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
              @click="handleAddPatter()"
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
          <template slot-scope="scope">{{scope.row.pid}}</template>
        </el-table-column>

        <el-table-column label="土样" align="center">
          <template slot-scope="scope">{{scope.row.soil}}</template>
        </el-table-column>
        <el-table-column label="模式" align="center">
          <template slot-scope="scope">{{scope.row.evaluate}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
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
  import {fetchList,deletePattern} from '@/api/breedPattern';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    selectDay:''
  };
  export default {

    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        isEdit: false,

      }
    },
    created() {
      this.getList();
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
       handleAddPatter() {
              this.$router.push('/breed/addBreedPatter');
       },

      handleDelete(index, row) {
        this.$confirm('是否要删除该模式?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           console.log();
          deletePattern(row.pid).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        });
      },
      handleUpdate(index, row) {
          this.$router.push({path:'/breed/updateBreedPatter',query:{id:row.pid}});
      },
      getList() {
        this.listLoading = true;

        this.handleResetSearch();
        fetchList().then(response => {
          this.listLoading = false;
          this.list = response.data;
          this.total = response.data.total;
        });

      }
    }
  }
</script>
<style></style>


