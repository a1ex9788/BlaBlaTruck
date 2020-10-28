<template>
<div>
    <Sidebar />
    <div id="groupForm" class="container-fluid">

        <div id="priceCalculation">

            <h2 class="mt-5">Calcula tu presupuesto</h2>

            <b-form @submit="onSubmit" @reset="onReset" v-if="show">

                <b-form-group class="mt-4" id="input-group-1" label="Origen:" label-for="input-1">
                    <b-form-input id="input-Origin" v-model="$v.form.origin.value.$model" :state="validateState('origin')" type="text" placeholder="Direccion: Calle | nrº | planta | puerta">
                    </b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Destino:" label-for="input-2">
                    <b-form-input id="input-Destination" v-model="$v.form.destination.value.$model" :state="validateState('destination')" type="text" placeholder="Direccion: Calle | nrº | planta | puerta">
                    </b-form-input>
                </b-form-group>

                <b-form-group id="input-group-Nature" label="Naturaleza:" label-for="input-Nature">
                    <b-form-select id="input-Nature" v-model="$v.form.nature.value.$model" :options="optionsNature" :state="validateStateWithPrice('nature')"></b-form-select>
                </b-form-group>

                <b-form-group id="input-group-3" label="Peso mercancia:" label-for="input-3">
                    <b-input-group class="mt-2 ">
                        <template v-slot:append>
                            <b-input-group-text><strong class="text">kg</strong></b-input-group-text>
                        </template>
                        <b-form-input id="input-Weight" v-model="$v.form.weight.value.$model" :state="validateStateWithPrice('weight')" max="32000" min="1" value="1" placeholder="1" type="number"></b-form-input>
                    </b-input-group>
                </b-form-group>

                <div>
                    <b-nav vertical class=" mx-auto mt-3 w-50">
                        <label>Tamaño:</label>
                        <b-form class="mt-2">

                            <b-input-group>
                                <label class="mr-1 mt-1">Ancho</label>
                                <template v-slot:append>
                                    <b-input-group-text><strong class="text">cm</strong></b-input-group-text>
                                </template>
                                <b-form-input v-model="$v.form.size.value.ancho.$model" :state="validateSizeWithPrice('ancho')" type="number" max="240" min="1" value="1" placeholder="(Ej.) 20"></b-form-input>
                            </b-input-group>

                            <b-input-group class="mt-3">
                                <label class="mr-3 mt-1 ml-2">Alto</label>

                                <template v-slot:append>
                                    <b-input-group-text><strong class="text">cm</strong></b-input-group-text>
                                </template>
                                <b-form-input v-model="$v.form.size.value.alto.$model" :state="validateSizeWithPrice('alto')" type="number" max="300" min="1" value="1" placeholder="(Ej.) 20"></b-form-input>
                            </b-input-group>

                            <b-input-group class="mt-3">
                                <label class="mr-2 mt-1">Largo</label>

                                <template v-slot:append>
                                    <b-input-group-text><strong class="text">cm</strong></b-input-group-text>
                                </template>
                                <b-form-input v-model="$v.form.size.value.largo.$model" :state="validateSizeWithPrice('largo')" type="number" max="1400" min="1" value="1" placeholder="(Ej.) 20">
                                </b-form-input>
                            </b-input-group>

                        </b-form>
                    </b-nav>
                </div>

                <br>
                <b-button @click="showPrice" class="mt-2 mx-4" type="submit" variant="primary">Calcular</b-button>
                <b-button @click='goBackPage' class="mt-2" type="button">Volver</b-button>
            </b-form>
        </div>

        <div id="showPriceCalculated" v-if="!show">
            <h2> Precio calculado </h2>
            <h3> {{this.calcularPrecio() }} euros </h3>
            <b-button @click="crearEncargo" class="mt-2 mx-4" type="submit" variant="primary">Continuar</b-button>
            <b-button @click="goBack" class="mt-2" type="button">Volver</b-button>
        </div>

    </div>
</div>
</template>

<script>
import Sidebar from '../../components/Sidebar'
import {
    validationMixin
} from "vuelidate";
import {
    required,
    integer,
    minValue,
    maxValue
} from "vuelidate/lib/validators";
const axios = require('axios');
export default {
    mixins: [validationMixin],
    name: "FormComponent",
    components: {
        Sidebar,
    },
    data() {
        return {
            form: {
                origin: {
                    value: "",
                    altitud: "122",
                    longitud: "122",
                },

                destination: {
                    value: "",
                    altitud: "122",
                    longitud: "122",

                },

                weight: {
                    value: "",
                    price: "3.54"
                },

                nature: { //en la realidad esto no es importante para calcular el precio 
                    value: null,
                    price: "" //tiene que ser dinámico acorde a la opción seleccionada
                },

                size: {
                    //max value:120
                    value: {
                        ancho: "",
                        largo: "",
                        alto: "",
                    },
                    price: "9.45"
                },

            },

            precio: {
                value: undefined,

            },

            optionsNature: [{
                    value: null,
                    text: "Selecciona una opción"
                },
                {
                    value: "Frágil",
                    text: "Frágil"
                },
                {
                    value: "Congelado",
                    text: "Congelado"
                },
                {
                    value: "Normal",
                    text: "Normal"
                }
            ],

            show: true,
        };
    },

    computed: {

        precioTotal: function () {
            return ((this.form.weight.price) * (this.form.weight.value) +
                (this.form.size.price) * ((this.form.size.price) * (this.form.size.price)));

        }

    },

    validations: {
        form: {
            origin: {
                value: {
                    required,
                },

            },

            destination: {
                value: {
                    required,
                }

            },

            nature: {
                value: {
                    required,
                }
            },

            weight: {
                value: {
                    required,
                    minValue: minValue(1),
                    maxValue: maxValue(3200)
                }
            },

            size: {
                value: {
                    ancho: {
                        required,
                        integer
                    },
                    largo: {
                        required,
                        integer
                    },
                    alto: {
                        required,
                        integer
                    },
                },
            },
            precio: {
                value: "",
            }
        },
    },

    methods: {

        calcularPrecio() {
            return ((this.form.weight.price) * (this.form.weight.value) +
                (this.form.size.price) * ((this.form.size.price) * (this.form.size.price)));
        },

        validateStateWithPrice(prop) {
            const {
                $dirty,
                $error
            } = this.$v.form[prop].value;
            return $dirty ? !$error : null;
        },

        validateSizeWithPrice(prop) {
            const {
                $dirty,
                $error
            } = this.$v.form.size.value[prop]
            return $dirty ? !$error : null;
        },

        validateState(prop) {
            const {
                $dirty,
                $error
            } = this.$v.form[prop];
            return $dirty ? !$error : null;
        },

        onSubmit(evt) {
            evt.preventDefault();
        },

        showPrice() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.show = false;
            }
        },

        goBackPage() {
            this.$router.push("about"); //Falta indicar la verdadera página de retorno
        },

        goBack() {
            this.show = true;
        },

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

            this.precio.value = this.calcularPrecio();

            axios.post('http://localhost:3300/api/encargo/cliente', {

                params: {

                    Id: "5",
                    DNICliente: this.$cookies.get("loginToken").Dni,
                    NaturalezaEncargo: this.form.nature.value,
                    Peso: this.form.weight.value,
                    Alto: this.form.size.value.alto,
                    Ancho: this.form.size.value.ancho,
                    Largo: this.form.size.value.largo,
                    Origen: this.form.origin.value,
                    Destino: this.form.destination.value,
                    //AltitudOrigen: this.origin.altitud.value,
                    //AltitudDestino: this.destination.altitud.value,
                    //LongitudOrigen: this.origin.longitud.value,
                    //LongitudDestion: this.destination.longitud.value,
                    Precio: this.precio.value,
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
