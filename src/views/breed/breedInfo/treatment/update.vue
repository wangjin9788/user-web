<template> 
  <Treatment-Data :is-edit='true'></Treatment-Data>
</template>
<script>
  import TreatmentData from './components/TreatmentData'
  export default {
    name: 'updateBreedTreatment',
    components: { TreatmentData }
  }
</script>
<style>
</style>

