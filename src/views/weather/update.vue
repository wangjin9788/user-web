<template> 
  <Weather-detail :is-edit='true'></Weather-detail>
</template>
<script>
  import WeatherDetail from './components/WeatherDetail'
  import Weather from "./index";
  export default {
    name: 'updateWeather',
    components: {Weather, WeatherDetail }
  }
</script>
<style>
</style>


