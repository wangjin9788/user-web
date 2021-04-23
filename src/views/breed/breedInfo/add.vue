<template> 
  <fermentation-detail :is-edit='false'></fermentation-detail>
</template>
<script>
  import FermentationDetail from './components/FermentationDetail'
  export default {
    name: 'addFermentation',
    components: { FermentationDetail }
  }
</script>
<style>
</style>
