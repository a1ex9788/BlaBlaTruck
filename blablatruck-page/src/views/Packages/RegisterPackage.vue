<template>
<div>
    <Sidebar />
    <div id="groupForm" class="container-fluid">

        <div id="priceCalculation" class="mt-5">

            <!-- <h2 class="mt-5">Recibo del encargo</h2>-->

            <b-card header="Resumen encargo" header-text-variant="white" header-tag="header" header-bg-variant="dark" :footer="precioRecibo" footer-tag="footer" footer-bg-variant="info" footer-border-variant="dark" title="Detalles" style="max-width: 25;">
                <b-card-text>
                </b-card-text>
                <b-list-group flush>
                    <b-list-group-item>Origen: {{this.origen}}</b-list-group-item>
                    <b-list-group-item>Destino: {{this.destino}}</b-list-group-item>
                    <b-list-group-item>Peso: {{this.peso}} kg</b-list-group-item>
                    <b-list-group-item>Naturaleza: {{this.naturalezaEncargo}}</b-list-group-item>
                    <b-list-group-item>Tamaño: {{this.alto}} x {{this.ancho}} x {{this.largo}} cm</b-list-group-item>
                </b-list-group>

            </b-card>
            <div id="encargo" class=" ml-5 mt-4">

                <router-link to="/priceCalculation">
                    <b-button type="button">Volver</b-button>
                    
                </router-link>
                <b-button @click="crearEncargo" class="mx-4" type="submit" variant="primary">Crear</b-button>

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
            id: undefined,
            origen: "",
            destino: "",
            peso: undefined,
            naturalezaEncargo: null,
            ancho: undefined,
            largo: undefined,
            alto: undefined,
            precio: undefined,
            precioRecibo: undefined,
                       
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
        this.precioRecibo = "Precio: " + this.precio + " €";
        
        
    },

    methods: {

        onReset(evt) { //este metodo no lo llegamos a usar de momento
            evt.preventDefault();
            // Reset our form values
            this.form.origen = "";
            this.form.destino = "";
            this.form.naturaleza = null;
            // Trick to reset/clear native browser form validation state
            this.show = false;
            this.$nextTick(() => {
                this.show = true;
            });
        },

        /*
        goBack() {
        
            this.$bvModal.msgBoxConfirm('Si vuelve atras perderá toda la información relacionada con este encargo. Esta seguro?', {
                    title: 'Atención!',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'SI',
                    cancelTitle: 'CANCELAR',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                .then((value) => {
                    
                   

                    console.log(value);
                })
                .catch(err => {
                    console.log(err);
                })

        },*/

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

                    this.$bvModal.msgBoxOk('Su paquete se ha guardado correctamente', {
                        title: 'Confirmación',
                        size: 'sm',
                        buttonSize: 'sm',
                        okVariant: 'info',
                        headerClass: 'p-2 border-bottom-0',
                        footerClass: 'p-2 border-top-0',
                        centered: true
                    });
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
