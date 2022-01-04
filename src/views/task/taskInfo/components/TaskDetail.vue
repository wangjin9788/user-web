<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="task"
             ref="taskFrom"
             label-width="150px">
      <el-form-item style="width : 60%" label="操作类型：" prop="operation" isEdit>
        <el-select v-model="task.type" placeholder="请选择类型" @change="changeSelect">
          <el-option
            v-for="item in typeList"
            :key="item.abnormal"
            :label="item.assess"
            :value="item.abnormal">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="width : 60%" label="关联编号：" prop="operation" isEdit>
        <el-select v-model="task.contactId" placeholder="请选择关联编号">
          <el-option
            v-for="(item,index)  in typeOptions"
            :key="index.id"
            :label="item.number"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="width : 60%" label="任务时间：" prop="task">
        <el-date-picker
          v-model="task.taskTime"
          type="datetime"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item style="width : 60%" label="任务内容：" prop="task">
        <el-input v-model.trim="task.taskContent"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('taskFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('taskFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import {fetchList, createTask, updateTask, getTask,getTaskRelationList} from '@/api/task';

const defaultTask = {
  tid: '',
  contactId: '',
  type: ''
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
      typeOptions: [],
      task: Object.assign({}, defaultTask),
      typeList: [{abnormal: 1, assess: '翻堆'}, {abnormal: 2, assess: '浇水'}, {abnormal: 3, assess: '饲喂'}, {
        abnormal: 4,
        assess: '促卵素'
      }, {abnormal: 5, assess: '收取蚓茧'}, {abnormal: 0, assess: '其他'}],
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
    changeSelect() {
      getTaskRelationList( this.task.type).then(response => {
        this.typeOptions = response.data;
      });
    },
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
              updateTask(this.task).then(response => {
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
