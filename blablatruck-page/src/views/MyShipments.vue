<template>
<div>
    <Sidebar />
    <div id="groupForm">
        <div class="container-fluid">
            <div class="row mt-2">
                <b-list-group id="groupTitle" >
                    <b-list-group-item v-for="item in nonReservedPackages" v-bind:key="item.id">
                        <b-row>
                            <b-col>
                                <div id="name"><strong>{{ getClientType() }}: </strong>{{ item.NombreCompleto }}</div>
                                <div class="mt-1"><strong>Origen: </strong>{{ item.Origen }}</div>
                                <div><strong>Destino: </strong>{{ item.Destino }}</div>
                                <div class="mt-1"><strong>Recogida: </strong>{{ modifyFormat(item.FechaRecogida) }}</div>
                                <div><strong>Entrega: </strong>{{ modifyFormat(item.FechaEntrega) }}</div>
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
                            <b-col>
                                <div id="name"><strong>{{ getClientType() }}: </strong>{{ item.NombreCompleto }}</div>
                                <div class="mt-1"><strong>Origen: </strong>{{ item.Origen }}</div>
                                <div><strong>Destino: </strong>{{ item.Destino }}</div>
                                <div class="mt-1"><strong>Recogida: </strong>{{ modifyFormat(item.FechaRecogida) }}</div>
                                <div><strong>Entrega: </strong>{{ modifyFormat(item.FechaEntrega) }}</div>
                                <b-button v-bind:id="item.Id" @click="onCancelButton" v-if="!item.FechaRecogida" class="btn-danger mt-2">Cancelar</b-button>
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
                                <div class="mt-1"><strong>Recogida: </strong>{{ modifyFormat(item.FechaRecogida) }}</div>
                                <div><strong>Entrega: </strong>{{ modifyFormat(item.FechaEntrega) }}</div>
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

        modifyFormat(dateTime)
        {
            if (dateTime) { return dateTime.substring(0, 10) }
            else { return "Pendiente" }
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
        async onCancelButton(event) {
            await axios.put("http://localhost:3300/api/encargo/anular",{
                params: {
                    IdEncargo: event.target.id
                }
            }).then((res) => {
                console.log(res);
                this.$bvModal.msgBoxOk('Su reserva ha sido anulado con éxito',{
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
            }), (error) => {
                console.log(error);
            }
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
    max-width: 600px;
    min-width: 600px;
    text-align: center;
}

#phote {
    width: 80px;

}

#name{
    font-size: 120%;
}
</style>
