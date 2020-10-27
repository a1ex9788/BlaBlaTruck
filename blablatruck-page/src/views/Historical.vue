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

    function getHistorical()
    {
        try
        {
            var personDNI = this.$route.params.dni;
            var isCarrier = this.$route.params.isCarrier;
        }
        catch
        {
            alert("Es nesario pasar como parámetros el DNI del usuario y si es transportista o no.")
        }

        console.log(personDNI)
        if (isCarrier) {
            // preguntar al backend por el historico de transportista

            return [1,2,3]
        } else {
            // preguntar al backend por el historico de cliente

            return [
                {nombre: "Antonio Perez",
                origen: "Valencia",
                destino: "Madrid",
                fReserva: "19/08/2020",
                fEntrega: "23/08/2020"}
            ]
        }
    }
</script>

<style>

</style>