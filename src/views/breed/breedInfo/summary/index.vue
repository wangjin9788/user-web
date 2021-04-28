<template>
  <div class="app-container">
    <div class="un-handle-layout">
      <div class="layout-title">基础数据</div>
      <div class="un-handle-content">
        <el-row :gutter="20">
          <div class="un-handle-item">
            <span class="font-medium">养殖编号: {{ this.list.number }}</span>
          </div>
        </el-row>
        <el-row :gutter="20">
          <div class="un-handle-item">
            <span class="font-medium">养殖模式: {{ this.list.evaluate }}</span>
          </div>
        </el-row>
        <el-row :gutter="20">
          <div class="un-handle-item">
            <span class="font-medium">养殖土样: {{ this.list.soil }}</span>
          </div>
        </el-row>
        <el-row :gutter="20">
          <div class="un-handle-item">
            <span class="font-medium">投入时间: {{ this.list.inputTime }}</span>
          </div>
        </el-row>
        <el-row :gutter="20">
          <div class="un-handle-item">
            <span class="font-medium">投入重量: {{ this.list.inputWeight }}</span>
          </div>
        </el-row>
        <el-row :gutter="20">
          <div class="un-handle-item">
            <span class="font-medium">产出重量: {{ this.list.produceWeight }}</span>
          </div>
        </el-row>
        <el-row :gutter="20">
          <div class="un-handle-item">
            <span class="font-medium">饲料id: {{ this.list.feedIds }}</span>
          </div>
        </el-row>
        <el-row :gutter="20">
          <div class="un-handle-item">
            <span class="font-medium">养殖周期: {{ this.list.cycle }}</span>
          </div>
        </el-row>
      </div>
    </div>
    <div class="un-handle-layout">
      <div class="layout-title">天气情况</div>
      <div class="un-handle-content">
        <el-row :gutter="20">
          <div class="un-handle-item">
            <span class="font-medium">天气平均温度: {{ this.list.meanTemperature }}</span>
          </div>
        </el-row>
        <el-row :gutter="20">
          <div class="un-handle-item">
            <span class="font-medium">土壤平均温度: {{ this.list.meanSoilTemperature }}</span>
          </div>
        </el-row>
        <el-row :gutter="20">
          <div class="un-handle-item">
            <span class="font-medium">空气平均湿度: {{ this.list.meanHumidity }}</span>
          </div>
        </el-row>
        <el-row :gutter="20">
          <div class="un-handle-item">
            <span class="font-medium">土壤平均湿度: {{ this.list.meanSoilHumidity }}</span>
          </div>
        </el-row>
      </div>
    </div>
    <div v-show="this.list.abnormal=='有异常'" class="un-handle-layout">
      <div class="layout-title">异常情况</div>
      <div class="un-handle-content">
        <el-row :gutter="20">
          <div class="un-handle-item">
            <span class="font-medium">是否有异常: {{ this.list.abnormal }}</span>
          </div>
        </el-row>
        <el-row :gutter="20" v-for="item in this.list.description" :key="index">
          <div class="un-handle-item">
            <span class="font-medium">异常说明: {{ item }}</span>
          </div>
        </el-row>
      </div>
    </div>
    <div class="un-handle-layout">
      <div class="layout-title">评价信息</div>
      <div class="un-handle-content">
        <el-row :gutter="20">
          <div class="un-handle-item">
            <span class="font-medium">产出评价: {{ this.list.produceEvaluate }}</span>
          </div>
        </el-row>
        <el-row :gutter="20">
          <div class="un-handle-item">
            <span class="font-medium">孵化评价: {{ this.list.hatchEvaluate }}</span>
          </div>
        </el-row>
        <el-row :gutter="20">
          <div class="un-handle-item">
            <span class="font-medium">出售价格: {{ this.list.price }}</span>
          </div>
        </el-row>
        <el-row :gutter="20">
          <div class="un-handle-item">
            <span class="font-medium">土壤平均湿度: {{ this.list.meanSoilHumidity }}</span>
          </div>
        </el-row>
      </div>
    </div>
    <div class="un-handle-layout">
      <div class="layout-title">药物使用</div>
      <div class="un-handle-content">
        <el-row :gutter="20">
          <div class="un-handle-item">
            <span class="font-medium">病理名称: {{ this.list.medicine }}</span>
          </div>
        </el-row>
        <el-row :gutter="20">
          <div class="un-handle-item">
            <span class="font-medium">病理说明(出现原因): {{ this.list.illnessName }}</span>
          </div>
        </el-row>
        <el-row :gutter="20">
          <div class="un-handle-item">
            <span class="font-medium">采用药物: {{ this.list.illnessExplain }}</span>
          </div>
        </el-row>
      </div>
    </div>
    <div class="statistics-layout">
      <div class="layout-title">生长统计</div>
      <el-row>
        <el-col :span="4">
          <div style="padding: 20px">
            <div>
              <div style="color: #909399;font-size: 14px">本月订单总数</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">10000</div>
              <div>
                <span class="color-success" style="font-size: 14px">+10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周订单总数</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">1000</div>
              <div>
                <span class="color-danger" style="font-size: 14px">-10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本月销售总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">100000</div>
              <div>
                <span class="color-success" style="font-size: 14px">+10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周销售总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">50000</div>
              <div>
                <span class="color-danger" style="font-size: 14px">-10%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div style="padding: 10px;border-left:1px solid #DCDFE6">
            <el-date-picker
              style="float: right;z-index: 1"
              size="small"
              v-model="orderCountDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="handleDateChange"
              :picker-options="pickerOptions">
            </el-date-picker>
            <div>
              <ve-line
                :data="chartData"
                :legend-visible="false"
                :loading="loading"
                :data-empty="dataEmpty"
                :settings="chartSettings"></ve-line>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import {str2Date} from '@/utils/date';
import {getBreedSummaryInfo} from '@/api/breedSummary';

const DATA_FROM_BACKEND = {
  columns: ['date', 'orderCount', 'orderAmount'],
  rows: [
    {date: '2018-11-01', orderCount: 10, orderAmount: 1093},
    {date: '2018-11-02', orderCount: 20, orderAmount: 2230},
    {date: '2018-11-03', orderCount: 33, orderAmount: 3623},
    {date: '2018-11-04', orderCount: 50, orderAmount: 6423},
    {date: '2018-11-05', orderCount: 80, orderAmount: 8492},
    {date: '2018-11-06', orderCount: 60, orderAmount: 6293},
    {date: '2018-11-07', orderCount: 20, orderAmount: 2293},
    {date: '2018-11-08', orderCount: 60, orderAmount: 6293},
    {date: '2018-11-09', orderCount: 50, orderAmount: 5293},
    {date: '2018-11-10', orderCount: 30, orderAmount: 3293},
    {date: '2018-11-11', orderCount: 20, orderAmount: 2293},
    {date: '2018-11-12', orderCount: 80, orderAmount: 8293},
    {date: '2018-11-13', orderCount: 100, orderAmount: 10293},
    {date: '2018-11-14', orderCount: 10, orderAmount: 1293},
    {date: '2018-11-15', orderCount: 40, orderAmount: 4293}
  ]
};
export default {
  name: 'home',
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            let start = new Date();
            start.setFullYear(2018);
            start.setMonth(10);
            start.setDate(1);
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一月',
          onClick(picker) {
            const end = new Date();
            let start = new Date();
            start.setFullYear(2018);
            start.setMonth(10);
            start.setDate(1);
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      orderCountDate: '',
      chartSettings: {
        xAxisType: 'time',
        area: true,
        axisSite: {right: ['orderAmount']},
        labelMap: {'orderCount': '订单数量', 'orderAmount': '订单金额'}
      },
      chartData: {
        columns: [],
        rows: []
      },
      loading: false,
      dataEmpty: false,
      list: null,
      number: 0

    }
  },
  created() {
    this.initOrderCountDate();
    this.getData();
    this.id = this.$route.query.bid;
    this.getList(this.id);
  },
  methods: {
    handleDateChange() {
      this.getData();
    },
    initOrderCountDate() {
      let start = new Date();
      start.setFullYear(2018);
      start.setMonth(10);
      start.setDate(1);
      const end = new Date();
      end.setTime(start.getTime() + 1000 * 60 * 60 * 24 * 7);
      this.orderCountDate = [start, end];
    },
    getData() {
      setTimeout(() => {
        this.chartData = {
          columns: ['date', 'orderCount', 'orderAmount'],
          rows: []
        };
        for (let i = 0; i < DATA_FROM_BACKEND.rows.length; i++) {
          let item = DATA_FROM_BACKEND.rows[i];
          let currDate = str2Date(item.date);
          let start = this.orderCountDate[0];
          let end = this.orderCountDate[1];
          if (currDate.getTime() >= start.getTime() && currDate.getTime() <= end.getTime()) {
            this.chartData.rows.push(item);
          }
        }
        this.dataEmpty = false;
        this.loading = false
      }, 1000)
    },
    getList(id) {
      this.listLoading = true;
      getBreedSummaryInfo(id).then(response => {
        this.listLoading = false;
        this.list = response.data;
        this.total = response.data.total;
      });

    }
  }
}
</script>

<style scoped>
.app-container {
  margin-top: 40px;
  margin-left: 120px;
  margin-right: 120px;
}

.address-layout {
}

.total-layout {
  margin-top: 20px;
}

.total-frame {
  border: 1px solid #DCDFE6;
  padding: 20px;
  height: 100px;
}

.total-icon {
  color: #409EFF;
  width: 60px;
  height: 60px;
}

.total-title {
  position: relative;
  font-size: 16px;
  color: #909399;
  left: 70px;
  top: -50px;
}

.total-value {
  position: relative;
  font-size: 18px;
  color: #606266;
  left: 70px;
  top: -40px;
}

.un-handle-layout {
  margin-top: 20px;
  border: 1px solid #DCDFE6;
}

.layout-title {
  color: #606266;
  padding: 15px 20px;
  background: #F2F6FC;
  font-weight: bold;
}

.un-handle-content {
  padding: 20px 40px;
}

.un-handle-item {
  border-bottom: 1px solid #EBEEF5;
  padding: 10px;
}

.overview-layout {
  margin-top: 20px;
}

.overview-item-value {
  font-size: 24px;
  text-align: center;
}

.overview-item-title {
  margin-top: 10px;
  text-align: center;
}

.out-border {
  border: 1px solid #DCDFE6;
}

.statistics-layout {
  margin-top: 20px;
  border: 1px solid #DCDFE6;
}

.mine-layout {
  position: absolute;
  right: 140px;
  top: 107px;
  width: 250px;
  height: 235px;
}

.address-content {
  padding: 20px;
  font-size: 18px
}
</style>
