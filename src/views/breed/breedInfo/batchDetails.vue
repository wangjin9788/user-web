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
          <template slot-scope="scope">{{ scope.row.bid }}</template>
        </el-table-column>
        <el-table-column label="栏位编号" width="100" align="center">
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
        <el-table-column label="养殖箱土壤温度：" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.soilTemperature"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="养殖箱土壤湿度：" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.soilHumidity"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="ph值：" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.ph" placeholder="请选择ph">
              <el-option
                v-for="item in stateList"
                :key="item.abnormal"
                :label="item.assess"
                :value="item.abnormal">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="异常状态：" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.abnormal" placeholder="请选择状态">
              <el-option
                v-for="item in exceList"
                :key="item.abnormal"
                :label="item.assess"
                :value="item.abnormal">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="异常说明：" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.description"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="检查图片：" align="center">
          <template slot-scope="scope">
            <single-upload v-model="scope.row.imgUrl"></single-upload>
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
import {fetchList, deleteBreed, updateSummary} from '@/api/breedInfo';
import {batchBreedDetail} from '@/api/breedDetail';
import {weatherList} from '@/api/weather';
import SingleUpload from '@/components/Upload/singleUpload';
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
  soilTemperature: 0,
  soilHumidity: 0,
  ph: 1,
  wid: 0,

};
export default {
  components: {SingleUpload},
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: batchList,
      total: null,
      weatherLists: weatherList().then(response => {
        this.weatherLists = response.data;
      }),
      stateList: [{abnormal: 1, assess: 1}, {abnormal: 2, assess: 2}, {abnormal: 3, assess: 3}, {
        abnormal: 3,
        assess: 3
      }, {abnormal: 4, assess: 4}, {abnormal: 5, assess: 5}, {abnormal: 6, assess: 6}, {
        abnormal: 7,
        assess: 7
      }, {abnormal: 8, assess: 8}, {abnormal: 9, assess: 9}, {abnormal: 10, assess: 10}],
      exceList:[{abnormal:0,assess:'正常'},{abnormal:1,assess:'异常'}]
    }
  },
  created() {
    this.listQuery.type=this.$route.query.type;
    this.listQuery.status=this.$route.query.status;
    this.getList();

  },
  methods: {

    saveTableData() {
      batchBreedDetail(this.list).then(response => {
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
    getWeatherList(){

    }
  }
}

</script>

<style scoped>

</style>
