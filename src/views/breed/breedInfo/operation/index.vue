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
          <el-form-item label="操作类型：">
            <el-select v-model="listQuery.type" class="input-width"  clearable>
              <el-option
                v-for="item in selectTypeLists"
                :key="item.abnormal"
                :label="item.assess"
                :value="item.abnormal">
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
        @click="handleAdd()"
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
          <template slot-scope="scope">{{ scope.row.boId }}</template>
        </el-table-column>
        <el-table-column label="养殖箱编号" align="center">
          <template slot-scope="scope">{{ scope.row.bid }}</template>
        </el-table-column>
        <el-table-column label="操作类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type==0">淋水</span>
            <span v-if="scope.row.type==1">饲喂</span>
            <span v-if="scope.row.type==2">淋水/饲喂</span>
            </template>
        </el-table-column>
        <el-table-column label="饲料编号" align="center">
          <template slot-scope="scope">{{ scope.row.ferNumber }}</template>
        </el-table-column>
        <el-table-column label="投喂重量" align="center">
          <template slot-scope="scope">{{ scope.row.feeding }}</template>
        </el-table-column>
        <el-table-column label="浇灌量ml" align="center">
          <template slot-scope="scope">{{ scope.row.water }}</template>
        </el-table-column>
        <el-table-column label="浇灌后湿度" align="center">
          <template slot-scope="scope">{{ scope.row.waterHumidity }}%</template>
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
import {fetchList, deleteBreedOperation} from '@/api/breedOperation';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  type:0
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
      selectTypeLists:[{abnormal:0,assess:'淋水'},{abnormal:1,assess:'饲喂'},{abnormal:2,assess:'淋水/饲喂'},{abnormal:-1,assess:'所有类型'}]
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
      this.$router.push({path: '/breed/addBreedOperation', query: {bid: this.id}});
    },

    handleDelete(index, row) {
      this.$confirm('是否要删除该详情?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBreedOperation(row.boId).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList(this.id);
        });
      });
    },
    handleUpdate(index, row) {
      this.$router.push({path: '/breed/updateBreedOperation', query: {id: row.boId,bid: this.id}});
    },
    /** 修改状态，并将数据进行总结 **/
    handleHiddenChange(index, row) {
      updateHidden(row.id, {hidden: row.hidden}).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
      });
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


