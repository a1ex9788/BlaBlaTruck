<template>
<div>
    <Sidebar />
    <div id="groupForm">
        <div id="groupTitle" class="container-fluid">
            <div class="row mt-2">
                <b-list-group>
                    <b-list-group-item v-for="item in items" v-bind:key="item.id">
                        <b-row>
                            <b-col>
                                <div id="name">{{ item.Nombre }}</div>
                                <div>{{ item.Origen }} -- {{ item.Destino }}</div>
                                <div>{{ modifyFormat(item.FechaRecogida) }} -- {{ modifyFormat(item.FechaEntrega) }}</div>
                            </b-col>
                            <b-col md="auto">
                                <div>
                                    <b-img center alt="" id="phote" src="../assets/tickVerde.jpeg"></b-img>
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
    name: "Historical",
    components: {
        Sidebar,
    },
    data() {
        return {
            items: [],
            personDNI: undefined,
            isCarrier: undefined,
        };
    },
    created() {
        this.personDNI = this.$route.params.personDNI;
        this.isCarrier = this.$route.params.isCarrier;

        // Pruebas manuales. Cuando se llame a este view será necesario pasar sus parámetros
        if (!this.personDNI) this.personDNI = "11111111r";
        if (!this.isCarrier) this.isCarrier = false;

        this.updateHistorical();
    },
    methods: {

        modifyFormat(dateTime)
        {
            return dateTime.substring(0, 10)
        },

        async updateHistorical() {
            var historical = await this.getHistorical();

            this.items = historical
        },

        async getHistorical() {
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
            
            var result = []

            res.forEach(async (element) => {
                var dniToGetName
                if (this.isCarrier) { dniToGetName = element.DNICliente }
                else { dniToGetName = element.DNITransportista }
                
                var person
                await axios
                    .get("http://localhost:3300/api/personas/" + dniToGetName)
                    .then(
                        (response) => {
                            person = response.data;
                        },
                        (error) => {
                            console.log(error);
                        }
                    );

                result.push({
                    Nombre: person.Nombre + " " + person.Apellidos,
                    FechaRecogida: element.FechaRecogida,
                    FechaEntrega: element.FechaEntrega,
                    Origen: element.Origen,
                    Destino: element.Destino
                })
            })
            
            return result
        }

    }
};
</script>

<style>
#groupForm {
    max-width: 800px;
    text-align: center;
    margin: 0 auto;
}

#groupTitle {
    max-width: 500px;
    text-align: center;
}

#name {
    font-weight: bold;
    font-size: 120%;
}
</style>
