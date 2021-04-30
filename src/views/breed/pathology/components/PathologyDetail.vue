<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="pathology"
               ref="pathologyFrom"
               label-width="150px">
      <el-form-item v-show="false"  label="编号：" prop="pathology" isEdit>
        <el-input v-model.trim="pathology.pdId" ></el-input>
      </el-form-item>
      <el-form-item label="病症：" prop="pathology">
        <el-input :type="textarea" v-model.trim="pathology.disease" ></el-input>
      </el-form-item>
      <el-form-item label="引起原因：" prop="pathology">
        <el-input :type="textarea" v-model.trim="pathology.reason" ></el-input>
      </el-form-item>
      <el-form-item label="解决方案：" prop="pathology">
        <el-input :type="textarea" v-model.trim="pathology.resolvent" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('pathologyFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('pathologyFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {fetchList, createBreedPathology,updateBreedPathology,getBreedPathologyInfo} from '@/api/breedPathology';
  const defaultPathology = {
    pdId: ''
  };
  export default {
    name: "pathologyDetail",

    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        pathology: Object.assign({}, defaultPathology),
      }
    },
    created() {
      if (this.isEdit) {
        getBreedPathologyInfo(this.$route.query.id).then(response => {
          this.pathology = response.data;
        });
      } else {
        this.pathology = Object.assign({}, defaultPathology);
      }
      this.getSelectPathologyList();
    },
    methods: {
      getSelectPathologyList() {
        fetchList({keyword:'' ,pageSize: 100, pageNum: 1}).then(response => {
          this.selectPathologyList = response.data;
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
                updateBreedPathology( this.pathology).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
              console.log(this.pathology);
                createBreedPathology(this.pathology).then(response => {
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
        this.pathology = Object.assign({}, defaultPathology);
        this.getSelectPathologyList();
      },
    }
  }
</script>

<style scoped>

</style>
