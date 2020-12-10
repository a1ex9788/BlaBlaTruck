<template>
<div>
    <Sidebar />
    <div id="groupForm">
        <div class="container-fluid">
            <div class="row mt-2">
                <h4 id="groupTitle" class="mt-5" v-if="nonReservedPackages.length + ongoingPackages.length + endedPackages.length == 0">No se han encontrado envíos.</h4>
                <b-list-group id="groupTitle" >
                    <b-list-group-item v-for="item in nonReservedPackages" v-bind:key="item.id">
                        <b-row>
                            <b-col>
                                <div id="name"><strong>{{ getClientType() }}: </strong>{{ item.NombreCompleto }}</div>
                                <div class="mt-1"><strong>Origen: </strong>{{ item.Origen }}</div>
                                <div><strong>Destino: </strong>{{ item.Destino }}</div>
                                <div><strong>Fecha máxima de entrega: </strong>{{ modifyFormat(item.FechaMaximaEntrega, true) }}</div>
                                <div class="mt-1"><strong>Recogida: </strong>{{ modifyFormat(item.FechaRecogida, false) }}</div>
                                <div><strong>Entrega: </strong>{{ modifyFormat(item.FechaEntrega, false) }}</div>
                                <b-button v-bind:id="item.Id" @click="onEliminar" v-if="!isCarrierM() && !item.FechaRecogida " class="btn-danger mt-2">Eliminar encargo</b-button>
                            </b-col>
                            <b-col md="auto">
                                <div>
                                    <b-img center alt="" id="phote" src="../assets/nonReservedLogo.png"></b-img>
                                </div>
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                </b-list-group>
                <b-list-group class="mt-3" id="groupTitle" >
                    <b-list-group-item v-for="item in ongoingPackages" v-bind:key="item.id">
                        <b-row>
                            <b-col class="text-center">
                                <div id="name"><strong>{{ getClientType() }}: </strong>{{ item.NombreCompleto }}</div>
                                <div class="mt-1"><strong>Origen: </strong>{{ item.Origen }}</div>
                                <div><strong>Destino: </strong>{{ item.Destino }}</div>
                                <div><strong>Fecha máxima de entrega: </strong>{{ modifyFormat(item.FechaMaximaEntrega, true) }}</div>
                                <div class="mt-1"><strong>Recogida: </strong>{{ modifyFormat(item.FechaRecogida, false) }}</div>
                                <div><strong>Entrega: </strong>{{ modifyFormat(item.FechaEntrega, false) }}</div>
                                <b-button v-bind:id="item.Id" @click="onCancelButton" v-if="!item.FechaRecogida" class="btn-danger mt-2">Cancelar reserva</b-button>
                                <!-- Transportista -->
                                <b-button v-bind:id="item.Id" @click="onConfirmation" v-if="isCarrierM() &&item.FechaRecogida && !item.FechaEntrega" class="btn-success mt-2">Confirmar entrega</b-button>
                                <b-button v-bind:id="item.Id" @click="onRecogida" v-if="isCarrierM() &&!item.FechaRecogida && !item.FechaEntrega" class="btn-info mt-2 ml-2">Confirmar recogida</b-button>
                                <!-- Cliente -->
                                <b-button v-bind:id="item.Id" @click="onEliminar" v-if="!isCarrierM() && !item.FechaRecogida " class="btn-danger mt-2 mr-2 ml-2">Eliminar encargo</b-button>
                            </b-col>
                            <b-col md="auto">
                                <div>
                                    <b-img center alt="" id="phote" src="../assets/EnProceso.png"></b-img>
                                </div>
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                </b-list-group>
                <b-list-group class="mt-3" id="groupTitle" >
                    <b-list-group-item v-for="item in endedPackages" v-bind:key="item.id">
                        <b-row>
                            <b-col>
                                <div id="name"><strong>{{ getClientType() }}: </strong>{{ item.NombreCompleto }}</div>
                                <div class="mt-1"><strong>Origen: </strong>{{ item.Origen }}</div>
                                <div><strong>Destino: </strong>{{ item.Destino }}</div>
                                <div><strong>Fecha máxima de entrega: </strong>{{ modifyFormat(item.FechaMaximaEntrega, true) }}</div>
                                <div class="mt-1"><strong>Recogida: </strong>{{ modifyFormat(item.FechaRecogida, false) }}</div>
                                <div><strong>Entrega: </strong>{{ modifyFormat(item.FechaEntrega, false) }}</div>
                                <b-button v-bind:id="item.Id" @click="onAssessmentButton" v-if="!isCarrierM() && !item.ValoracionTiempoEntrega && item.ConfirmadoPorCliente" class="btn-info mt-2">Valorar transporte</b-button>
                                <b-button v-bind:id="item.Id" @click="onConfirmation" v-if="!isCarrierM() && item.FechaRecogida && item.FechaEntrega && !item.ConfirmadoPorCliente" class="btn-success mt-2">Confirmar entrega</b-button>
                            </b-col>
                            <b-col md="auto">
                                <div>
                                    <b-img center alt="" id="phote" src="../assets/Finalizado.png"></b-img>
                                </div>
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                </b-list-group>
                <b-modal @ok="saveCarrierAssessement" @cancel="cancelSaveAssessement" @show="resetTextAreaComentarios" id="carrierAssessmentDialog" title="Valorar el transporte">
                    <label><strong> Rapidez entrega </strong></label> <br>
                    <b-button @click="onStarImageClick" id="buttonStarImage" ><b-img id="starImage1" src="../assets/yellowStar.png"></b-img></b-button>
                    <b-button @click="onStarImageClick" id="buttonStarImage" class="ml-2"><b-img id="starImage2" src= "../assets/greyStar.png" ></b-img></b-button>
                    <b-button @click="onStarImageClick" id="buttonStarImage" class="ml-2"><b-img id="starImage3" src="../assets/greyStar.png" ></b-img></b-button>
                    <b-button @click="onStarImageClick" id="buttonStarImage" class="ml-2"><b-img id="starImage4" src="../assets/greyStar.png" ></b-img></b-button>
                    <b-button @click="onStarImageClick" id="buttonStarImage" class="ml-2"><b-img id="starImage5" src="../assets/greyStar.png" ></b-img></b-button>
                    <b-button id="buttonStarImageProva" class="ml-2"><b-img id="starImageGray" src="../assets/greyStar.png" ></b-img></b-button> <br>
                    <label class="mt-3"><strong> Estado paquete </strong></label> <br>
                    <b-button @click="onStarImageClickState" id="buttonStarImage" ><b-img id="starImage6" src="../assets/yellowStar.png"></b-img></b-button>
                    <b-button @click="onStarImageClickState" id="buttonStarImage" class="ml-2"><b-img id="starImage7" src= "../assets/greyStar.png" ></b-img></b-button>
                    <b-button @click="onStarImageClickState" id="buttonStarImage" class="ml-2"><b-img id="starImage8" src="../assets/greyStar.png" ></b-img></b-button>
                    <b-button @click="onStarImageClickState" id="buttonStarImage" class="ml-2"><b-img id="starImage9" src="../assets/greyStar.png" ></b-img></b-button>
                    <b-button @click="onStarImageClickState" id="buttonStarImage" class="ml-2"><b-img id="starImage10" src="../assets/greyStar.png" ></b-img></b-button> <br>
                    <label class="mt-3"><strong> Comentarios </strong></label> <br>
                    <b-form-textarea v-model="textAreaComentariosText" placeholder="Añadir comentarios" rows=4> </b-form-textarea> 
                </b-modal>    
            </div>
        </div>
    </div>
</div>
</template>

<script>
const axios = require("axios");
import Sidebar from "../components/Sidebar";

export default {
    name: "MyShipments",
    components: {
        Sidebar,
    },
    data() {
        return {
            nonReservedPackages: [],
            ongoingPackages: [],
            endedPackages: [],
            personDNI: undefined,
            isCarrier: undefined,
            textAreaComentariosText: "",
            currentShipmentId: undefined,
            refreshOnCancelAssessmentModal: undefined
        };
    },
    created() {
        this.personDNI = this.$cookies.get("loginToken").Dni;
        this.isCarrier = this.$cookies.get("loginToken").Type === "Transportista";

        // Pruebas manuales. Cuando se llame a este view será necesario pasar sus parámetros
        if (!this.personDNI) this.personDNI = "11111111r";
        if (!this.isCarrier) this.isCarrier = false;
        // if (!this.personDNI) this.personDNI = "12312312W";
        // if (!this.isCarrier) this.isCarrier = true;

        this.updateMyShipments();
    },
    methods: {
        onRecogida(event) 
        {
            this.$bvModal.msgBoxConfirm('¿Desea confirmar la recogida del paquete?',{
                title: 'Confirmación',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'success',
                okTitle:'Sí',
                cancelTitle: 'No',
                centered: true
            })
            .then((value) =>{
                if (value == true){     
                    const timeElapsed = Date.now();
                    const today = new Date(timeElapsed);

                    axios.put("http://localhost:3300/api/encargo/recoger",{
                            IdEncargo: event.target.id,
                            FechaRecogida: today
                    })
                    .then(() => {
                        this.$bvModal.msgBoxOk('Ha confirmado la recogida del paquete',{
                            title: 'Confirmación',
                            size: 'sm',
                            buttonSize: 'sm',
                            okVariant: 'info',
                            headerClass: 'p-2 border-bottom-0',
                            footerClass: 'p-2 border-top-0',
                            centered: true
                        })
                        .then(() => {
                            if (!this.isCarrier) this.$bvModal.show('carrierAssessmentDialog')
                            else window.location.reload()
                        })
                    }),
                    (error) => {
                        console.log(error);
                    }
                }
            })
            .catch(err => {
                console.log("error al confirmar"+ err);
            });  
        },
        isCarrierM()
        {
            return this.isCarrier
        },

        getClientType()
        {
            if (this.isCarrier) return "Cliente";
            else return "Transportista";
        },

        modifyFormat(dateTime, isFechaMax)
        {
            if (dateTime) { return dateTime.substring(0, 10) }
            else if (!isFechaMax)  return "Pendiente" 
            else return "No tiene fecha máxima"
        },

        async updateMyShipments() {
            var historical = await this.getMyShipments();
            historical.forEach(element => {
                if (element.FechaEntrega) this.endedPackages.push(element)
                else if (element.NombreCompleto == "Por reservar") this.nonReservedPackages.push(element)
                else this.ongoingPackages.push(element)
            });
        },

        async getMyShipments() {
            var res;

            if (this.isCarrier) {
                await axios
                .get("http://localhost:3300/api/encargo/transportista", {
                    params: {
                        DNITransportista: this.personDNI,
                    },
                })
                .then(
                    (response) => {
                        res = response.data[0];
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            } else {
                await axios
                .get("http://localhost:3300/api/encargo/cliente", {
                    params: {
                        DNICliente: this.personDNI,
                    },
                })
                .then(
                    (response) => {
                        res = response.data[0];
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
            
            return res
        },
        async onStarImageClick(event){
            var srcYellowStar = starImage1.src
            var srcGrayStar = starImageGray.src
            if(event.target.src != srcYellowStar){
                switch(event.target.id){
                    case "starImage2":
                        event.target.src = srcYellowStar
                        break;
                    case "starImage3":
                        starImage2.src = srcYellowStar
                        event.target.src = srcYellowStar
                        break;
                    case "starImage4":
                        starImage2.src = srcYellowStar
                        starImage3.src = srcYellowStar
                        event.target.src = srcYellowStar
                        break;
                    case "starImage5":
                        starImage2.src = srcYellowStar
                        starImage3.src = srcYellowStar
                        starImage4.src = srcYellowStar
                        event.target.src = srcYellowStar
                        break;
                    default:
                        break;
                }
            } else {
                switch(event.target.id){
                    case "starImage1":
                        starImage2.src = srcGrayStar
                        starImage3.src = srcGrayStar
                        starImage4.src = srcGrayStar
                        starImage5.src = srcGrayStar
                        break;
                    case "starImage2":
                        starImage3.src = srcGrayStar
                        starImage4.src = srcGrayStar
                        starImage5.src = srcGrayStar
                        break;
                    case "starImage3":
                        starImage4.src = srcGrayStar
                        starImage5.src = srcGrayStar
                        break;
                    case "starImage4":
                        starImage5.src = srcGrayStar
                        break;
                    default:
                        break;
                }
            }
        },

        async onStarImageClickState(event){
            var srcYellowStar = starImage1.src
            var srcGrayStar = starImageGray.src
            if(event.target.src != srcYellowStar){
                switch(event.target.id){
                    case "starImage7":
                        event.target.src = srcYellowStar
                        break;
                    case "starImage8":
                        starImage7.src = srcYellowStar
                        event.target.src = srcYellowStar
                        break;
                    case "starImage9":
                        starImage7.src = srcYellowStar
                        starImage8.src = srcYellowStar
                        event.target.src = srcYellowStar
                        break;
                    case "starImage10":
                        starImage7.src = srcYellowStar
                        starImage8.src = srcYellowStar
                        starImage9.src = srcYellowStar
                        event.target.src = srcYellowStar
                        break;
                    default:
                        break;
                }
            } else {
                switch(event.target.id){
                    case "starImage6":
                        starImage7.src = srcGrayStar
                        starImage8.src = srcGrayStar
                        starImage9.src = srcGrayStar
                        starImage10.src = srcGrayStar
                        break;
                    case "starImage7":
                        starImage8.src = srcGrayStar
                        starImage9.src = srcGrayStar
                        starImage10.src = srcGrayStar
                        break;
                    case "starImage8":
                        starImage9.src = srcGrayStar
                        starImage10.src = srcGrayStar
                        break;
                    case "starImage9":
                        starImage10.src = srcGrayStar
                        break;
                    default:
                        break;
                }
            }
        },

        getStarsSpeed(){
            var srcYellowStar = starImage1.src
            if (starImage5.src == srcYellowStar) return 5;
            if (starImage4.src == srcYellowStar) return 4;
            if (starImage3.src == srcYellowStar) return 3;
            if (starImage2.src == srcYellowStar) return 2;
            return 1;
        },
        getStarsState(){
            var srcYellowStar = starImage1.src
            if (starImage10.src == srcYellowStar) return 5;
            if (starImage9.src == srcYellowStar) return 4;
            if (starImage8.src == srcYellowStar) return 3;
            if (starImage7.src == srcYellowStar) return 2;
            return 1;
        },
        async saveCarrierAssessement(){
            axios.put("http://localhost:3300/api/encargo/valorar",{
                params: {
                    IdEncargo: this.currentShipmentId,
                    ValoracionTiempo: this.getStarsSpeed(),
                    ValoracionEstado: this.getStarsState(),
                    Comentarios: this.textAreaComentariosText
                }
            })
            .then(() => {
                this.$bvModal.msgBoxOk('¡Muchas gracias por su valoración!',{
                    title: 'Confirmación',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'info',
                    headerClass: 'p-2 border-bottom-0',
                    footerClass: 'p-2 border-top-0',
                    centered: true
            })
            .then(() => window.location.reload())
            })
        },

        cancelSaveAssessement()
        {
            if(this.refreshOnCancelAssessmentModal) window.location.reload()
        },

        resetTextAreaComentarios()
        {
            this.textAreaComentariosText = ""
        },

        async onConfirmation(event){
            this.$bvModal.msgBoxConfirm('¿Desea confirmar la entrega?',{
                title: 'Confirmación',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'success',
                okTitle:'Sí',
                cancelTitle: 'No',
                centered: true
            })
            .then((value) =>{
                if (value == true){     
                    const timeElapsed = Date.now();
                    const today = new Date(timeElapsed);

                    this.refreshOnCancelAssessmentModal = true;
                    this.currentShipmentId = event.target.id;

                    axios.put("http://localhost:3300/api/encargo/entregar",{
                        params: {
                            IdEncargo: this.currentShipmentId,
                            FechaEntrega: today,
                            EsCliente: !this.isCarrier
                        }
                    })
                    .then(() => {
                        this.$bvModal.msgBoxOk('Ha confirmado su entrega',{
                            title: 'Confirmación',
                            size: 'sm',
                            buttonSize: 'sm',
                            okVariant: 'info',
                            headerClass: 'p-2 border-bottom-0',
                            footerClass: 'p-2 border-top-0',
                            centered: true
                        })
                        .then(() => {
                            if (!this.isCarrier) this.$bvModal.show('carrierAssessmentDialog')
                            else window.location.reload()
                        })
                    }),
                    (error) => {
                        console.log(error);
                    }
                }
            })
            .catch(err => {
                console.log("error al confirmar"+ err);
            });  
        },

        async onEliminar(event){
            this.$bvModal.msgBoxConfirm('¿Desea eliminar el encargo?',{
                title: 'Confirmación',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle:'Sí',
                cancelTitle: 'No',
                centered: true
            })
            .then((value) =>{
                if (value == true){     
                    this.currentShipmentId = event.target.id;

                    //cambiar esto
                    axios.delete("http://localhost:3300/api/encargo/" + event.target.id)
                    .then(() => {
                        this.$bvModal.msgBoxOk('Ha eliminado su encargo',{
                            title: 'Confirmación',
                            size: 'sm',
                            buttonSize: 'sm',
                            okVariant: 'info',
                            headerClass: 'p-2 border-bottom-0',
                            footerClass: 'p-2 border-top-0',
                            centered: true
                        })
                        .then(() => {
                            window.location.reload()
                        })
                    }),
                    (error) => {
                        console.log(error);
                    }
                }
            })
            .catch(err => {
                console.log("error al eliminar su encargo"+ err);
            });  
        },

        async onCancelButton(event) {
            this.$bvModal.msgBoxConfirm('¿Está seguro que quiere cancelar la reserva?', {
            title: 'Confirmación',
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'danger',
            okTitle: 'Sí',
            cancelTitle: 'No',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
            })
            .then((value) =>{
                if(value == true){
                    axios.put("http://localhost:3300/api/encargo/anular",{
                        params: {
                            IdEncargo: event.target.id
                        }
                    })
                    .then(() => {
                        this.$bvModal.msgBoxOk('Su reserva ha sido anulada con éxito',{
                                title: 'Confirmación',
                                size: 'sm',
                                buttonSize: 'sm',
                                okVariant: 'info',
                                headerClass: 'p-2 border-bottom-0',
                                footerClass: 'p-2 border-top-0',
                                centered: true
                              }).then(value => {
                                if(value) window.location.reload()
                              })
                    });
                }
            })
            .catch(err => {
                console.log("error al cancelar"+ err);
            });


            // if(confirm("Esta seguro de cancelar la reserva?")){
            //     axios.put("http://localhost:3300/api/encargo/anular",{
            //         params: {
            //             IdEncargo: event.target.id
            //         }
            //     });
            // }
        },

        onAssessmentButton(event){
            this.refreshOnCancelAssessmentModal = false
            this.currentShipmentId = event.target.id;
            this.$bvModal.show('carrierAssessmentDialog')
        }
    }
    
};
</script>

<style>
#groupForm {
    max-width: 800px;
    margin: 0 auto;
}

#groupTitle {
    max-width: 800px;
    min-width: 800px;
    text-align: center;
}

#phote {
    width: 80px;
}

#name{
    font-size: 120%;
}
.text-center {
  text-align: center;
}

#starImage1{
    max-width: 35px;
    max-height: 35px;
}
#starImage2{
    max-width: 35px;
    max-height: 35px;
}
#starImage3{
    max-width: 35px;
    max-height: 35px;
}
#starImage4{
    max-width: 35px;
    max-height: 35px;
}
#starImage5{
    max-width: 35px;
    max-height: 35px;
}
#starImage6{
    max-width: 35px;
    max-height: 35px;
}
#starImage7{
    max-width: 35px;
    max-height: 35px;
}
#starImage8{
    max-width: 35px;
    max-height: 35px;
}
#starImage9{
    max-width: 35px;
    max-height: 35px;
}
#starImage10{
    max-width: 35px;
    max-height: 35px;
}
#buttonStarImageProva{
    visibility: hidden;
    max-width: 0px;
    max-height: 0px;
}
#buttonStarImage{
    background-color: #fff;
    border-color: #fff;
}
</style>
