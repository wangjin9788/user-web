<template> 
  <task-detail :is-edit='true'></task-detail>
</template>
<script>
  import TaskDetail from './components/TaskDetail'
  export default {
    name: 'updateTask',
    components: { TaskDetail }
  }
</script>
<style>
</style>

