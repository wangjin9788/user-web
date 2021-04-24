<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="measure"
             ref="measureFrom"
             label-width="150px">
      <el-form-item v-show="isEdit"  style="width : 60%" label="生长编号：" prop="measure" isEdit>
        <el-input v-model="measure.bmId" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item  style="width : 60%" label="养殖信息编号：" prop="measure" isEdit>
        <el-input v-model="measure.bid" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item  style="width : 60%" label="条数/1斤：" prop="measure" isEdit>
        <el-input v-model="measure.count"></el-input>
      </el-form-item>
      <el-form-item label="图片：">
        <template slot-scope="scope">
          <single-upload v-model="measure.imgUrl"></single-upload>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('measureFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('measureFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {fetchList, createBreedMeasure,updateBreedMeasure,getBreedMeasureInfo} from '@/api/breedMeasure';
import SingleUpload from '@/components/Upload/singleUpload';
const defaultMeasure = {
  bmId: 0,
  bid: 0,
  img: ''
};
export default {
  name: "measure",
  components: {SingleUpload},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      measure: Object.assign({}, defaultMeasure)

    }
  },
  created() {

    if (this.isEdit) {
      getBreedMeasureInfo(this.$route.query.id).then(response => {
        this.measure = response.data;
      });
    } else {
      this.measure = Object.assign({}, defaultMeasure);
      this.measure.bid=this.$route.query.bid;
    }

    this.getSelectMeasureList(this.measure.bid);
  },
  methods: {
    getSelectMeasureList(fid) {
      fetchList(fid, {pageSize: 100, pageNum: 1}).then(response => {
        this.selectMeasureList = response.data;
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
              updateBreedMeasure( this.measure).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              createBreedMeasure(this.measure).then(response => {
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
      this.measure = Object.assign({}, defaultMeasure);
      this.getSelectMeasureList(this.measure.bid);
    },
  }
}
</script>

<style scoped>

</style>
