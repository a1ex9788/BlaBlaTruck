<template>
  <div>
    <Sidebar/>
    <div id="groupForm">
      <!--<HereMap  id="map" :center="center"/>-->
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
//import HereMap from '../components/HereMap'
export default {
  name: 'app',
  components: {
    //HereMap,
    Sidebar
    // Remove the HelloWorld.vue 
  },
  data() {
return {
    // we are this as prop to the HereMap component 
  center:{ 
    lat: 40.730610, 
    lng: -73.935242
    }
}
  
  }
}
</script>

<style>
    #groupForm {
        max-width: 500px;
        margin: 0 auto;
    }
    #map {
        position: absolute; top: 0; left: 0; height: 100%; width: 100%;
    }
</style>