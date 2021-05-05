<template> 
  <task-detail :is-edit='false'></task-detail>
</template>
<script>
  import TaskDetail from './components/TaskDetail'
  export default {
    name: 'addTask',
    components: { TaskDetail }
  }
</script>
<style>
</style>
