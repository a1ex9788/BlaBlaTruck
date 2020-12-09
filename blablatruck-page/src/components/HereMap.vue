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
    <b-modal id="modalTamanyoFilterDialog" @ok="filterByTamanyo" @show="resetModalTamanyo" title="Filtrar por el tamaño del paquete">
        <!--<b-form-invalid-feedback :state="messageError">El tamaño del paquete no puede ser un número negativo</b-form-invalid-feedback>-->
        <b-alert show variant="danger" :hidden="messageError">El tamaño del paquete no puede ser un número negativo</b-alert>
        <b-form inline class="ml-10" style="width-: 25">
            <b-form-input id="altura" class="mr-2" placeholder="alto" max="300" min="0" pattern="^[0-9]+" type="number" :state="altoError" @input="comprobarTamanyoAltura"></b-form-input>
            <label class="mr-2">x</label>
            <b-form-input id="anchura" class="mr-2 " placeholder="ancho" max="240" min="0" type="number" :state="anchoError" @input="comprobarTamanyoAnchura"></b-form-input>
            <label class="mr-2">x</label>
            <b-form-input id="largo" class="ml-2" placeholder="largo" max="1400" min="0" type="number" :state="largoError" @input="comprobarTamanyoLargo"></b-form-input>
            <label class="ml-2">(cm)</label>
        </b-form>
    </b-modal>
    <b-modal id="modalNatureFilterDialog" @ok="filterByNature" @show="resetModalNature" title="Filtrar por la naturaleza del paquete">
        <b-form-group id="input-group-Naturaleza" label="Naturaleza:" label-for="input-Naturaleza">
            <b-form-select id="input-Naturaleza" v-model="natureFilter.nature" :options="optionsNaturaleza" :state="natureError" v-on:input="comprobarNaturaleza"></b-form-select>
        </b-form-group>
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
const filterCapacity = require("../scripts/filterUtility.js")

export default {
    name: "HereMap",
    props: {
        center: Object
        // center object { lat: 40.730610, lng: -73.935242 }
    },
    data() {
        return {
            isStarted: false,
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
            tamanyoFilter: {
                isActive: false,
                altura: undefined,
                anchura: undefined,
                largo: undefined
            },
            mejorRuta:{
                isActive: false,
            },
            natureFilter: {
                isActive: false,
                nature: null
            },
            optionsNaturaleza: [
                {
                    value: null,
                    text: "Selecciona una opción"
                },
                {
                    value: "Frágil",
                    text: "Frágil"
                },
                {
                    value: "Congelado",
                    text: "Congelado"
                },
                {
                    value: "Normal",
                    text: "Normal"
                }
            ],
            natureError: undefined,
            altoError: true,
            anchoError: true,
            largoError: true,
            messageError: true,
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
            actualLocation:{
                longitude: undefined,
                latitude: undefined
            },
            respuesta: []
        }
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
        this.añadirEncargosARespuesta();
        this.$nextTick(function (map) {
            window.setInterval((map) => {
               this.getTrackingLocation(map);
               var now = new Date();
               console.log("Ubicación real actualizada: " + now.toUTCString());
            },5000);
        });
        
        this.$nextTick(function () {
            window.setInterval(() => {
                this.reloadEncargos();
            },30000);
        }); 
        
        this.isStarted = true;
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
                    '<button class="btn" id="originDestinationButton">Origen-Destino</button><br>' +
                    '<button class="btn" id="tamanyoButton">Tamaño</button><br>' +
                    '<button class="btn" id="natureButton">Naturaleza</button>';
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
            $('#natureButton')[0].onclick = this.openNatureModalWindow;


            // Add Ruta button
            let controlRuta = new H.ui.Control();
            
            var buttonRuta = new H.ui.base.Button({
                label: '<img src="http://localhost:8080/rutaIcon.png" fuild width="20 px" heigth="20 px" class="filterButton"/>',
                onStateChange: function () {
                    if (buttonRuta.getState() == "down") {
                        overlayRutaPanel.pointToControl(controlRuta);
                        overlayRutaPanel.setState(overlayRutaPanel.getState() === "open" ? "close" : "open");
                    }
                }
            });

            let overlayRutaPanel = new H.ui.base.OverlayPanel();
            overlayRutaPanel.renderInternal = function (el) {
                /* Añadir aquí todos los botones que accederán las opciones de las rutas*/
                el.innerHTML = "<p class='mt-2 h4'>Rutas hasta tu destino:</p>" +
                    '<button class="btn" id="mejorRutaButton">Mejor ruta</button><br>';
                el.style.color = "black"
            };

            // Añadiendo el boton embudo y el overlay de la opcion de rutas a ui del map
            controlRuta.addChild(buttonRuta);
            controlRuta.addChild(overlayRutaPanel);
            controlRuta.setAlignment('right-top');
            this.ui.addControl('Rutas', controlRuta);

            // Añadir aqui las funciones para ejecutar las opciones de ruta
            $('#mejorRutaButton')[0].onclick = this.setMejorRuta;

        },
        async makerObjectsEncargos(map) {
            await this.getPackages();
            await this.filterBy();
            await this.updateMap(this.packages, map);
        },

        async setMejorRuta(){
           this.changeButtonFilter(this.mejorRuta,"mejorRutaButton","Mejor Ruta");

        },
        async filterBy() {
            if (this.originDestinationFilter.isActive)
            {
                this.filterByOriginDestination();
            }
            if (this.tamanyoFilter.isActive)
            {
                this.filterByTamanyo();
            }
            if (this.natureFilter.isActive)
            {
                this.filterByNature();
            }
        },
        async getPackages() {
            await axios
                .get("http://localhost:3300/api/encargo/estado", {})
                .then(
                    (response) => {
                        if (response.data[0] != undefined) this.packages = response.data[0];
                        console.log(response.data[0])
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

            if (res != undefined && res.length > 0 && this.$cookies.get("loginToken").Type == 'Transportista'){
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
                                    content: "Cliente: ".bold().fontsize(5) + "<br>" + element.DNICliente.fontsize(3).fontcolor('#0055FF') + "<br>" +
                                        " Origen: ".bold().fontsize(5) + "<br>" + element.Origen.fontsize(3).fontcolor('#0055FF') + "<br>" +
                                        " Destino: ".bold().fontsize(5) + "<br>" + element.Destino.fontsize(3).fontcolor('#0055FF') + "<br>" +
                                        " Fecha máx.: ".bold().fontsize(4) + "<br>" + this.modifyFormat(element.FechaMaximaEntrega).fontsize(3).fontcolor('#0055FF') + "<br>" +
                                        " Naturaleza: ".bold().fontsize(4) + "<br>" + element.NaturalezaEncargo.fontsize(3).fontcolor('#0055FF') + "<br>" +
                                        " Dimensiones: ".bold().fontsize(4) + "<br>" + element.Alto.toString().fontsize(3).fontcolor('#0055FF') + 
                                        " x " + element.Ancho.toString().fontsize(3).fontcolor('#0055FF') +
                                        " x " + element.Largo.toString().fontsize(3).fontcolor('#0055FF') +
                                        "<button type='button' id='" + element.Id.toString() + "' class='btn btn-primary mt-2'>Reservar</button>"

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
                                            window.location.reload()
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
                }
            else if(this.$cookies.get("loginToken").Type == 'Transportista')
                    this.$bvModal.show("noPackagesInMap")
           // this.añadirEncargosARespuesta()      
        },

        comprobarTamanyoAltura() {

            var altura = document.getElementById("altura");
            if (altura.value < 0) {
                this.altoError = false;
                this.messageError = false;
                return;
            } else if (altura.value === "") {
                this.altoError = false;
                this.messageError = true;
                return;
            } else if (altura.value % 1 !== 0) {
                this.altoError = false;
                this.messageError = true;
                return;
            }

            this.altoError = true;
            this.messageError = true;
        },
        comprobarTamanyoAnchura() {

            var anchura = document.getElementById("anchura");

            if (anchura.value < 0) {
                this.anchoError = false;
                this.messageError = false;
                return;
            } else if (anchura.value === "") {
                this.anchoError = false;
                this.messageError = true;
                return;
            } else if (anchura.value % 1 !== 0) {
                this.anchoError = false;
                this.messageError = true;
                return;
            }

            this.anchoError = true;
            this.messageError = true;
        },
        comprobarTamanyoLargo() {

            var largo = document.getElementById("largo");
            if (largo.value < 0) {
                this.largoError = false;
                this.messageError = false;
                return;
            } else if (largo.value === "") {
                this.largoError = false;
                this.messageError = true;
                return;
            } else if (largo.value % 1 !== 0) {
                this.largoError = false;
                this.messageError = true;
                return;
            }

            this.largoError = true;
            this.messageError = true;
        },

        comprobarNaturaleza(){
            var naturaleza = document.getElementById("input-Naturaleza");
            if (naturaleza.value === '') {
                this.natureError = false;
                this.messageError = false;
            } else {              
                this.natureError = true;
                this.messageError = true;
            }

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

                this.originDestinationFilter.isActive = false;
                this.originDestinationFilter.origin.position.lat = undefined;
                this.originDestinationFilter.origin.position.lng = undefined;
                this.originDestinationFilter.destination.position.lat = undefined;
                this.originDestinationFilter.destination.position.lng = undefined;
                this.changeButtonFilter(this.originDestinationFilter, "originDestinationButton", "Origen-Destino");
                await this.makerObjectsEncargos(map);
                this.añadirEncargosARespuesta()
            }
        },
        async openTamanyoModalWindow() {

            if (!this.tamanyoFilter.isActive) {

                await this.$bvModal.show('modalTamanyoFilterDialog');
                $("#altura")[0].addEventListener("input", (evento) => {
                    this.tamanyoFilter.altura = document.getElementById("altura").value;

                });
                $("#anchura")[0].addEventListener("input", () => {
                    this.tamanyoFilter.anchura = document.getElementById("anchura").value;
                });
                $("#largo")[0].addEventListener("input", () => {
                    this.tamanyoFilter.largo = document.getElementById("largo").value;
                });

            } else {

                this.tamanyoFilter.isActive = false;
                this.changeButtonFilter(this.tamanyoFilter, 'tamanyoButton', 'Tamaño');
                await this.makerObjectsEncargos(map);
                this.añadirEncargosARespuesta()
            }
        },
        async openNatureModalWindow() {
           
            if (!this.natureFilter.isActive) {
                await this.$bvModal.show('modalNatureFilterDialog');

                $("#input-Naturaleza")[0].addEventListener("change",()=> {
                    this.natureFilter.nature = document.getElementById("input-Naturaleza");
                }
                );
            } else {
                this.natureFilter.isActive = false;
                this.changeButtonFilter(this.natureFilter, 'natureButton', 'Naturaleza');
                await this.makerObjectsEncargos(map);
                this.añadirEncargosARespuesta()
            }
        },
        resetModalTamanyo() {
            this.tamanyoFilter.altura = null;
            this.tamanyoFilter.anchura = null;
            this.tamanyoFilter.largo = null;

            this.altoError = null;
            this.anchoError = null;
            this.largoError = null;
            this.messageError = true;
        },
        resetModalNature() {
            this.natureFilter.nature = null;

            this.natureError = null;
            this.messageError = true;
        },
        comprobarTamanyoVacios() {

            if (this.tamanyoFilter.altura === null) {
                this.altoError = false;
            }
            if (this.tamanyoFilter.anchura === null) {
                this.anchoError = false;
            }
            if (this.tamanyoFilter.largo === null) {
                this.largoError = false;
            }
            return;
        },
        comprobarDecimales() {
            if (this.tamanyoFilter.altura % 1 !== 0) {
                this.altoError = false;
            }
            if (this.tamanyoFilter.anchura % 1 !== 0) {
                this.anchoError = false;
            }
            if (this.tamanyoFilter.largo % 1 !== 0) {
                this.largoError = false;
            }
            return;
        },
        async filterByTamanyo(bvModalEvt) {

            if (this.altoError && this.anchoError && this.largoError) {
                /**comprobacion de valores con mensajes console.log()*/
                /*
                console.log("Se han comprobado todas las medidas del tamaño y son correctas");
                console.log("Los valores son:");
                console.log("Altura: " + this.tamanyoFilter.altura);
                console.log("Anchura: " + this.tamanyoFilter.anchura);
                console.log("Largo: " + this.tamanyoFilter.largo);*/

                let promiseTamanyo = new Promise((resolve) => {

                    let filteredPackagesTamanyo = [];
                    /*if (this.packages != null && this.packages.length > 0) {
                        for (let i = 0; i < this.packages.length; i++) {
                            if (this.packages[i].Alto <= this.tamanyoFilter.altura &&
                                this.packages[i].Ancho <= this.tamanyoFilter.anchura &&
                                this.packages[i].Largo <= this.tamanyoFilter.largo) {

                                filteredPackagesTamanyo.push(this.packages[i]);
                            }
                        }
                        resolve(filteredPackagesTamanyo);

                    };*/
                    filteredPackagesTamanyo = filterCapacity(this.packages, this.tamanyoFilter);
                    resolve(filteredPackagesTamanyo);
                });

                promiseTamanyo.then((filteredPackagesTamanyo) => {
                    this.packages = filteredPackagesTamanyo;
                    this.updateMap(this.packages, map);

                });
                this.tamanyoFilter.isActive = true;
                this.changeButtonFilter(this.tamanyoFilter, 'tamanyoButton', 'Tamaño');
            } else {
                await bvModalEvt.preventDefault();
                this.comprobarTamanyoVacios();
                this.comprobarDecimales();
                this.changeButtonFilter(this.tamanyoFilter, 'tamanyoButton', 'Tamaño');
            }
            this.añadirEncargosARespuesta()
        },
        async filterByNature(bvModalEvt)
        {
            /*
            var naturaleza = document.getElementById("input-Naturaleza");

            if (naturaleza.value === '') {
                this.natureError = false;
                this.messageError = false;
            }
             */

            if (this.natureFilter.nature === null) {
                //console.log(this.natureFilter.nature);
                this.natureError = false;
                this.messageError = false;
            }

            if (this.natureError){               
                let promiseNature = new Promise((resolve) => {

                    let filteredPackagesNature = [];
                    if (this.packages != null && this.packages.length > 0) {
                        for (let i = 0; i < this.packages.length; i++) {
                            if (this.packages[i].NaturalezaEncargo == this.natureFilter.nature) {

                                filteredPackagesNature.push(this.packages[i]);
                            }
                        }
                        resolve(filteredPackagesNature);
                    };
                });

                promiseNature.then((filteredPackagesNature) => {
                    this.packages = filteredPackagesNature;
                    this.updateMap(this.packages, map);

                });
                this.natureFilter.isActive = true;
                this.changeButtonFilter(this.natureFilter, 'natureButton', 'Naturaleza');

            } else {
                await bvModalEvt.preventDefault();
                //this.comprobarTamanyoVacios();
                //this.comprobarDecimales();
                this.changeButtonFilter(this.natureFilter, 'natureButton', 'Naturaleza');
            }
            this.añadirEncargosARespuesta()
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
            //console.log($("#originForm"));
            //if($("#originForm")[0] != undefined)
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
                                    if (index === array.length - 1 ) {
                                        this.packages = filteredPackagesOriginDestination;
                                        this.updateMap(filteredPackagesOriginDestination, map)
                                        this.originDestinationFilter.isActive = true;
                                        this.changeButtonFilter(this.originDestinationFilter, 'originDestinationButton', 'Origen-Destino');
                                    }
                                }
                            })
                        })
                    } else {
                        this.updateMap(filteredPackagesOrigin, map)
                        this.originDestinationFilter.isActive = true;
                        this.changeButtonFilter(this.originDestinationFilter, 'originDestinationButton', 'Origen-Destino');
                    }
                });
            } else {
                await bvModalEvt.preventDefault();
                if ($("#originForm")[0].value == undefined || $("#originForm")[0].value.trim().length <= 3)
                    this.originDestinationFilter.errorOrigin = false;
                if ($("#destinationForm")[0].value == undefined || $("#destinationForm")[0].value.trim().length <= 3)
                    this.originDestinationFilter.errorDestination = false;
            }
            this.añadirEncargosARespuesta()
        },
        changeButtonFilter(filter, buttonName, buttonText) {
            let button = '#' + buttonName

            if (filter.isActive) {
                $(button).addClass("btn-danger");
                $(button).html('x ' + buttonText);
            } else {
                $(button).removeClass("btn-danger");
                $(button).html(buttonText);
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
                        //Saltaba un error y molestaba al actualizar la página
                      /*  map.getViewModel().setLookAtData({
                            bounds: polyline.getBoundingBox()
                        }); */
                      
                    }
                     //map.setCenter({lat:this.actualLocation.latitude, lng:this.actualLocation.longitude}); //Saltaba un error y molestaba al actualizar la página
                     //console.log("Centrado en la ubicación actual:"+this.actualLocation.latitude + ", " + this.actualLocation.longitude);
                },

                error => {
                    console.error(error);
                }

            );

        },

        async getEncargos() {
            var todas_respuestas = [];
            await axios
                .get("http://localhost:3300/api/encargo/transportista", {
                    params: {
                        DNITransportista: this.personDNI,
                    },
                })
                .then(
                    (response) => {
                        if (response.data[0] != undefined) todas_respuestas = response.data[0];
                    },
                    (error) => {
                        console.log(error);
                    }
                );
                
                return todas_respuestas;
        },
        async añadirEncargosARespuesta(){
            var todas_respuestas = await this.getEncargos();
            todas_respuestas.forEach(element => {
                if (!element.FechaEntrega && element.NombreCompleto != "Por reservar") {
                    this.respuesta.push(element);
                    }
            });
            this.dibujarRuta();
        },
        dibujarRuta(){
        var service = this.platform.getSearchService();
        var coordOrigen;
        var coordDestino;
        if (this.respuesta.length != 0) {
                service.geocode({
                     q: this.respuesta[0].Origen
                }, (res) => {
                        coordOrigen = res.items[0].position;
                        this.coordenadasEncargosPendientes[0].origen.lat = coordOrigen.lat;
                        this.coordenadasEncargosPendientes[0].origen.lng = coordOrigen.lng;

                        service.geocode({
                             q: this.respuesta[0].Destino
                        }, (res) => {
                            coordDestino = res.items[0].position;
                            this.coordenadasEncargosPendientes[0].destino.lat = coordDestino.lat;
                            this.coordenadasEncargosPendientes[0].destino.lng = coordDestino.lng;

                            var svgMarkup = '<svg width="18" height="18" ' +
                                        'xmlns="http://www.w3.org/2000/svg">' +
                                        '<circle cx="8" cy="8" r="8" ' +
                                        'fill="green" stroke="black" stroke-width="2"  />' +
                                        '</svg>'; 
                                   
                            var customIcon = new H.map.Icon(svgMarkup);
                                    //var customIcon = new H.map.Icon("..\assets\Destino.png"); //No funciona por ruta :(                               
                            var customMarker = new H.map.Marker({
                                    lat: this.coordenadasEncargosPendientes[0].origen.lat,
                                    lng: this.coordenadasEncargosPendientes[0].origen.lng
                            }, {icon: customIcon});

                            map.addObject(customMarker);
                                    
                            var svgMarkup2 = '<svg width="18" height="18" ' +
                                        'xmlns="http://www.w3.org/2000/svg">' +
                                        '<circle cx="8" cy="8" r="8" ' +
                                        'fill="red" stroke="black" stroke-width="2"  />' +
                                        '</svg>'; 

                            var customIcon2 = new H.map.Icon(svgMarkup2.replace('${FILL}', 'blue').replace('${STROKE}', 'red'));

                            var customMarker2 = new H.map.Marker({
                                    lat: this.coordenadasEncargosPendientes[0].destino.lat,
                                    lng: this.coordenadasEncargosPendientes[0].destino.lng
                            }, {icon: customIcon2});

                            map.addObject(customMarker2);

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
        modifyFormat(dateTime) {
            if (dateTime) {
                return dateTime.substring(0, 10)
            } else return "No hay"
        },

        getTrackingLocation(map) {
            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };
        
         if (navigator.geolocation){
             navigator.geolocation.getCurrentPosition(this.successFindLocation, this.errorFindLocation, options);
             }
         else{
             alert("Geolocation is not supported by this browser");
             console.log("Geolocation is not supported by this browser");
             }
  
        },

        successFindLocation(pos) {
            const url = "https://cdn0.iconfinder.com/data/icons/pinpoint-interface/48/address-shipping-512.png"
            var pngIcon = new H.map.Icon(url, {size: {w: 40, h: 40}});
            let userCookie = this.$cookies.get("loginToken");
            if(userCookie.Type == 'Transportista'){
                //console.log(userCookie);
                var crd = pos.coords;
                //console.log('Tu posición actual es: ');
                //console.log('Latitude : ' + crd.latitude);
                this.actualLocation.latitude = crd.latitude
                //console.log('Longitude: ' + crd.longitude);
                this.actualLocation.longitude = crd.longitude;
                //console.log('Error de estimación: ' + crd.accuracy + ' metros.');
                let dni = userCookie.Dni;
                if(dni != undefined && this.isStarted){
                    axios.put('http://localhost:3300/api/transportista' , {
                        DNI: dni,
                        Altitud: crd.longitude,
                        Latitud: crd.latitude
            })}
            var locationMarker = new H.map.Marker (
                new H.geo.Point(
                    this.actualLocation.latitude, this.actualLocation.longitude),
                    {
                    icon: pngIcon
                    }
                );
                map.addObject(locationMarker);
            }
            else { 
                // si el usuario es cliente en vez de coger la info del dispositivo recogeremos la info de la bd del transportista
                let dni = userCookie.Dni;
                let url = 'http://localhost:3300/api/cliente/' + dni + '/coords';
                axios
                .get(url)
                .then(
                    (response) => {
                        let coordsTransportistas = response.data[0];
                        if(coordsTransportistas != undefined){
                        coordsTransportistas.forEach(element => {
                            this.actualLocation.latitude = element.Latitud;
                            this.actualLocation.longitude = element.Altitud;
                            var locationMarker = new H.map.Marker (
                            new H.geo.Point(
                                this.actualLocation.latitude, this.actualLocation.longitude),
                                {
                                icon: pngIcon
                                }
                            );
                            map.addObject(locationMarker);
                        });}

                    },
                    (error) => {
                        console.log(error);
                    }
                );

            }
         
         
         
        //console.log("icono añadido");
        },

        errorFindLocation(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
        alert("Ha habido un error en encontrar su localización");
        },

        async reloadEncargos(){
            await this.makerObjectsEncargos(map);
            this.añadirEncargosARespuesta()
            this.getTrackingLocation(map);
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
