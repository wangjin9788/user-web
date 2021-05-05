<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="task"
             ref="taskFrom"
             label-width="150px">
      <el-form-item label="任务时间：" prop="task" >
        <el-date-picker
          v-model="task.taskTime"
          type="datetime"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="任务内容：" prop="task">
        <el-input v-model.trim="task.taskContent" ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('taskFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('taskFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import {fetchList, createTask,updateTask,getTask} from '@/api/task';
  const defaultTask = {
    tid: ''
  };
  export default {
    name: "taskDetail",

    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        task: Object.assign({}, defaultTask),

      }
    },
    created() {
      if (this.isEdit) {
        getTask(this.$route.query.id).then(response => {
          this.task = response.data;
        });
      } else {
        this.task = Object.assign({}, defaultTask);
      }
      this.getSelectTaskList();
    },
    methods: {
      getSelectTaskList() {
        fetchList(0, {pageSize: 100, pageNum: 1}).then(response => {
          this.selectTaskList = response.data;
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
                updateTask( this.task).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$router.back();
                });
              } else {
                createTask(this.task).then(response => {
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
        this.revenue = Object.assign({}, defaultTask);
        this.getSelectTaskList();
      },
    }
  }
</script>

<style scoped>

</style>
