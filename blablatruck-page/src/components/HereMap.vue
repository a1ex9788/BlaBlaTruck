
<template>
  <div id="map">
  <!--In the following div the HERE Map will render-->
    <div id="mapContainer" ref="hereMap"></div>
  </div>
</template>

<script>
const axios = require("axios"); 
var map;
export default {
  name: "HereMap",
  props: {
    center: Object
    // center object { lat: 40.730610, lng: -73.935242 }
  },
  data() {
    return {
      platform: null,
      apikey: "h_XTwwPMEk8Iz2QvPW6rtB5D99xqPDwbW9aVqNRe1HI"
      // You can get the API KEY from developer.here.com
    };
  },
  async mounted() {
    // Initialize the platform object:
    const platform = new window.H.service.Platform({
      apikey: this.apikey
    });
    this.platform = platform;
    this.initializeHereMap();
    this.makerObjectsEncargos(map);
  },
  methods: {
    initializeHereMap() { // rendering map

      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      // Obtain the default map types from the platform object
      var maptypes = this.platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 10,
        center: this.center
        // center object { lat: 40.730610, lng: -73.935242 }
      });
      window.addEventListener('resize', 
	      () => map.getViewPort().resize());

      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // add UI
      this. ui = H.ui.UI.createDefault(map, maptypes);
      // End rendering the initial map
    },
  async makerObjectsEncargos(map) {

    var res; 
    //const mapContainer = this.$refs.hereMap;
    const H = window.H;
    //var maptypes = this.platform.createDefaultLayers();
      await axios
        .get("http://localhost:3300/api/encargo/estado", {
        })
        .then(
          (response) => {
            res = response.data[0];
            // console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
      
              //console.log(res[0].Origen);
            res.forEach(async (element) => {
              
              var calle = element.Origen;
              var service = this.platform.getSearchService();
              // Call the geocode method with the geocoding parameters,
              // the callback and an error callback function (called if a
              // communication error occurs):
              service.geocode({
                q: calle
              }, (res) => {
                // Add a marker for each location found
                res.items.forEach((item) => {
                  var marker = new H.map.Marker(item.position)

                  marker.setData(item)
                  map.addObject(marker);

                  
                  marker.addEventListener('tap', ()=> {
                    console.log(element)
                  var bubble =  new H.ui.InfoBubble(item.position, {
                  //read custom data
                  content: "Origen: " + element.Origen + 
                           " Destino: " + element.Destino + 
                           " Cliente: " + element.DNICliente + 
                           " Dimensiones: " + element.Alto + " x " + element.Ancho + " x " + element.Largo
                  });
                  // Log 'tap' and 'mouse' events:
                  //console.log(bubble)
                  this.ui.addBubble(bubble);
                });
                });

              }, alert);
            })
          }
          }
  };
</script>

<style scoped>
#map {


  background-color: #ccc;

}
#mapContainer {
  width: 100%; 
  height: 92vh;
  padding: 0;
  margin: 0;
}
</style>