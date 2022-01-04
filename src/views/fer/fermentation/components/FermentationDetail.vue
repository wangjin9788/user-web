<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="fermentation"
             ref="fermentationFrom"
             label-width="150px">
      <el-form-item v-show="false" label="编号：" prop="fermentation" isEdit>
        <el-input v-model.trim="fermentation.fpId"></el-input>
      </el-form-item>
      <el-form-item  style="width : 60%" label="发酵堆编号：" prop="fermentation" isEdit>
        <el-input v-model.trim="fermentation.number"></el-input>
      </el-form-item>
      <el-form-item label="发酵类型型：">
        <el-select v-model="fermentation.type" placeholder="请选择模型">
          <el-option
            v-for="item in selectTypeLists"
            :key="item.abnormal"
            :label="item.assess"
            :value="item.abnormal">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模型：">
        <el-select v-model="fermentation.fpId" placeholder="请选择模型">
          <el-option
            v-for="item in selectFermentationLists"
            :key="item.fpId"
            :label="item.material"
            :value="item.fpId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发酵时间：" prop="fermentation">
        <el-date-picker
          v-model="fermentation.ferTime"
          type="datetime"
          format="yyyy-MM-dd hh:mm"
          value-format="yyyy-MM-dd hh:mm"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item style="width : 60%" label="单前第几次发酵：" prop="fermentation" isEdit>
        <el-input v-model.trim="fermentation.curFermentation"></el-input>
      </el-form-item>
      <el-form-item style="width : 60%" label="原料重量：" prop="detail" isEdit>
        <el-input v-model="fermentation.weight"></el-input>

        <el-button type="primary" @click="onSubmit('fermentationFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('fermentationFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {
  fetchList,
  createFermentation,
  updateFermentation,
  getFermentationInfo,
  getPattern,
  getPatternList,
  getEvaluateList
} from '@/api/fermentation';
import SingleUpload from '@/components/Upload/singleUpload';

const defaultFermentation = {
  img: '',
  status: 0
};
export default {
  name: "FermentationDetail",
  components: {SingleUpload},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fermentation: Object.assign({}, defaultFermentation),
      selectFermentationLists: getPatternList().then(response => {
        this.selectFermentationLists = response.data;
      }),
      selectTypeLists:[{abnormal: 1, assess: '堆肥发酵'},{abnormal: 6, assess: '菌种发酵'}],
      selectEvaluateLists: getEvaluateList().then(response => {
        this.selectEvaluateLists = response.data;
      })

    }
  },
  created() {
    if (this.isEdit) {
      getFermentationInfo(this.$route.query.id).then(response => {
        this.fermentation = response.data;
      });
    } else {
      this.fermentation = Object.assign({}, defaultFermentation);
    }
    this.getSelectFermentationList();
  },
  methods: {
    getSelectFermentationList() {
      fetchList(0, {pageSize: 100, pageNum: 1}).then(response => {
        this.selectFermentationList = response.data;
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
              updateFermentation(this.fermentation).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              createFermentation(this.fermentation).then(response => {
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
      this.fermentation = Object.assign({}, defaultFermentation);
      this.getSelectFermentationList();
    },
  }
}
</script>

<style scoped>

</style>
