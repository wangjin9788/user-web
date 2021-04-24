<template> 
  <Operation-Data :is-edit='false'></Operation-Data>
</template>
<script>
  import OperationData from './components/OperationData'
  export default {
    name: 'addBreedOperation',
    components: { OperationData }
  }
</script>
<style>
</style>
