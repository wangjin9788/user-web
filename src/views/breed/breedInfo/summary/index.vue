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

          <div style="padding: 8px;border-left:1px solid #DCDFE6">
            <div>
              <ve-line
                :data="chartData"
                :legend-visible="true"
                :loading="loading"
                :data-empty="dataEmpty"
                :settings="chartSettings"></ve-line>
            </div>
          </div>

      </el-row>
    </div>
  </div>
</template>

<script>
import {str2Date} from '@/utils/date';
import {getBreedSummaryInfo,getBreedGrowthAnalysis} from '@/api/breedSummary';

export default {
  name: 'summary',
  data() {
    return {
      chartSettings: {
        xAxisType: 'time',
        area: true,

        labelMap: {'count': '条数/斤'}
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
    this.id = this.$route.query.bid;
    this.getData(this.id);
    this.getList(this.id);
  },
  methods: {
    handleDateChange() {
      this.getData();
    },
    getData(id) {
      setTimeout(() => {
        this.chartData = {
          columns: ['date', 'count'],
          rows: []
        };
        getBreedGrowthAnalysis(id).then(response => {
            for (let i = 0; i < response.data.length; i++) {
              let item=response.data[i];
                this.chartData.rows.push(item);
            }
        });
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


.statistics-layout {
  margin-top: 20px;
  border: 1px solid #DCDFE6;
}

</style>
