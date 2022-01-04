<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="weather"
             :rules="rules"
             ref="weatherFrom"
             label-width="150px">
      <el-form-item v-show="false" label="id：" prop="breed" isEdit>
        <el-input v-model.trim="weather.wid"></el-input>
      </el-form-item>
      <el-form-item label="气温：" prop="title">
        <el-input v-model="weather.temperature"></el-input>
      </el-form-item>
      <el-form-item label="湿度：" >
        <el-input v-model="weather.humidity"></el-input>
      </el-form-item>
      <el-form-item label="类型：">
        <el-select v-model="weather.type" placeholder="请选择模型">
          <el-option
            v-for="item in selectTypeLists"
            :key="item.abnormal"
            :label="item.assess"
            :value="item.abnormal">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('weatherFrom')">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {getWeather,createWeather,updateWeather,getWeatherInfo} from '@/api/weather';
const defaultWeather={
  wid:0,
  weather:0,
  humidity:0,
  type:0
}
  export default {
    name: "weatherDetail",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        weather:Object.assign({},defaultWeather),
        selectTypeLists:[{abnormal:0,assess:'室内'},{abnormal:1,assess:'室外'}]
      }
    },
    created() {
      if (this.isEdit) {
        getWeatherInfo(this.$route.query.id).then(response => {
          this.weather = response.data;
        });
      } else {
        this.weather = Object.assign({}, defaultWeather);
      }
    },
    methods: {
      getWeatherList() {
        getWeather(0, {pageSize: 100, pageNum: 1}).then(response => {
          this.selectWeatherList = response.data;
        });

      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateWeather( this.weather).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createWeather(this.weather).then(response => {
                  this.$refs[formName].resetFields();
                  this.resetForm(formName);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              }
            });
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.weather = Object.assign({}, defaultWeather);
        this.getWeatherList()
      },
    }
  }
</script>

<style scoped>

</style>
