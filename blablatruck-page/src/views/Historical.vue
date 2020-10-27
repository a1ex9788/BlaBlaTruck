<template>
  <div>
    <b-list-group>
        <b-list-group-item v-for="item in items" v-bind:key="item.id">
            <div>{{item.nombre}}</div>
            <div>
                {{item.Origen}}-{{item.Destino}} {{item.FechaRecogida}}-{{item.FechaEntrega}}
            </div>
        </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
    const axios = require("axios");

    export default {
        data () {
            return {
                items: [],
                personDNI: undefined,
                isCarrier: undefined
            }
        },
        created ()
        {
            this.personDNI = this.$route.params.dni;
            this.isCarrier = this.$route.params.isCarrier;

            // Pruebas manuales. Cuando se llame a este view será necesario pasar sus parámetros
            if (!this.personDNI) this.personDNI = "11111111r"
            if (!this.isCarrier) this.isCarrier = false

            updateHistorical(this.personDNI, this.items)
        }
    }

    async function updateHistorical(personDNI, items)
    {
        var historical = await getHistorical(personDNI)

            historical.forEach(element => {
                console.log(element)
                items.push(element)
            });
    }

    async function getHistorical(personDNI)
    {
        var res;

        // preguntar al backend por el historico
        await axios
          .get("http://localhost:3300/api/encargos/" + personDNI)
          .then(
            (response) => {
                res = response.data
            },
            (error) => {
                console.log(error);
            }
          );

        return res
    }
</script>

<style>

</style>