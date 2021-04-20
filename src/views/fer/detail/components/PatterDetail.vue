<template>
  <el-card class="form-container" shadow="never">
   <el-form :model="patter"
               ref="patterFrom"
               label-width="150px">
      <el-form-item v-show="isEdit"  label="编号：" prop="patter" isEdit>
        <el-input v-model.trim="patter.fpId" ></el-input>
      </el-form-item>
      <el-form-item label="模型：" prop="patter">
        <el-input v-model.trim="patter.material" ></el-input>
      </el-form-item>
      <el-form-item label="分类图标：">
              <single-upload v-model="patter.icon"></single-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('patterFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('patterFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {fetchList, createPattern,updatePattern,getPattern} from '@/api/pattern';
  import SingleUpload from '@/components/Upload/singleUpload';
  const defaultPatter = {
    fpId: '',
    icon: ''
  };
  export default {
    name: "PatterDetail",
    components: {SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        patter: Object.assign({}, defaultPatter),
      }
    },
    created() {
      if (this.isEdit) {
        getPattern(this.$route.query.id).then(response => {
          this.patter = response.data;
        });
      } else {
        this.patter = Object.assign({}, defaultPatter);
      }
      this.getSelectPatterList();
    },
    methods: {
      getSelectPatterList() {
        fetchList(0, {pageSize: 100, pageNum: 1}).then(response => {
          this.selectPatterList = response.data;
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
                updatePattern( this.patter).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
              console.log(this.patter);
                createPattern(this.patter).then(response => {
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
        this.patter = Object.assign({}, defaultPatter);
        this.getSelectPatterList();
      },
    }
  }
</script>

<style scoped>

</style>
