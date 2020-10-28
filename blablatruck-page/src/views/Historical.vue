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
                                <div id="name">{{ item.nombre }}</div>
                                <div>{{ item.Origen }} -- {{ item.Destino }}</div>
                                <div>{{ item.FechaRecogida }} -- {{ item.FechaEntrega }}</div>
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
        this.isCarrier = this.$route.params.isCarrier;

        // Pruebas manuales. Cuando se llame a este view será necesario pasar sus parámetros
        //if (!this.personDNI) this.personDNI = "11111111r";
        if (!this.isCarrier) this.isCarrier = false;

        this.updateHistorical(this.items);
    },
    methods: {

        async updateHistorical(items) {
            var historical = await this.getHistorical();

            historical.forEach((element) => {
                console.log(element);
                items.push(element);
            });
        },

        async getHistorical() {
            var res;
            // preguntar al backend por el historico
            await axios
                .get("http://localhost:3300/api/encargo/cliente", {
                    params: {
                        DNICliente: this.$cookies.get("loginToken").Dni,
                    },

                })
                .then(
                    (response) => {
                        res = response.data;
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            console.log("polla" + res);
            return [{
                nombre: "Manolo Gutierrez Sanmartín",
                Origen: "Valencia",
                Destino: "Madrid",
                FechaRecogida: "19/08/2020",
                FechaEntrega: "23/08/2020",
            }, ];
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
