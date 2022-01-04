<template>
  <div class="app-container">
    <div class="address-layout">
      <el-row >
        <el-col :span="10" style="padding-right: 40px">
          <div class="out-border">
            <div class="layout-title">温度统计</div>
             <div>
              <ve-line
                :data="TemperatureData"
                :legend-visible="true"
                :loading="loading"
                :data-empty="dataEmpty"
                :settings="chartTemperatureSettings"
               ></ve-line>
            </div>
          </div>
        </el-col >
        <el-col :span="10" style="padding-right: 40px">
          <div class="out-border">
            <div class="layout-title">湿度统计</div>
            <div>
              <ve-line
                :data="HumidityData"
                :legend-visible="true"
                :loading="loading"
                :data-empty="dataEmpty"
                :settings="chartHumiditySettings"
              ></ve-line>
            </div>
          </div>
        </el-col>
      </el-row>

    </div>

  </div>
</template>

<script>
  import {getFerChartTemperatureList,getFerChartHumidityList} from '@/api/ferChart';
  export default {
    name: 'chart',
    data() {

      return {
        chartTemperatureSettings: {
          labelMap: { 'heapTemperature': '堆温','temperature': '气温','heapHumidity':'湿度'}},
        chartHumiditySettings: {
          labelMap: {'heapHumidity': '堆内湿度','humidity': '空气湿度'}},
        TemperatureData:{
          columns: [],
          rows: [],
          tooltipShow: true,
          color:[],
        },
        HumidityData:{
          columns: [],
          rows: [],
          tooltipShow: true,
          color:[],
        },
        loading: false,
        dataEmpty: false,
      }

    },
    created(){
      this.selectTemperatureData();
      this.selectHumidityData();
      this.id = this.$route.query.id;
    },
    methods: {

      handleDateChange() {
        this.selectTemperatureData();
        this.selectHumidityData();
      },
      selectTemperatureData() {
        setTimeout(() => {
          /** 第一个饼状图 **/
          this.TemperatureData = {
            columns: ['date','heapTemperature','temperature','heapHumidity'],
            rows: [],
            color: []

          };
          /** 第一个饼状图 **/
          getFerChartTemperatureList(this.id).then(response => {
            for (let i = 0; i < response.data.length; i++) {
              let item = response.data[i];
              this.TemperatureData.rows.push(item);
            }
          });
        }, 1000);
      },
      selectHumidityData() {
        setTimeout(() => {
          /** 第二个饼状图 **/
          this.HumidityData = {
            columns: ['date', 'heapHumidity','humidity'],
            rows: [],
            color: []

          };
          /** 第二个饼状图 **/
          getFerChartHumidityList(this.id).then(response => {
            for (let i = 0; i < response.data.length; i++) {
              let item = response.data[i];
              this.HumidityData.rows.push(item);
            }
          });
        }, 1000);
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
    width: 120%;
  }

  .layout-title {
    color: #606266;
    padding: 25px 50px;
    background: #F2F6FC;
    font-weight: bold;
  }

  .out-border {
    border: 1px solid #DCDFE6;
  }
  .statistics-layout {
   width: 100%;
    margin-top: 40px;
    border: 1px solid #DCDFE6;
  }

</style>
