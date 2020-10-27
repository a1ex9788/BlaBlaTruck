<template>
  <div>
    <b-list-group>
        <b-list-group-item v-for="item in items" v-bind:key="item.id">
            <div>{{item.nombre}}</div>
            <div>
                {{item.origen}}-{{item.destino}} {{item.fReserva}}-{{item.fEntrega}}
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
                items: []
            }
        },
        created ()
        {
            var historical = getHistorical()

            historical.forEach(element => {
                this.items.push(element)
            });
        }
    }

    async function getHistorical()
    {
        try
        {
            var personDNI = this.$route.params.dni;
        }
        catch
        {
            alert("Es nesario pasar como parámetro el DNI del usuario. Uno por defecto se utilizará a modo de prueba.")

            personDNI = "11111111r"
        }

        // preguntar al backend por el historico
        await axios
          .get("http://localhost:3300/api/encargo", {
            clienteDNI: personDNI
          })
          .then(
            (response) => {
                console.log(response)
              return response.body
            },
            (error) => {
              console.log(error);
            }
          );

        return [
                {nombre: "Antonio Perez",
                origen: "Valencia",
                destino: "Madrid",
                fReserva: "19/08/2020",
                fEntrega: "23/08/2020"}
            ]
    }
</script>

<style>

</style>