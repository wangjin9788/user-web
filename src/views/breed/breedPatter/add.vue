<template> 
  <patter-detail :is-edit='false'></patter-detail>
</template>
<script>
  import PatterDetail from './components/PatterDetail'
  export default {
    name: 'addPatter',
    components: { PatterDetail }
  }
</script>
<style>
</style>
