<template>
<div>
    <Sidebar />
    <div id="groupForm" class="container-fluid">

        <div id="priceCalculation">

            <h2 class="mt-5">Recibo del encargo</h2>
            <label>{{this.naturalezaEncargo}}</label>
            <div id="encargo">

                <b-button @click="crearEncargo" class="mt-2 mx-4" type="submit" variant="primary">Crear</b-button>
                <router-link to="/priceCalculation">
                    <b-button class="mt-2" type="button">Volver</b-button>
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Sidebar from '../../components/Sidebar'
//Se perderan los datos si se vuelve en priceCalculation,deberia haber un mensaje avisandolo de momento
const axios = require('axios');
export default {
    name: "FormComponent",
    components: {
        Sidebar,
    },
    data() {
        return {
            
            origen: "",
            destino: "",
            peso: undefined,
            naturalezaEncargo: null,
            ancho: undefined,
            largo: undefined,
            alto: undefined,
            precio: undefined,
           
        };
    },
    
    created() {


        this.peso = this.$route.params.peso;
        this.naturalezaEncargo = this.$route.params.naturalezaEncargo;
        this.alto = this.$route.params.alto;
        this.ancho = this.$route.params.ancho;
        this.largo = this.$route.params.largo;
        this.origen = this.$route.params.origen;
        this.destino = this.$route.params.destino;
        this.precio = this.$route.params.precio;

    },

    methods: {

        onReset(evt) { //este metodo no lo llegamos a usar de momento
            evt.preventDefault();
            // Reset our form values
            this.form.origin = "";
            this.form.destination = "";
            this.form.nature = null;
            // Trick to reset/clear native browser form validation state
            this.show = false;
            this.$nextTick(() => {
                this.show = true;
            });
        },

        crearEncargo() {

            axios.post('http://localhost:3300/api/encargo/cliente', {

                params: {

                    //Id: "10",
                    DNICliente: this.$cookies.get("loginToken").Dni,
                    NaturalezaEncargo: this.naturalezaEncargo,
                    Peso: this.peso,
                    Alto: this.alto,
                    Ancho: this.ancho,
                    Largo: this.largo,
                    Origen: this.origen,
                    Destino: this.destino,
                    //AltitudOrigen: this.altitudOrigen,
                    //AltitudDestino: this.altitudDestino,
                    //LongitudOrigen: this.longitudOrigen,
                    //LongitudDestion: this.longitudDestino,
                    Precio: this.precio,
                    Pagado: 1,

                }

            }).then((response) => {

                if (response.status == 200) {

                    console.log("Se ha guardado correctamente");
                    console.log(response);
                }
            }, (error) => {

                console.log("No se ha podido crear!");
                console.log(error);

            });

        }

    },
};
</script>

<style>
#groupForm {
    max-width: 500px;
    margin: 0 auto;
}
</style>
