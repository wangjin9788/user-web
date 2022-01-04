<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="operation"
             ref="operationFrom"
             label-width="150px">
      <el-form-item v-show="isEdit" style="width : 60%" label="养殖操作编号：" prop="operation" isEdit>
        <el-input v-model="operation.boId" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item style="width : 60%" label="养殖信息编号：" prop="operation" isEdit>
        <el-input v-model="operation.bid" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item style="width : 60%" label="操作类型：" prop="operation" isEdit>
        <el-select v-model="operation.type" placeholder="请选择类型">
          <el-option
            v-for="item in typeList"
            :key="item.abnormal"
            :label="item.assess"
            :value="item.abnormal">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="width : 60%" label="饲料编号：" prop="operation" isEdit>
        <el-input v-model="operation.ferNumber"></el-input>
      </el-form-item>

      <el-form-item style="width : 60%" label="投喂重量：" prop="operation" isEdit>
        <el-input v-model="operation.feeding"></el-input>
      </el-form-item>
      <el-form-item style="width : 60%" label="浇灌量ml：" prop="operation" isEdit>
        <el-input v-model="operation.water"></el-input>
      </el-form-item>
      <el-form-item style="width : 60%" label="浇灌后湿度：" prop="operation" isEdit>
        <el-input v-model="operation.waterHumidity"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('operationFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('operationFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {fetchList, createBreedOperation, updateBreedOperation, getBreedOperationInfo} from '@/api/breedOperation';

const defaultOperation = {
  boId: 0,
  bid: 0
};
export default {
  name: "operation",
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      operation: Object.assign({}, defaultOperation),
      typeList: [ {abnormal: 1, assess: '翻堆'}, {abnormal: 2, assess: '浇水'}, {abnormal: 3, assess: '饲喂'}, {abnormal: 4, assess: '促卵素'}, {abnormal: 5, assess: '收取蚓茧'},{abnormal: 0, assess: '其他'}]
    }
  },
  created() {

    if (this.isEdit) {
      getBreedOperationInfo(this.$route.query.id).then(response => {
        this.operation = response.data;
      });
    } else {
      this.operation = Object.assign({}, defaultOperation);
      this.operation.bid = this.$route.query.bid;
    }

    this.getSelectOperationList(this.operation.bid);
  },
  methods: {
    getSelectOperationList(fid) {
      fetchList(fid, {pageSize: 100, pageNum: 1}).then(response => {
        this.selectOperationList = response.data;
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
              updateBreedOperation(this.operation).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              createBreedOperation(this.operation).then(response => {
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
      this.operation = Object.assign({}, defaultOperation);
      this.getSelectOperationList(this.operation.bid);
    },
  }
}
</script>

<style scoped>

</style>
