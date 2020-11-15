<template>
<div id="map">
    <!--<b-modal id="modalOriginDestinationFilterDialog" @ok="filterByOriginDestination" hide="false" title="Filtrar por origen y destino">
    <div  ref="map" id="map">-->
    <b-modal id="noPackagesInMap" title="Lo sentimos pero hay un error" hide-footer>
        <div class="d-block text-center">
            <h4>No se han encontrado paquetes</h4>
            <br>
        </div>
        <b-button class="mt-2" block @click="$bvModal.hide('noPackagesInMap')">Cerrar</b-button>
    </b-modal>
    <b-modal id="modalOriginDestinationFilterDialog" @ok="filterByOriginDestination" hide="false" title="Filtrar por origen y destino">
        <p>Inserte los criterios de filtrado:</p>
        <b-row class="mt-2 ml-2">
            <p class="mt-1 mr-2">Origen:</p>
            <b-input autocomplete="off" list="originAutocompleteList" :state="originDestinationFilter.errorOrigin" id="originForm" type="text" style="width: 350px" />
            <b-dropdown style="margin-bottom: 10px" dropright no-caret variant="link" toggle-class="text-decoration-none" id="originAutocompleteList">
                <template #button-content>
                    &#x1f50d;<span class="sr-only">Search</span>
                </template>
                <b-dropdown-item v-bind:address="place.address.label" v-for="place in originDestinationFilter.placesAutocompleList" v-bind:key="place.id" @click="clickItemDropPlaces(place.address.label, true)">
                    {{ place.address.label }}
                </b-dropdown-item>
            </b-dropdown>
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
        <b-row class="mt-2 ml-2">
            <p class="mt-1 mr-1">Destino:</p>
            <b-input id="destinationForm" :state="originDestinationFilter.errorDestination" type="text" style="width: 350px" />
            <b-dropdown style="margin-bottom: 10px" dropright no-caret variant="link" toggle-class="text-decoration-none" id="destinationAutocompleteList">
                <template #button-content>
                    &#x1f50d;<span class="sr-only">Search</span>
                </template>
                <b-dropdown-item v-bind:address="place.address.label" v-for="place in originDestinationFilter.placesAutocompleList" v-bind:key="place.id" @click="clickItemDropPlaces(place.address.label, false)">
                    {{ place.address.label }}
                </b-dropdown-item>
            </b-dropdown>
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

    <b-modal id="modalTamanyoFilterDialog" @ok="filterByTamanyo" title="Filtrar por el tamaño del paquete">
        <b-alert show variant="danger" :hidden="messageError">{{messageError2}}</b-alert>
        <b-form inline class="ml-10" style="width-: 25">
            <b-form-input id="altura" class="mr-2" placeholder="alto" max="300" min="1" type="number" :state="altoError" @input="comprobarNumerosNegativosAltura"></b-form-input>
            <label class="mr-2">x</label>
            <b-form-input id="anchura" class="mr-2 " placeholder="ancho" max="240" min="1" type="number" :state="anchoError" @input="comprobarNumerosNegativosAnchura"></b-form-input>
            <label class="mr-2">x</label>
            <b-form-input id="largo" class="ml-2" placeholder="largo" max="1400" min="1" type="number" :state="largoError" @input="comprobarNumerosNegativosLargo" @></b-form-input>
            <label class="ml-2">(cm)</label>
        </b-form>
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
            packages: undefined,
            /* Lista de paquetes del mapa */
            originDestinationFilter: {
                isActive: false,
                errorOrigin: null,
                errorDestination: null,
                placesAutocompleList: [],
                origin: {
                    position: {},
                    radius: 0
                },
                destination: {
                    position: {},
                    radius: 0
                }
            },

            altoError: undefined,
            anchoError: undefined,
            largoError: undefined,
            messageError: true,
            messageError2: undefined,
            tamanyoFilter: {
                isActive: false,
                altura: undefined,
                anchura: undefined,
                largo: undefined,
            },

            routingService: {},
            items: [],
            coordenadasEncargosPendientes: [{
                origen: {
                    lat: undefined,
                    lng: undefined
                },
                destino: {
                    lat: undefined,
                    lng: undefined
                }
            }],
            personDNI: undefined,
        };
    },

    async created() {
        this.personDNI = this.$cookies.get("loginToken").Dni;
    },

    async mounted() {

        // Initialize the platform object:
        const platform = new window.H.service.Platform({
            apikey: this.apikey
        });
        this.platform = platform;
        this.routingService = this.platform.getRoutingService();
        this.initializeHereMap();
        await this.makerObjectsEncargos(map);
        await this.addEncargosToList();
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
            this.ui = H.ui.UI.createDefault(map, maptypes);
            // End rendering the initial map

            // Add filter button
            let controlFilter = new H.ui.Control();

            var buttonFilter = new H.ui.base.Button({
                label: '<img src="http://localhost:8080/filter.png" fuild width="20 px" heigth="20 px" class="filterButton"/>',
                onStateChange: function () {
                    if (buttonFilter.getState() == "down") {
                        overlayFilterPanel.pointToControl(controlFilter);
                        overlayFilterPanel.setState(overlayFilterPanel.getState() === "open" ? "close" : "open");
                    }
                }
            });

            let overlayFilterPanel = new H.ui.base.OverlayPanel();
            overlayFilterPanel.renderInternal = function (el) {
                /* Añadir aquí todos los botones que redirigirán a las pestañas de los filtros*/
                el.innerHTML = "<p class='mt-2 h4'>Filtrar por:</p>" +
                    '<button class="btn" id="originDestinationButton">Origen-Destino</button>' +
                    '<button class="btn" id="tamanyoButton">Tamaño</button>';
                el.style.color = "black"
            };

            // Añadiendo el boton embudo y el overlay de las opciones de filtros a ui del map
            controlFilter.addChild(buttonFilter);
            controlFilter.addChild(overlayFilterPanel);
            controlFilter.setAlignment('top-right');
            this.ui.addControl('Filtro', controlFilter);

            // Añadir aqui las funciones para abrir las ventanas modales para los filtros
            $('#originDestinationButton')[0].onclick = this.openOriginDestinationModalWindow;
            $('#tamanyoButton')[0].onclick = this.openTamanyoModalWindow;

        },
        async makerObjectsEncargos(map) {
            await this.getPackages();
            await this.updateMap(this.packages, map);
        },
        async getPackages() {
            await axios
                .get("http://localhost:3300/api/encargo/estado", {})
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
            if (res.length > 0)
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

                        if (res.items[0] != null) {
                            var item = res.items[0];
                            let marker = new H.map.Marker(item.position)
                            marker.setData(item)
                            map.addObject(marker);
                            //let
                            marker.addEventListener('tap', () => {
                                var bubble = new H.ui.InfoBubble(item.position, {
                                    //read custom data
                                    content: "Cliente: ".bold().fontsize(5) + element.DNICliente.fontsize(3).fontcolor('#0055FF') +
                                        " Origen: ".bold().fontsize(5) + element.Origen.fontsize(3).fontcolor('#0055FF') +
                                        " Destino: ".bold().fontsize(5) + element.Destino.fontsize(3).fontcolor('#0055FF') +
                                        " Naturaleza: ".bold().fontsize(4) + element.NaturalezaEncargo.fontsize(3).fontcolor('#0055FF') +
                                        " Dimensiones: ".bold().fontsize(4) + element.Alto.toString().fontsize(3).fontcolor('#0055FF') +
                                        " x " + element.Ancho.toString().fontsize(3).fontcolor('#0055FF') +
                                        " x " + element.Largo.toString().fontsize(3).fontcolor('#0055FF') +
                                        "<button type='button' id='" + element.Id.toString() + "' class='btn btn-primary'>Reservar</button>"

                                });

                                this.ui.addBubble(bubble);
                                let dni = this.$cookies.get("loginToken").Dni;
                                let modal = () => {
                                    this.$bvModal.msgBoxOk('Su paquete ha sido reservado con éxito', {
                                        title: 'Confirmación',
                                        size: 'sm',
                                        buttonSize: 'sm',
                                        okVariant: 'info',
                                        headerClass: 'p-2 border-bottom-0',
                                        footerClass: 'p-2 border-top-0',
                                        centered: true
                                    }).then(value => {
                                        if (value) {
                                            map.removeObject(marker);
                                            this.ui.removeBubble(bubble);
                                        }
                                    })
                                };
                                $('#' + element.Id)[0].onclick = async function () {
                                    await axios.put('http://localhost:3300/api/encargo/reservar', {
                                            IdEncargo: element.Id,
                                            DNITransportista: dni
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
            else
                this.$bvModal.show("noPackagesInMap")
        },
        comprobarNumerosNegativosAltura() {
            var altura = document.getElementById("altura");
            if (altura.value < 0) {
                this.altoError = false;
                this.messageError = false;
                this.messageError2 = "El tamaño del paquete no puede ser un número negativo";
                return;
            } else if (altura.value === "") {
                this.altoError = false;
                this.messageError = false;
                this.messageError2 = "Tienes que completar todos los campos";
                return;
            }
            this.altoError = true;
            this.messageError = true;
        },
        comprobarNumerosNegativosAnchura() {
            var anchura = document.getElementById("anchura");
            if (anchura.value < 0) {
                this.anchoError = false;
                this.messageError = false;
                this.messageError2 = "El tamaño del paquete no puede ser un número negativo";
                return;
            } else if (anchura.value === "") {
                this.anchoError = false;
                this.messageError = false;
                this.messageError2 = "Tienes que completar todos los campos";
                return;
            }
            this.anchoError = true;
            this.messageError = true;
        },
        comprobarNumerosNegativosLargo() {
            var largo = document.getElementById("largo");
            if (largo.value < 0) {
                this.largoError = false;
                this.messageError = false;
                this.messageError2 = "El tamaño del paquete no puede ser un número negativo";
                return;
            } else if (largo.value === "") {
                this.largoError = false;
                this.messageError = false;
                this.messageError2 = "Tienes que completar todos los campos";
                return;
            }
            this.largoError = true;
            this.messageError = true;
        },
        async openTamanyoModalWindow() {
            if(!this.tamanyoFilter.isActive){
                 await this.$bvModal.show('modalTamanyoFilterDialog');
            }else{
                this.tamanyoFilter.isActive = false;
                this.changeButtonFilterTamanyo();
            }
           
        },
        changeButtonFilterTamanyo() {
            if (this.tamanyoFilter.isActive) {
                $('#tamanyoButton').addClass("btn-danger");
                $('#tamanyoButton').html('x Tamaño');
            } else {
                $('#tamanyoButton').removeClass("btn-danger");
                $('#tamanyoButton').html('Tamaño');
            }
        },
        async filterByTamanyo() {
            //let packagesFilterdByTamanyo = []

            axios.get('http://localhost:3300/api/encargo/tamanyo', {

                params: {
                    Alto: 2,
                    Ancho: 2,
                    Largo: 2,

                },

            }).then((response) => {

                if (response.status == 200) {
                    // console.log(packagesFilterdByTamanyo.push(response.data[0]));
                    //packagesFilterdByTamanyo.push(response.data[0]);
                    //this.updateMap(packagesFilterdByTamanyo,map)
                    this.tamanyoFilter.isActive = true;
                    this.changeButtonFilterTamanyo();
                    console.log(response.data);

                };

            }, (error) => {
                
                this.tamanyoFilter.isActive = true;
                this.changeButtonFilterTamanyo();
                console.log("No se ha podido conectar");
                console.log(error);

            });

        },

        async openOriginDestinationModalWindow() {
            if (!this.originDestinationFilter.isActive) {
                await this.$bvModal.show('modalOriginDestinationFilterDialog')
                this.filterByOriginDestination.placesAutocompleList = []

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
                    center: {
                        lat: 40.730610,
                        lng: -73.935242
                    }
                });
                var mapDestination = new H.Map(mapContainerDestination, maptypes.vector.normal.map, {
                    zoom: 7,
                    center: {
                        lat: 40.730610,
                        lng: -73.935242
                    }
                });

                window.addEventListener('resize', () => {
                    mapOrigin.getViewPort().resize();
                    mapDestination.getViewPort().resize();
                });

                $("#formControlRangeOrigin")[0].addEventListener('change', async () => {
                    await this.updateMapCircle(mapOrigin, originText.value,
                        $("#formControlRangeOrigin")[0].value, this.originDestinationFilter.origin.position, H)
                    this.originDestinationFilter.origin.radius = $("#formControlRangeOrigin")[0].value
                });
                $("#originForm").on('input', async () => {
                    await this.updateMapCircle(mapOrigin, originText.value,
                        $("#formControlRangeOrigin")[0].value, this.originDestinationFilter.origin.position, H)
                    this.originDestinationFilter.origin.radius = $("#formControlRangeOrigin")[0].value
                    this.originDestinationFilter.errorOrigin = null
                });
                originText.addEventListener('click', () => {
                    $("#mapOriginContainer")[0].hidden = false;
                    $("#mapDestinationContainer")[0].hidden = true
                });

                $("#formControlRangeDestination")[0].addEventListener('change', async () => {
                    await this.updateMapCircle(mapDestination, destinationText.value,
                        $("#formControlRangeDestination")[0].value, this.originDestinationFilter.destination.position, H)
                    this.originDestinationFilter.destination.radius = $("#formControlRangeDestination")[0].value
                });
                $("#destinationForm").on('input', async () => {
                    await this.updateMapCircle(mapDestination, destinationText.value,
                        $("#formControlRangeDestination")[0].value, this.originDestinationFilter.destination.position, H)
                    this.originDestinationFilter.destination.radius = $("#formControlRangeDestination")[0].value
                    this.originDestinationFilter.errorDestination = null
                });
                destinationText.addEventListener('click', () => {
                    $("#mapDestinationContainer")[0].hidden = false;
                    $("#mapOriginContainer")[0].hidden = true
                });

            } else {
                await this.makerObjectsEncargos(map);
                this.originDestinationFilter.isActive = false;
                this.originDestinationFilter.origin.position.lat = undefined;
                this.originDestinationFilter.origin.position.lng = undefined;
                this.originDestinationFilter.destination.position.lat = undefined;
                this.originDestinationFilter.destination.position.lng = undefined;
                this.changeButtonFilterOriginDestination();
            }
        },
        clickItemDropPlaces(address, isOrigin) {
            if (isOrigin) {
                $("#originForm")[0].value = address
                $("#originForm").trigger("input")
            } else {
                $("#destinationForm")[0].value = address
                $("#destinationForm").trigger("input")
            }
        },
        zoomNeeded(radio) {
            let percent = radio / 10000;
            if (percent <= 5 && percent > 3) return 7;
            else if (percent <= 3 && percent > 2) return 8;
            else if (percent <= 2 && percent > 1) return 9;
            else if (percent <= 1 && percent > 0.5) return 10;
            else if (percent <= 0.5 && percent > 0.25) return 11;
            else if (percent <= 0.25 && percent > 0.175) return 12;
            else return 13;
        },
        /* Returns the position of the circle, if it isnt a direction return undefined*/
        async updateMapCircle(map, direction, radio, dataPosition, H) {
            this.filterByOriginDestination.placesAutocompleList = []
            if (direction == undefined || direction.trim().length <= 3) return
            map.getViewPort().resize()
            map.removeObjects(map.getObjects())
            var service = this.platform.getSearchService();
            service.geocode({
                    q: direction
                }, (res) => {
                    if (res.items.length > 0) {

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
                        this.originDestinationFilter.placesAutocompleList = res.items;
                    }
                },
                (error) => {
                    console.log(error);
                })
        },
        /*Elimina aquellos paquetes que no cumplen el filtro de la lista this.packages*/
        async filterByOriginDestination(bvModalEvt) {
            if ($("#originForm")[0].value !== undefined && $("#originForm")[0].value.trim().length > 3 &&
                $("#destinationForm")[0].value !== undefined && $("#destinationForm")[0].value.trim().length > 3) {
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
                            if (res.items[0] != null) {
                                coordsPackage = new H.geo.Point(res.items[0].position.lat, res.items[0].position.lng);
                                var distance = coordsPackage.distance(coordsCircleOrigin)
                                if (distance <= this.originDestinationFilter.origin.radius) {
                                    filteredPackagesOrigin.push(packageItem);
                                }
                                if (index === array.length - 1) resolve(filteredPackagesOrigin);
                            }
                        })
                    })
                })
                promiseOrigin.then((filteredPackagesOrigin) => {
                    this.packages = filteredPackagesOrigin;
                    if (this.packages.length > 0 && this.originDestinationFilter.destination.position.lat != undefined) {

                        const coordsCircleDestination = new H.geo.Point(this.originDestinationFilter.destination.position.lat,
                            this.originDestinationFilter.destination.position.lng);

                        let coordsPackage;
                        let filteredPackagesOriginDestination = [];

                        this.packages.forEach((packageItem, index, array) => {
                            service.geocode({
                                q: packageItem.Destino
                            }, (res) => {

                                if (res.items[0] != null) {
                                    coordsPackage = new H.geo.Point(res.items[0].position.lat, res.items[0].position.lng);
                                    var distance = coordsPackage.distance(coordsCircleDestination)
                                    if (distance <= this.originDestinationFilter.destination.radius) {
                                        filteredPackagesOriginDestination.push(packageItem);
                                    }
                                    if (index === array.length - 1) {
                                        this.packages = filteredPackagesOriginDestination;
                                        this.updateMap(filteredPackagesOriginDestination, map)
                                        this.originDestinationFilter.isActive = true;
                                        this.changeButtonFilterOriginDestination();
                                    }
                                }
                            })
                        })
                    } else {
                        this.updateMap(filteredPackagesOrigin, map)
                        this.originDestinationFilter.isActive = true;
                        this.changeButtonFilterOriginDestination();
                    }
                });
            } else {
                await bvModalEvt.preventDefault();
                if ($("#originForm")[0].value == undefined || $("#originForm")[0].value.trim().length <= 3)
                    this.originDestinationFilter.errorOrigin = false;
                if ($("#destinationForm")[0].value == undefined || $("#destinationForm")[0].value.trim().length <= 3)
                    this.originDestinationFilter.errorDestination = false;
            }
        },
        changeButtonFilterOriginDestination() {
            if (this.originDestinationFilter.isActive) {
                $('#originDestinationButton').addClass("btn-danger");
                $('#originDestinationButton').html('x Origen-Destino');
            } else {
                $('#originDestinationButton').removeClass("btn-danger");
                $('#originDestinationButton').html('Origen-Destino');
            }
        },
        drawRoute(start, finish, map) {
            this.routingService.calculateRoute({
                    "mode": "fastest;car;traffic:enabled",
                    "waypoint0": `${start.lat},${start.lng}`,
                    "waypoint1": `${finish.lat},${finish.lng}`,
                    "representation": "display"
                },

                data => {
                    //console.log("Mostrando datos de CalculateRoute:");
                    //console.log(data);
                    if (data.response.route.length > 0) {
                        let lineString = new window.H.geo.LineString();
                        data.response.route[0].shape.forEach(point => {
                            let [lat, lng] = point.split(",");
                            lineString.pushPoint({
                                lat: lat,
                                lng: lng
                            });
                        });
                        let polyline = new window.H.map.Polyline(
                            lineString, {
                                style: {
                                    lineWidth: 5
                                }
                            }

                        );
                        map.addObject(polyline);
                        map.getViewModel().setLookAtData({
                            bounds: polyline.getBoundingBox()
                        });

                    }

                },

                error => {
                    console.error(error);
                }

            );

        },
        async addEncargosToList() {
            await this.getEncargos();
        },

        async getEncargos() {

            var respuesta = [];
            // var todas_respuestas = [];
            var service = this.platform.getSearchService();
            var coordOrigen;
            var coordDestino;

            await axios
                .get("http://localhost:3300/api/encargo/transportista", {
                    params: {
                        DNITransportista: this.personDNI,
                    },
                })
                .then(
                    (response) => {
                        respuesta = response.data[0];
                        /*console.log(todas_respuestas);

                         todas_respuestas.forEach(element => {
                          if (element.FechaEntrega == null){
                            //respuesta.push(element)
                            this.items.push(element);
                          }
                        });  */

                        console.log(respuesta);

                        if (respuesta != null) {
                            console.log("estoy aqui");
                            service.geocode({
                                q: respuesta[0].Origen
                            }, (res) => {
                                coordOrigen = res.items[0].position;
                                this.coordenadasEncargosPendientes[0].origen.lat = coordOrigen.lat;
                                this.coordenadasEncargosPendientes[0].origen.lng = coordOrigen.lng;

                                service.geocode({
                                    q: respuesta[0].Destino
                                }, (res) => {
                                    coordDestino = res.items[0].position;
                                    this.coordenadasEncargosPendientes[0].destino.lat = coordDestino.lat;
                                    this.coordenadasEncargosPendientes[0].destino.lng = coordDestino.lng;

                                    this.drawRoute({
                                            lat: this.coordenadasEncargosPendientes[0].origen.lat,
                                            lng: this.coordenadasEncargosPendientes[0].origen.lng
                                        }, {
                                            lat: this.coordenadasEncargosPendientes[0].destino.lat,
                                            lng: this.coordenadasEncargosPendientes[0].destino.lng
                                        },
                                        map
                                    );
                                })
                            })
                        }

                    },
                    (error) => {
                        console.log(error);
                    }
                );
        },

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
