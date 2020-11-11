
<template>
  <div id="map">
    <!--<b-modal id="modalOriginDestinationFilterDialog" @ok="filterByOriginDestination" hide="false" title="Filtrar por origen y destino">
    <div  ref="map" id="map">-->
    <b-modal id="modalOriginDestinationFilterDialog" @ok="filterByOriginDestination" hide="false" title="Filtrar por origen y destino">
      <p>Inserte los criterios de filtrado:</p>
      <b-row class="m-2">
        <p class="mt-1 mr-2">Origen:</p>
        <b-input id="originForm" type="text" style="width: 350px"/>
      </b-row>
      <div class="ml-3" id="mapOriginContainer" hidden="true">
        <label>Radio del area:</label>
        <b-row>
          <label class="m-1">10 km</label>
          <input type="range" style="width: 350px;" max="50000" min="1250" class="form-control-range" id="formControlRangeOrigin">
          <label class="m-1">1000 km</label>
        </b-row>
        <div id="mapOrigin" class="filterMap"></div>
      </div>
      <b-row class="m-2">
        <p class="mt-1 mr-1">Destino:</p>
        <b-input id="destinationForm" type="text" style="width: 350px"/>
      </b-row>
      <div class="ml-3" id="mapDestinationContainer" hidden="true">
        <label>Radio del area:</label>
        <b-row>
          <label class="m-1">10 km</label>
          <input type="range" style="width: 350px;" max="50000" min="1250" class="form-control-range" id="formControlRangeDestination">
          <label class="m-1">1000 km</label>
        </b-row>
        <div id="mapDestination" class="filterMap"></div>
      </div>
    </b-modal>
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
      apikey: "h_XTwwPMEk8Iz2QvPW6rtB5D99xqPDwbW9aVqNRe1HI",
      packages: undefined, /* Lista de paquetes del mapa */
      originDestinationFilter: {
        origin: {
          position: {},
          radius: 0
        },
        destination: {
          position: {},
          radius: 0
        }
      },
      // You can get the API KEY from developer.here.com
        routingService: {},
        items: [],
        coordenadas: [],
        personDNI: undefined,
    };
  },

  async created() {
        this.personDNI = this.$cookies.get("loginToken").Dni;
        this.addEncargosToList();
   },


  async mounted() {
    console.log(this.getEncargos());
    // Initialize the platform object:
    const platform = new window.H.service.Platform({
      apikey: this.apikey
    });
    this.platform = platform;
     this.routingService = this.platform.getRoutingService();
    this.initializeHereMap();
    this.makerObjectsEncargos(map);
     this.drawRoute(
             { lat: "39.50", lng: "-0.37" },
             { lat: "39.511", lng: "-0.38" },
             map
         );
         
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

      // Add filter button
      let controlFilter = new H.ui.Control();

      var buttonFilter = new H.ui.base.Button({
        label: '<img src="http://localhost:8080/filter.png" fuild width="20 px" heigth="20 px" class="filterButton"/>',
        onStateChange: function() {
          if(buttonFilter.getState() == "down") {
            overlayFilterPanel.pointToControl(controlFilter);
            overlayFilterPanel.setState(overlayFilterPanel.getState() === "open" ? "close" : "open");
          }
        }
      });

      let overlayFilterPanel = new H.ui.base.OverlayPanel();
      overlayFilterPanel.renderInternal = function(el) {
        /* Añadir aquí todos los botones que redirigirán a las pestañas de los filtros*/
        el.innerHTML = "<p class='mt-2 h4'>Filtrar por:</p>"+
        '<button class="btn" id="originDestinationButton">Origen-Destino</button>';
        el.style.color = "black"
      };

      // Añadiendo el boton embudo y el overlay de las opciones de filtros a ui del map
      controlFilter.addChild(buttonFilter);
      controlFilter.addChild(overlayFilterPanel);
      controlFilter.setAlignment('top-right');
      this.ui.addControl('Filtro',controlFilter);

      // Añadir aqui las funciones para abrir las ventanas modales para los filtros
      $('#originDestinationButton')[0].onclick = this.openOriginDestinationModalWindow;

    },
    async makerObjectsEncargos(map) {
      await this.getPackages();
      await this.updateMap(this.packages, map);
    },
    async getPackages() {
      await axios
        .get("http://localhost:3300/api/encargo/estado", {
        })
        .then(
          (response) => {
            this.packages = response.data[0];
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async updateMap(res, map) {
      //const mapContainer = this.$refs.hereMap;
      const H = window.H;
      //var maptypes = this.platform.createDefaultLayers();

      //Limpiar de marcadores el mapa
      map.removeObjects(map.getObjects())

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
    },
    async openOriginDestinationModalWindow() {
      await this.$bvModal.show('modalOriginDestinationFilterDialog')

      const originText = document.getElementById("originForm");
      const destinationText = document.getElementById("destinationForm");
      const mapContainerOrigin = document.getElementById("mapOrigin");
      const mapContainerDestination = document.getElementById("mapDestination");
      const H = window.H;
      // Obtain the default map types from the platform object
      var maptypes = this.platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      var mapOrigin = new H.Map(mapContainerOrigin, maptypes.vector.normal.map, {
        zoom: 7,
        center: { lat: 40.730610, lng: -73.935242 }
      });
      var mapDestination = new H.Map(mapContainerDestination, maptypes.vector.normal.map, {
        zoom: 7,
        center: { lat: 40.730610, lng: -73.935242 }
      });

      window.addEventListener('resize', () => {mapOrigin.getViewPort().resize(); mapDestination.getViewPort().resize();});

      $("#formControlRangeOrigin")[0].addEventListener('change', async () => {
        await this.updateMapCircle(mapOrigin, originText.value,
          $("#formControlRangeOrigin")[0].value, this.originDestinationFilter.origin.position, H)
        this.originDestinationFilter.origin.radius = $("#formControlRangeOrigin")[0].value});
      originText.addEventListener('change',  async () => {
        await this.updateMapCircle(mapOrigin, originText.value,
          $("#formControlRangeOrigin")[0].value, this.originDestinationFilter.origin.position, H)
        this.originDestinationFilter.origin.radius = $("#formControlRangeOrigin")[0].value});
      originText.addEventListener('click', () => {$("#mapOriginContainer")[0].hidden = false;
      $("#mapDestinationContainer")[0].hidden = true});

      $("#formControlRangeDestination")[0].addEventListener('change', async () => {
        await this.updateMapCircle(mapDestination, destinationText.value,
          $("#formControlRangeDestination")[0].value, this.originDestinationFilter.destination.position, H)
        this.originDestinationFilter.destination.radius = $("#formControlRangeDestination")[0].value});
      destinationText.addEventListener('change',  async () => {
        await this.updateMapCircle(mapDestination, destinationText.value,
          $("#formControlRangeDestination")[0].value, this.originDestinationFilter.destination.position, H)
        this.originDestinationFilter.destination.radius = $("#formControlRangeDestination")[0].value});
      destinationText.addEventListener('click', () => {$("#mapDestinationContainer")[0].hidden = false;
      $("#mapOriginContainer")[0].hidden = true});

    },
    zoomNeeded(radio) {
      let percent = radio / 10000;
      if(percent <= 5 && percent > 3) return 7;
      else if (percent <= 3 && percent > 2) return 8;
      else if (percent <= 2 && percent > 1) return 9;
      else if (percent <= 1 && percent > 0.5) return 10;
      else if (percent <= 0.5 && percent > 0.25) return 11;
      else if (percent <= 0.25 && percent > 0.175) return 12;
      else return 13;
    },
    /* Returns the position of the circle, if it isnt a direction return undefined*/
    async updateMapCircle(map, direction, radio, dataPosition, H) {
      if(direction == undefined || direction.trim() === "") return
      map.getViewPort().resize()
      map.removeObjects(map.getObjects())
      var service = this.platform.getSearchService();
      service.geocode({
        q: direction
      }, (res) => {
        let marker = new H.map.Marker(res.items[0].position);
        var circle = new H.map.Circle(res.items[0].position, radio);
        marker.setData(res[0])

        map.addObject(circle);
        //mapOrigin.addObject(marker);
        var zoom = this.zoomNeeded(circle.getRadius())
        map.setCenter(res.items[0].position);
        map.setZoom(zoom);
        dataPosition.lat = res.items[0].position.lat;
        dataPosition.lng = res.items[0].position.lng;
      },
      (error) => {
        console.log(error); 
      })
    },
    /*Elimina aquellos paquetes que no cumplen el filtro de la lista this.packages*/
    async filterByOriginDestination() {
      if(this.originDestinationFilter.origin.position != undefined) {
        const H = window.H;
        const coordsCircleOrigin = new H.geo.Point(this.originDestinationFilter.origin.position.lat,
          this.originDestinationFilter.origin.position.lng);

        
        let service = this.platform.getSearchService();

        var promiseOrigin = new Promise((resolve) => {
          let coordsPackage;
          let filteredPackagesOrigin = [];
          this.packages.forEach((packageItem, index, array) => {
            service.geocode({
              q: packageItem.Origen
            }, (res) => {
              if(res.items[0] != null){
                coordsPackage = new H.geo.Point(res.items[0].position.lat, res.items[0].position.lng);
                var distance = coordsPackage.distance(coordsCircleOrigin)
                if(distance <= this.originDestinationFilter.origin.radius) {
                  filteredPackagesOrigin.push(packageItem);
                }
                if (index === array.length -1) resolve(filteredPackagesOrigin);
              }
            })
          })
        })
        promiseOrigin.then((filteredPackagesOrigin) => {
          this.packages = filteredPackagesOrigin;
          if(this.originDestinationFilter.destination.position != undefined) {
            const coordsCircleDestination = new H.geo.Point(this.originDestinationFilter.destination.position.lat,
              this.originDestinationFilter.destination.position.lng);

            let coordsPackage;
            let filteredPackagesOriginDestination = [];

            this.packages.forEach((packageItem, index, array) => {
              service.geocode({
                q: packageItem.Destino
              }, (res) => {
                if(res.items[0] != null){
                  coordsPackage = new H.geo.Point(res.items[0].position.lat, res.items[0].position.lng);
                  var distance = coordsPackage.distance(coordsCircleDestination)
                  if(distance <= this.originDestinationFilter.destination.radius) {
                    filteredPackagesOriginDestination.push(packageItem);
                  }
                  if (index === array.length -1) {
                    this.packages = filteredPackagesOriginDestination;
                    this.updateMap(filteredPackagesOriginDestination, map)
                  }
                }
              })
            })
          } else {this.updateMap(filteredPackagesOrigin, map)}
        });
      }
    },
    drawRoute(start,finish,map){
                this.routingService.calculateRoute(
                    {
                        "mode": "fastest;car;traffic:enabled",
                        "waypoint0": `${start.lat},${start.lng}`,
                        "waypoint1": `${finish.lat},${finish.lng}`,
                        "representation": "display"

                    },

                    data =>{
                        //console.log("Mostrando datos de CalculateRoute:");
                        //console.log(data);
                        if(data.response.route.length > 0){
                            let lineString = new window.H.geo.LineString();
                            data.response.route[0].shape.forEach(point => {
                                let [lat,lng] = point.split(",");
                                lineString.pushPoint({lat : lat, lng: lng});
                            });
                            let polyline = new window.H.map.Polyline(
                                lineString,
                                {
                                    style:{lineWidth: 5}
                                }

                            );
                            map.addObject(polyline);
                            map.getViewModel().setLookAtData({bounds: polyline.getBoundingBox()});

                        }
                        
                    },

                   error => {
                       console.error(error);
                    }

                );

               
            },

    async getEncargos(){
        
       /*  var res;
         var service;
         var coord;
         
                await axios
                .get("http://localhost:3300/api/encargo/transportista", {
                    params: {
                        DNITransportista: this.personDNI,
                    },
                })
                .then(
                    (response) => {
                        res = response.data[0],
                        service = this.platform.getSearchService();
                        
                         service.geocode({
                         q: res[0].Origen
                        }, (res) => {
                            coord = res.items[0].position;
                             console.log("coord1: lat " + coord.lat + " coord2: lng: " + coord.lng + "  Origen:" + res.items[0].Origen);    
                        })

                        service.geocode({
                         q: res[0].Destino
                        }, (res) => {
                            coord = res.items[0].position;
                             console.log("coord1: lat " + coord.lat + " coord2: lng: " + coord.lng + "  Destino: " + res.items[0].Destino);
                        })

                    },
                    (error) => {
                        console.log(error);
                    }
                );

                console.log("coord2: " + coord);
               // var coordsOrigen = res[0].position.lat;
               // var coordsDestino = res[0].position.lng;
              //  console.log("Coordenadas: Origen: " + coordsOrigen + "  Destino:  " + coordsDestino);
                console.log("var 'res'  Origen: " + res[0].Origen +  "  Destino: " + res[0].Destino );
                //TRANSFORMACION A C0ORDENADAS
                 // let service = this.platform.getSearchService();

                return res;   */
                
      },

    async addEncargosToList() {
            var encargos = await this.getEncargos();
            this.items = encargos;
      }
  }
}
</script>

<style>
.filterButton {
  margin-top: 10px;
}
.filterMap {
  margin: 10px;
  width: 400px;
  height: 250px;
}
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