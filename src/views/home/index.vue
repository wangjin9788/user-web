<template>
  <div class="app-container">
    <div class="address-layout">
      <el-row >
        <el-col :span="10" style="padding-right: 40px">
          <div class="out-border">
            <div class="layout-title">后台项目</div>
            <div>
               <el-select v-model="yearPic"
                      placeholder="请选择类型"   @change="handleDateChange">
               <el-option
                  v-for="item in selectPayLists"
                  :key="item"
                  :label="item"
                  :value="item"
                  >
                </el-option>
              </el-select>
             </div>
             <div>
              <ve-pie
                :data="payChartData"
                :legend-visible="true"
                :loading="loading"
                :data-empty="dataEmpty"
                :colors="['#40DBBC', '#3A9DFF']"
                :yearPic="yearPic"
               ></ve-pie>
            </div>
          </div>
        </el-col >
          <el-col :span="10" style="padding-right: 40px">
              <div class="out-border">
                <div class="layout-title">后台项目</div>
                 <div>
                  <ve-pie
                    :data="payCategoryChartData"
                    :legend-visible="true"
                    :loading="loading"
                    :data-empty="dataEmpty"
                    :yearPayTime="yearPayTime"
                     :colors="['#40DBBC', '#3A9DFF']"
                    ></ve-pie>
                </div>
              </div>
            </el-col>
      </el-row>

    </div>

    <div class="statistics-layout">
      <div class="layout-title">订单统计</div>
      <el-row>
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
              @change="handleDateChange">
            </el-date-picker>
            <div>
              <ve-histogram
                :data="chartData"
                :legend-visible="true"
                :loading="loading"
                :data-empty="dataEmpty"
                :settings="chartSettings"></ve-histogram>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {str2Date} from '@/utils/date';
  import img_home_order from '@/assets/images/home_order.png';
  import img_home_today_amount from '@/assets/images/home_today_amount.png';
  import img_home_yesterday_amount from '@/assets/images/home_yesterday_amount.png';
  import {getPayAndRevenue,getYearPicRate,getPayCategoryRate,getYearData,getMonthData} from '@/api/home';

  export default {
    name: 'home',
    data() {
      return {
        orderCountDate: '',
        chartSettings: {
          xAxisType: 'time',
          area:true,
          labelMap: {'pay': '支付', 'revenue': '营收'}},
          chartData: {
          columns: [],
          rows: [],
          tooltipShow: true
        },
        loading: false,
        dataEmpty: false,
        selectPayLists: getYearData().then(response => {
              this.selectPayLists = response.data;})
      }
    },
    created(){
      this.initOrderCountDate();
      this.getData();
      this.selectData();
    },
    methods:{
      handleDateChange(){
        this.getData();
        this.selectData();
      },
      initOrderCountDate(){
        let start = new Date();
        start.setFullYear(2021);
        start.setMonth(3);
        start.setDate(1);
        const end = new Date();
        end.setTime(start.getTime() + 1000 * 60 * 60 * 24 * 30);
        this.orderCountDate=[start,end];
        this.yearPayTime=2021;
        this.yearPic=2021;

      },
      getData(){

        setTimeout(() => {
          this.chartData = {
            columns: ['date', 'pay','revenue'],
            rows: []
          };
         getPayAndRevenue().then(response => {
            for(let i=0;i<response.data.length;i++){
              let item=response.data[i];
              let currDate=str2Date(item.date);
              let start=this.orderCountDate[0];
              let end=this.orderCountDate[1];
              if(currDate.getTime()>=start.getTime()&&currDate.getTime()<=end.getTime()){
                this.chartData.rows.push(item);
              }
            }
          });

          this.dataEmpty = false;
          this.loading = false
        }, 1000);

          /** 第二个饼状图 **/
          this.payCategoryChartData = {
            columns: ['typeName', 'money'],
            rows: []
          };
         /** 第一个饼状图 **/
         getPayCategoryRate(this.yearPayTime).then(response => {
            for(let i=0;i<response.data.length;i++){
              let item=response.data[i];
              this.payCategoryChartData.rows.push(item);
            }
         });
      },
      selectData(){
        /** 第一个饼状图 **/
          this.payChartData = {
              columns: ['type', 'money'],
              rows: []
          };
          /** 第一个饼状图 **/
          getYearPicRate(this.yearPic).then(response => {
            for(let i=0;i<response.data.length;i++){
              let item=response.data[i];
              this.payChartData.rows.push(item);
              console.log("來了"+item);
            }
         },
         );
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
