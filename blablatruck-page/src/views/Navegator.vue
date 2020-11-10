<template>
  <div>
    <div id="sidebar">
      <Sidebar/>
    </div>
    <div id="map"> 
       <HereMap
             ref="map"
             :center="center">
        </HereMap>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import HereMap from '../components/HereMap'
export default {
  name: 'app',
  components: {
    HereMap,
    Sidebar
    // Remove the HelloWorld.vue 
  },
  data() {
return {
    // we are this as prop to the HereMap component 
  center:{ 
    lat: 39.46975, 
    lng: -0.37739
    }
}
  },

}
</script>

<style>
  #map {
      width: 100%; 
      height: 92vh;
  }
  #sidebar {
      width: 100%; 
      height: 8vh;
  }
  body{
    padding: 0;
    margin: 0;
  }
</style>