<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="evaluate"
             ref="evaluateFrom"
             label-width="150px">
      <el-form-item v-show="isEdit"  style="width : 60%" label="生长编号：" prop="evaluate" isEdit>
        <el-input v-model="evaluate.beId" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item  style="width : 60%" label="养殖信息编号：" prop="evaluate" isEdit>
        <el-input v-model="evaluate.bid" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item  style="width : 60%" label="产出评价：" prop="evaluate" isEdit>
        <el-input v-model="evaluate.produceEvaluate"></el-input>
      </el-form-item>
      <el-form-item  style="width : 60%" label="孵化评价：" prop="evaluate" isEdit>
        <el-input v-model="evaluate.hatchEvaluate"></el-input>
      </el-form-item>
      <el-form-item  style="width : 60%" label="养殖周期：" prop="evaluate" isEdit>
        <el-input v-model="evaluate.cycle"></el-input>
      </el-form-item>
      <el-form-item  style="width : 60%" label="出售价格：" prop="evaluate" isEdit>
        <el-input v-model="evaluate.price"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('evaluateFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('evaluateFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {fetchList, createBreedEvaluate,updateBreedEvaluate,getBreedEvaluateInfo} from '@/api/breedEvaluate';
const defaultEvaluate = {
  beId: 0,
  bid: 0,
  img: ''
};
export default {
  name: "evaluate",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      evaluate: Object.assign({}, defaultEvaluate)

    }
  },
  created() {

    if (this.isEdit) {
      getBreedEvaluateInfo(this.$route.query.id).then(response => {
        this.evaluate = response.data;
      });
    } else {
      this.evaluate = Object.assign({}, defaultEvaluate);
      this.evaluate.bid=this.$route.query.bid;
    }

    this.getSelectEvaluateList(this.evaluate.bid);
  },
  methods: {
    getSelectEvaluateList(fid) {
      fetchList(fid, {pageSize: 100, pageNum: 1}).then(response => {
        this.selectEvaluateList = response.data;
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
              updateBreedEvaluate( this.evaluate).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              createBreedEvaluate(this.evaluate).then(response => {
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
      this.evaluate = Object.assign({}, defaultEvaluate);
      this.getSelectEvaluateList(this.evaluate.bid);
    },
  }
}
</script>

<style scoped>

</style>
