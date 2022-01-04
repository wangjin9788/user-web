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
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="室内/室外：">
            <el-select v-model="listQuery.type" class="input-width" placeholder="室内/室外" clearable>
              <el-option
                v-for="item in selectTypeLists"
                :key="item.type"
                :label="item.assess"
                :value="item.type">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="室内/室外：">
            <el-select v-model="listQuery.status" class="input-width" placeholder="室内/室外" clearable>
              <el-option
                v-for="item in selectStatusLists"
                :key="item.status"
                :label="item.assess"
                :value="item.status">
              </el-option>
            </el-select>
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
      <el-button
        class="btn-add"
        @click="batchDetails()"
        size="mini">
        添加日常数据
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
        <el-table-column label="栏位编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>
        <el-table-column label="投入时间" align="center">
          <template slot-scope="scope">{{ scope.row.inputTime }}</template>
        </el-table-column>
        <el-table-column label="投入重量" align="center">
          <template slot-scope="scope">{{ scope.row.inputWeight }}</template>
        </el-table-column>
        <el-table-column label="养殖模式" align="center">
          <template slot-scope="scope">{{ scope.row.pattern }}</template>
        </el-table-column>
        <el-table-column label="养殖类型" align="center">
          <template slot-scope="scope" >
            <span v-if="scope.row.type==0">室内</span>
            <span v-if="scope.row.type==1">室外</span>
          </template>
        </el-table-column>
        <el-table-column label="养殖状态" width="100" align="center">
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
                @click="handleDetail(scope.$index, scope.row)">日常数据
              </el-button>
              <el-button size="mini"
                         type="text"
                         @click="handleOperation(scope.$index, scope.row)">日常操作
              </el-button>
            </el-row>
            <el-row>
              <el-button
                size="mini"
                type="text"
                @click="handleTreatment(scope.$index, scope.row)">治疗信息
              </el-button>
              <el-button size="mini"
                         type="text"
                         @click="handleMeasure(scope.$index, scope.row)">生长检查信息
              </el-button>
            </el-row>
            <el-row>
              <el-button
                size="mini"
                type="text"
                @click="handleEvaluate(scope.$index, scope.row)">评价信息
              </el-button>
              <el-button size="mini"
                         type="text"
                         @click="handleChart(scope.$index, scope.row)">图表信息
              </el-button>
              <el-button size="mini"
                         type="text"
                         @click="handleSummary(scope.$index, scope.row)">总结列表
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
  pageSize: 5,
  type:0,
  status:0
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
      selectTypeLists: [{type:0,assess: "室内"},{type:1,assess: "室外"}],
      selectStatusLists: [{status:0,assess: "正在养殖"},{status:1,assess: "养殖完成"}]
    }
  },
  created() {
    this.getList();
  },

  methods: {
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
    batchDetails(index, row) {
      this.$router.push({path: '/breed/batchBreedDetails', query: {type: this.listQuery.type,status:this.listQuery.status}});
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该养殖记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBreed(row.bid).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
        });
      });
    },
    handleUpdate(index, row) {
      this.$router.push({path: '/breed/updateBreed', query: {id: row.bid}});
    },
    handleDetail(index, row) {
      this.$router.push({path: '/breed/breedDetail', query: {bid: row.bid}});
    },
    handleOperation(index, row) {
      this.$router.push({path: '/breed/breedOperation', query: {bid: row.bid}});
    },
    handleTreatment(index, row) {
      this.$router.push({path: '/breed/breedTreatment', query: {bid: row.bid}});
    },
    handleMeasure(index, row) {
      this.$router.push({path: '/breed/breedMeasure', query: {bid: row.bid}});
    },
    handleEvaluate(index, row) {
      this.$router.push({path: '/breed/breedEvaluate', query: {bid: row.bid}});
    },
    handleSummary(index, row) {
      this.$router.push({path: '/breed/summary', query: {bid: row.bid}});
    },
    handleChart(index, row) {
      this.$router.push({path: '/breed/chart', query: {bid: row.bid}});
    },
    /** 修改状态，并将数据进行总结 **/
    handleStatusChange(index, row) {
      this.$router.push({path: '/breed/summary', query: {bid: row.bid}});
      updateSummary(row.bid).then(response => {
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


