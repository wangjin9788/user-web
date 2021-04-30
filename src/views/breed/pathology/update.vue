<template> 
  <pathology-detail :is-edit='true'></pathology-detail>
</template>
<script>
  import PathologyDetail from './components/PathologyDetail'
  export default {
    name: 'updateBreedPathology',
    components: { PathologyDetail }
  }
</script>
<style>
</style>

