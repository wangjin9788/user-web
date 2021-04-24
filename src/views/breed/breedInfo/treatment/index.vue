<template xmlns="http://www.w3.org/1999/html"> 
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
        @click="handleAdd()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="treatment"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.btId }}</template>
        </el-table-column>
        <el-table-column label="养殖信息编号" align="center">
          <template slot-scope="scope">{{ scope.row.bid }}</template>
        </el-table-column>
        <el-table-column label="病理名称" align="center">
          <template slot-scope="scope">{{ scope.row.illnessName }}</template>
        </el-table-column>
        <el-table-column label="病理图片" align="center">
          <template slot-scope="scope">
            <img style="height:80px" v-image-preview :src="scope.row.img">
          </template>
        </el-table-column>
        <el-table-column label="采用药物" align="center">
          <template slot-scope="scope">{{ scope.row.medicine }}</template>
        </el-table-column>
        <el-table-column label="治疗类型" align="center">
          <template slot-scope="scope">{{ scope.row.type }}</template>
        </el-table-column>
        <el-table-column label="病理说明" align="center">
          <template slot-scope="scope">{{ scope.row.illnessExplain }}</template>
        </el-table-column>
        <el-table-column label="治疗效果" align="center">
          <template slot-scope="scope">{{ scope.row.assess }}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
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
import {fetchList, deleteBreedTreatment} from '@/api/breedTreatment';

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
    this.id = this.$route.query.bid;
    this.getList(this.id);
  },

  methods: {
    handleResetSearch() {

    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList(this.id);
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;

      this.getList(this.id);
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList(this.id);
    },
    handleAdd() {
      this.$router.push({path: '/breed/addBreedTreatment', query: {bid: this.id}});
    },

    handleDelete(index, row) {
      this.$confirm('是否要删除该详情?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBreedTreatment(row.btId).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList(this.id);
        });
      });
    },
    handleUpdate(index, row) {
      console.log(row.btId);
      this.$router.push({path: '/breed/updateBreedTreatment', query: {id: row.btId,bid: this.id}});
    },
    getList(id) {

      this.listLoading = true;
      this.handleResetSearch();
      fetchList(id, this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data;
        this.total = response.data.total;
      });

    }
  }
}
</script>
<style></style>


