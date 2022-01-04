<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="addWeather()"
        size="mini">
        添加天气
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
        <el-table-column label="堆编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>
        <el-table-column label="空气温度/湿度：" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.wid" placeholder="请选择气温">
              <el-option
                v-for="item in weatherLists"
                :key="item.wid"
                :label="item.info"
                :value="item.wid">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="发酵堆温度：" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.heapTemperature"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="发酵堆湿度：" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.heapHumidity"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="ph值：" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.ph"></el-input>
          </template>
        </el-table-column>

      </el-table>
      <span slot="footer" class="dialog-footer" style="text-align: center;display:block;">
        <el-button type="primary" @click="saveTableData">保 存</el-button>
      </span>
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
  </div>
</template>

<script>
import {
  fetchList
} from '@/api/fermentation';
import {batchFerDetail} from '@/api/fermentationDetail';
import {weatherList} from '@/api/weather';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 50,
  type:0,
  status:0
};
const batchList = {
  bid: 0,
  number: 0,
  temperature: 0,
  humidity: 0,
  heapTemperature: 0,
  heapHumidity: 0,
  ph: 7,
  wid: 0,

};
export default {
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: batchList,
      total: null,
      weatherLists: weatherList().then(response => {
        this.weatherLists = response.data;
      }),
    }
  },
  created() {
    this.listQuery.type=this.$route.query.type;
    this.listQuery.status=this.$route.query.status;
    this.getList();

  },
  methods: {

    saveTableData() {
      batchFerDetail(this.list).then(response => {
        this.$message({
          message: '添加成功',
          type: 'success',
          duration: 1000
        });
        this.$router.back();
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
    //添加天气
    addWeather(){
      this.$router.push('/weather/addWeather');
    },
    getList() {
      fetchList(this.listQuery).then(response => {
        this.list = response.data;
        this.total = response.data.total;
      });

    },
  }
}

</script>

<style scoped>

</style>
