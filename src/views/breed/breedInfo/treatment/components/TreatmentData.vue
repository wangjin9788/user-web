<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="treatment"
             ref="treatmentFrom"
             label-width="150px">
      <el-form-item v-show="isEdit"  style="width : 60%" label="治疗编号：" prop="treatment" isEdit>
        <el-input v-model="treatment.btId" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item  style="width : 60%" label="养殖信息编号：" prop="treatment" isEdit>
        <el-input v-model="treatment.bid" readonly="readonly"></el-input>
      </el-form-item>
      <el-form-item  style="width : 60%" label="病理名称：" prop="treatment" isEdit>
        <el-input v-model="treatment.illnessName"></el-input>
      </el-form-item>
      <el-form-item  style="width : 60%" label="采用药物：" prop="treatment" isEdit>
        <el-input v-model="treatment.medicine" ></el-input>
      </el-form-item>
      <el-form-item  style="width : 60%" label="病理说明：" prop="treatment" isEdit>
        <el-input v-model="treatment.illnessExplain" ></el-input>
      </el-form-item>
      <el-form-item label="治疗类型：">
        <el-select v-model="treatment.type" placeholder="请选择类型">
          <el-option
            v-for="item in stateList"
            :key="item.type"
            :label="item.assess"
            :value="item.type">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="评价：">
        <el-select v-model="treatment.eid" placeholder="请选择评价">
          <el-option
            v-for="item in selectEvaluateLists"
            :key="item.eid"
            :label="item.assess"
            :value="item.eid">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="病理图片：">
        <template slot-scope="scope">
          <single-upload v-model="treatment.imgUrl"></single-upload>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('treatmentFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('treatmentFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {fetchList, createBreedTreatment,updateBreedTreatment,getBreedTreatmentInfo,getEvaluateList} from '@/api/breedTreatment';
import SingleUpload from '@/components/Upload/singleUpload';
const defaultTreatment = {
  btId: 0,
  bid: 0,
  img: '',
  status: 0,
  abnormal:0
};
export default {
  name: "treatment",
  components: {SingleUpload},
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      treatment: Object.assign({}, defaultTreatment),
      stateList: [{type: 0, assess: '伴食'}, {type: 1, assess: '喷洒'}],
      selectEvaluateLists: getEvaluateList().then(response => {
        this.selectEvaluateLists = response.data;
      })

    }
  },
  created() {

    if (this.isEdit) {
      getBreedTreatmentInfo(this.$route.query.id).then(response => {
        this.treatment = response.data;
      });
    } else {
      this.treatment = Object.assign({}, defaultTreatment);
      this.treatment.bid=this.$route.query.bid;
    }

    this.getSelectTreatmentList(this.treatment.bid);
  },
  methods: {
    getSelectTreatmentList(fid) {
      fetchList(fid, {pageSize: 100, pageNum: 1}).then(response => {
        this.selecttreatmentList = response.data;
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
              updateBreedTreatment( this.treatment).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              createBreedTreatment(this.treatment).then(response => {
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
      this.treatment = Object.assign({}, defaultTreatment);
      this.getSelectTreatmentList(this.treatment.bid);
    },
  }
}
</script>

<style scoped>

</style>
