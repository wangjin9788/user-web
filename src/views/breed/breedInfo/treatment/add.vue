<template> 
  <Treatment-Data :is-edit='false'></Treatment-Data>
</template>
<script>
  import TreatmentData from './components/TreatmentData'
  export default {
    name: 'addBreedTreatment',
    components: { TreatmentData }
  }
</script>
<style>
</style>
