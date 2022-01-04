<template> 
  <Weather-detail :is-edit='false'></Weather-detail>
</template>
<script>
  import WeatherDetail from './components/WeatherDetail'
  import Weather from "./index";
  export default {
    name: 'addWeather',
    components: {Weather, WeatherDetail }
  }
</script>
<style>
</style>


