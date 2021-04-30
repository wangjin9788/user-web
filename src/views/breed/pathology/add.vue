<template> 
  <pathology-detail :is-edit='false'></pathology-detail>
</template>
<script>
  import PathologyDetail from './components/PathologyDetail'
  export default {
    name: 'addBreedPathology',
    components: { PathologyDetail }
  }
</script>
<style>
</style>
