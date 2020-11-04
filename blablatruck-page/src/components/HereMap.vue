
<template>
  <div id="map">
    <b-modal id="modalDialog" @ok="this.hide = true; window.location.reload();">Su paquete ha sido reservado con éxito!</b-modal>
  <!--In the following div the HERE Map will render-->
    <div id="mapContainer" ref="hereMap"></div>
  </div>
</template>

<script>
import $ from 'jquery'
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
    hi() { console.log("hola")},
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
        },
        (error) => {
          console.log(error);
        }
      );
            res.forEach((element) => {
              var calle = element.Origen;
              var service = this.platform.getSearchService();
              // Call the geocode method with the geocoding parameters,
              // the callback and an error callback function (called if a
              // communication error occurs):
              service.geocode({
                q: calle
              }, (res) => {
                // Add a marker for each location found

                if(res.items[0] != null){
                            var item = res.items[0];
                            let marker = new H.map.Marker(item.position)
                            marker.setData(item)
                            map.addObject(marker);
                            //let
                            marker.addEventListener('tap', ()=> {
                            var bubble =  new H.ui.InfoBubble(item.position, {
                            //read custom data
                            content:"Cliente: ".bold().fontsize(5) + element.DNICliente.fontsize(3).fontcolor('#0055FF') + 
                                    " Origen: ".bold().fontsize(5) + element.Origen.fontsize(3).fontcolor('#0055FF')  +
                                    " Destino: ".bold().fontsize(5) + element.Destino.fontsize(3).fontcolor('#0055FF') + 
                                    " Naturaleza: ".bold().fontsize(4) + element.NaturalezaEncargo.fontsize(3).fontcolor('#0055FF') +
                                    " Dimensiones: ".bold().fontsize(4) + element.Alto.toString().fontsize(3).fontcolor('#0055FF') + 
                                                      " x " + element.Ancho.toString().fontsize(3).fontcolor('#0055FF') + 
                                                      " x " + element.Largo.toString().fontsize(3).fontcolor('#0055FF') +
                                                      "<button type='button' id='"+ element.Id.toString() + "' class='btn btn-primary'>Reservar</button>"
                                                  
                            });
                            
                            this.ui.addBubble(bubble);
                            let dni = this.$cookies.get("loginToken").Dni;
                            let modal = () => {
                              this.$bvModal.msgBoxOk('Su paquete ha sido reservado con éxito',{
                                title: 'Confirmación',
                                size: 'sm',
                                buttonSize: 'sm',
                                okVariant: 'info',
                                headerClass: 'p-2 border-bottom-0',
                                footerClass: 'p-2 border-top-0',
                                centered: true
                              }).then(value => {
                              if(value) {map.removeObject(marker); this.ui.removeBubble(bubble);}
                                  })
                              };
                            $('#'+ element.Id)[0].onclick = async function () {
                              await axios.put('http://localhost:3300/api/encargo/reservar',{
                                IdEncargo: element.Id, DNITransportista: dni
                              })
                              .then((msg) => {
                                console.log(msg);
                                //Añadir aqui la ventana de confirmación de paquete reservado y esperar a que el cliente acepte
                                //para recargar la pagina.
                                //
                                modal();
                                }), 
                              (error) => {
                                console.log(error); // si hay un error con el logueo o conexion
                                
                              }
                            };
                            
                    });

                }
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