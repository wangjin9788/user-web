<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>添加数据</span>
      <el-button
        class="btn-add"
        @click="addWeather()"
        size="mini">
        添加天气
      </el-button>
    </el-card>
    <el-card class="form-container" shadow="never">
      <el-form :model="detail"
               ref="detailFrom"
               label-width="150px">
        <el-form-item v-show="isEdit" style="width : 60%" label="发酵详情编号：" prop="detail" isEdit>
          <el-input v-model="detail.fdId" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item style="width : 60%" label="发酵信息编号：" prop="detail" isEdit>
          <el-input v-model="detail.fid" readonly="readonly"></el-input>
        </el-form-item>
        <el-form-item style="width : 60%" label="温度/湿度：" prop="detail" isEdit>
          <el-select v-model="detail.wid" placeholder="请选择气温">
            <el-option
              v-for="item in weatherLists"
              :key="item.wid"
              :label="item.info"
              :value="item.wid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width : 60%" label="发酵堆温度：" prop="detail" isEdit>
          <el-input v-model="detail.heapTemperature"></el-input>
        </el-form-item>
        <el-form-item style="width : 60%" label="发酵堆湿度：" prop="detail" isEdit>
          <el-input v-model="detail.heapHumidity"></el-input>
        </el-form-item>
        <el-form-item style="width : 60%" label="ph值：" prop="detail" isEdit>
          <el-input v-model="detail.ph"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('detailFrom')">提交</el-button>
          <el-button v-if="!isEdit" @click="resetForm('detailFrom')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  fetchList,
  createFermentationDetail,
  updateFermentationDetail,
  getFermentationDetailInfo
} from '@/api/fermentationDetail';
import SingleUpload from '@/components/Upload/singleUpload';
import {weatherList} from '@/api/weather';

const defaultDetail = {
  fdId: 0,
  fid: 0,
  img: '',
  status: 0
};
export default {
  name: "detail",
  components: {SingleUpload},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      detail: Object.assign({}, defaultDetail),
      weatherLists: weatherList().then(response => {
        this.weatherLists = response.data;
      }),
    }
  },
  created() {

    if (this.isEdit) {
      getFermentationDetailInfo(this.$route.query.id).then(response => {
        this.detail = response.data;
      });
    } else {
      this.detail = Object.assign({}, defaultDetail);
      this.detail.fid = this.$route.query.id;
      //获取天气信息

    }
    this.getSelectDetailList(this.detail.fid);
  },
  methods: {
    getSelectDetailList(fid) {
      fetchList(fid, {pageSize: 100, pageNum: 1}).then(response => {
        this.selectDetailList = response.data;
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
              updateFermentationDetail(this.detail).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              createFermentationDetail(this.detail).then(response => {
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
    //添加天气
    addWeather(){
      this.$router.push('/weather/addWeather');
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.detail = Object.assign({}, defaultDetail);
      this.getSelectDetailList(this.detail.fid);
    },
  }
}
</script>

<style scoped>

</style>
