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
          <el-form-item label="年：">
            <el-input v-model="listQuery.year" class="input-width" placeholder="年份" clearable></el-input>
          </el-form-item>
          <el-form-item label="月：">
            <el-input v-model="listQuery.month" class="input-width" placeholder="月份" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddFermentation()"
        size="mini">
        添加
      </el-button>
      <el-button
        class="btn-add"
        @click="batchDetails()"
        size="mini">
        批量添加详情
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="revenueTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.fid }}</template>
        </el-table-column>
        <el-table-column label="发酵堆编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>
        <el-table-column label="模型名称" align="center">
          <template slot-scope="scope">{{ scope.row.patternName }}</template>
        </el-table-column>
        <el-table-column label="图片" align="center">
          <template slot-scope="scope">
            <img style="height:80px ;z-index:8888888888888" v-image-preview :src="scope.row.img">
          </template>
        </el-table-column>

        <el-table-column v-show="isEdit" label="评价" align="center">
          <template slot-scope="scope">{{ scope.row.evaluate }}</template>
        </el-table-column>
        <el-table-column label="发酵时间" align="center">
          <template slot-scope="scope">{{ scope.row.ferTime }}</template>
        </el-table-column>
        <el-table-column label="原料重量" align="center">
          <template slot-scope="scope">{{scope.row.weight}}斤</template>
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
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column label="发酵次数" align="center">
          <template slot-scope="scope">{{ scope.row.curFermentation }}</template>
        </el-table-column>
        <el-table-column label="信息" width="160" align="center">
          <template slot-scope="scope">
            <el-row>
              <el-button
                size="mini"
                type="text"
                @click="handleDetail(scope.$index, scope.row)">详情

              </el-button>
              <el-button size="mini"
                         type="text"
                         @click="handleSummary(scope.$index, scope.row)">图表总结
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
import {fetchList, deleteFermentation, updateSummary} from '@/api/fermentation';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  year: '',
  month: ''
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
    batchDetails(index, row) {
      this.$router.push({path: '/fer/batchFerDetails'});
    },
    handleShowNextLevel(index, row) {
      this.$router.push({path: '/fer/fermentation', query: {parentId: row.id}})
    },
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
    handleAddFermentation() {
      this.$router.push('/fer/addFermentation');
    },

    handleDelete(index, row) {
      this.$confirm('是否要删除该发酵?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFermentation(row.fid).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
        });
      });
    },
    handleUpdate(index, row) {
      this.$router.push({path: '/fer/updateFermentation', query: {id: row.fid}});
    },
    handleDetail(index, row) {
      this.$router.push({path: '/fer/detail', query: {id: row.fid}});
    },
    handleSummary(index, row) {
      this.$router.push({path: '/fer/summary', query: {id: row.fid}});
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


