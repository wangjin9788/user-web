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
          <el-form-item label="状态：">
            <el-input v-model="listQuery.status" class="input-width" placeholder="状态" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddBreed()"
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
          <template slot-scope="scope">{{ scope.row.bid }}</template>
        </el-table-column>
        <el-table-column label="投入时间" align="center">
          <template slot-scope="scope">{{ scope.row.inputTime }}</template>
        </el-table-column>
        <el-table-column label="投入重量" align="center">
          <template slot-scope="scope">{{ scope.row.inputWeight }}</template>
        </el-table-column>
        <el-table-column label="产出时间" align="center">
          <template slot-scope="scope">{{ scope.row.proTime }}</template>
        </el-table-column>
        <el-table-column label="产出重量" align="center">
          <template slot-scope="scope">{{ scope.row.proWeight }}</template>
        </el-table-column>
        <el-table-column label="养殖模式" align="center">
          <template slot-scope="scope">{{ scope.row.pattern }}</template>
        </el-table-column>
        <el-table-column label="饲料（发酵）id" align="center">
          <template slot-scope="scope">{{ scope.row.feedIds }}</template>
        </el-table-column>
        <el-table-column label="发酵状态" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{ scope.row.inputTime }}</template>
        </el-table-column>
        <el-table-column label="详细信息" width="160" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button
                size="mini"
                type="text"
                @click="handleDetail(scope.$index, scope.row)">详情
              </el-button>
              <el-button size="mini"
                         type="text"
                         @click="handleDetail(scope.$index, scope.row)">总结信息（暂时不可用）
              </el-button>
            </el-row>
          </template>
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
import {fetchList, deleteBreed, updateSummary} from '@/api/breedInfo';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5
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
    handleAddBreed() {
      this.$router.push('/breed/addBreed');
    },

    handleDelete(index, row) {
      this.$confirm('是否要删除该营收?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log();
        deleteBreed(row.fid).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
        });
      });
    },
    handleUpdate(index, row) {
      this.$router.push({path: '/breed/updateBreed', query: {id: row.fid}});
    },
    handleDetail(index, row) {
      this.$router.push({path: '/breed/detail', query: {id: row.fid}});
    },
    /** 修改状态，并将数据进行总结 **/
    handleStatusChange(index, row) {
      updateSummary(row.fid).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
        row.status = 1;
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


