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
                                <b-button v-bind:id="item.Id" @click="onCancelButton" v-if="!item.FechaRecogida" class="btn-danger mt-2">Cancelar</b-button>
                                <b-button v-bind:id="item.Id" @click="onConfirmation" v-if="item.FechaRecogida && !item.FechaEntrega" class="btn-success">Confirmar entrega</b-button>
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
                            </b-col>
                            <b-col md="auto">
                                <div>
                                    <b-img center alt="" id="phote" src="../assets/Finalizado.png"></b-img>
                                </div>
                            </b-col>
                        </b-row>
                    </b-list-group-item>
                </b-list-group>
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
                        console.log("errores")
                        if (value == true){     
                                let currentDate = new Date();
                                let currentDateBD = (currentDate.getFullYear() + "-" + (currentDate.getMonth() +1) + "-" + currentDate.getDate());

                                axios.put("http://localhost:3300/api/encargo/entregar",{
                                    params: {
                                        IdEncargo: event.target.id,
                                        FechaEntrega: currentDateBD
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
                                    .then(() => {window.location.reload()})
                                }),
                                (error) => {
                                    console.log(error);
                                }
                        }
                    })
                    .catch(err => {
                         console.log("error al cancelar"+ err);
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
</style>
