<template>
<div>
    <Sidebar />
    <div id="groupForm" class="container-fluid">

        <div id="priceCalculation" v-if="show">

            <h2 class="mt-5">Calcula el presupuesto de tu paquete</h2>

            <b-form @submit="onSubmit" @reset="onReset">

                <b-form-group class="mt-4" id="input-group-1" label="Origen:" label-for="input-1" v-model="$v.form.origen.value.$model" :state="true">
                    <vue-bootstrap-typeahead id="input-Origen" :data="adresses" v-model="addressSearch" placeholder="Direccion: Calle | nrº | planta | puerta" @hit="selectedAddress = $event" :state="validateStateOrigen('origen')">
                    </vue-bootstrap-typeahead> 
                </b-form-group>

                <b-form-group id="input-group-2" label="Destino:" label-for="input-2">
                    <vue-bootstrap-typeahead id="input-Destino" :data="adresses" :minMatchingChars="0" v-model="addressSearch" placeholder="Direccion: Calle | nrº | planta | puerta" @hit="selectedAddress = $event" :state="validateStateDestino('origen')">
                    </vue-bootstrap-typeahead>
                </b-form-group>

                <b-form-group id="input-group-Naturaleza" label="Naturaleza:" label-for="input-Naturaleza">
                    <b-form-select id="input-Naturaleza" v-model="$v.form.naturaleza.value.$model" :options="optionsNaturaleza" :state="validateStateWithPrice('naturaleza')"></b-form-select>
                </b-form-group>

                <b-form-group id="input-group-3" label="Peso mercancia:" label-for="input-3">
                    <b-input-group class="mt-2 ">
                        <template v-slot:append>
                            <b-input-group-text><strong class="text">kg</strong></b-input-group-text>
                        </template>
                        <b-form-input id="input-Peso" v-model="$v.form.peso.value.$model" :state="validateStateWithPrice('peso')" max="32000" min="1" value="1" placeholder="1" type="number"></b-form-input>
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
                <b-button @click="showPrice" class="mt-2 mx-4 mb-5" type="submit" variant="info">Siguiente</b-button>

            </b-form>
        </div>

        <div id="showPriceCalculated" v-if="!show">
            <h3 class="mt-5">El presupuesto calculado para su paquete es de:</h3>
            <br>
            <h4> {{this.calcularPrecio() }} euros </h4>
            <br>
            <h3 class="mt-5">Seleccione una fecha máxima para la entrega del paquete:</h3>
            <br>
            <div>
                <b-form-datepicker id="datepicker" :min="min" placeholder="Seleccione una fecha" class="mb-2"
                v-model="fechaMax.value" ></b-form-datepicker>
            </div>
            <div class="mt-5">
                <b-button @click="goBack" type="button">Volver</b-button>
                <b-button @click="next" class="mx-4" type="submit" variant="info">Siguiente</b-button>
            </div>
        </div>

    </div>
</div>
</template>

<script>
const platform = new window.H.service.Platform({
            apikey: 'h_XTwwPMEk8Iz2QvPW6rtB5D99xqPDwbW9aVqNRe1HI'
        });
var service = platform.getSearchService();
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
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
import _ from 'underscore'
export default {
    mixins: [validationMixin],
    name: "FormComponent",
    components: {
        Sidebar,
        VueBootstrapTypeahead,
    },
    data() {
        return {
            adresses: [],
            addressSearch: '',
            selectedAddress: null,
            min: new Date(),
            form: {
                origen: {
                    value: "",
                    altitud: "122",
                    longitud: "122",
                },

                destino: {
                    value: "",
                    altitud: "122",
                    longitud: "122",

                },

                peso: {
                    value: "",
                    price: "4.74" //1kg= 3,54 € + comision
                },

                naturaleza: {
                    value: null,
                },

                size: {
                    value: {
                        ancho: "",
                        largo: "",
                        alto: "",
                    },
                }

            },

            precio: {
                value: undefined,
            },

            fechaMax: {
                value: undefined,
            },

            optionsNaturaleza: [{
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
                    value: "Normes qal",
                    text: "Normal"
                }
            ],

            show: true,
        };
    },

    validations: {
        form: {
            origen: {
                value: {
                    required,
                },
            },

            destino: {
                value: {
                    required,
                }

            },

            naturaleza: {
                value: {
                    required,
                }
            },

            peso: {
                value: {
                    required,
                    minValue: minValue(0.000001),
                    maxValue: maxValue(32000)
                }
            },

            size: {
                value: {
                    ancho: {
                        required,
                        integer,
                        minValue: minValue(1),
                        maxValue: maxValue(240),
                    },
                    largo: {
                        required,
                        integer,
                        minValue: minValue(1),
                        maxValue: maxValue(300),
                    },
                    alto: {
                        required,
                        integer,
                        minValue: minValue(1),
                        maxValue: maxValue(1400),
                    },
                },
            },
            precio: {
                value: "",
            },
            fechaMax: {
                value: "",
            }
        },
    },

    methods: {

        calcularPrecio() {
            let valor = ((this.form.peso.price) * (this.form.peso.value)).toFixed(2);
            return valor;
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

        validateStateOrigen(prop) {
            this.$v.form.origen.value.$model = this.addressSearch;
            const {
                $dirty,
                $error
            } = this.$v.form[prop];
            return $dirty ? !$error : null;
        },

        validateStateDestino(prop) {
            this.$v.form.destino.value.$model = this.addressSearch;
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
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.show = false;
            }
        },

        goBack() {
            this.show = true;
        },

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

        next() {
            console.log("next");
            this.precio.value = this.calcularPrecio();

            this.$router.push({
                name: "RegisterPackage",
                params: {
                    fechaMax: this.fechaMax.value,
                    naturalezaEncargo: this.form.naturaleza.value,
                    peso: this.form.peso.value,
                    alto: this.form.size.value.alto,
                    ancho: this.form.size.value.ancho,
                    largo: this.form.size.value.largo,
                    origen: this.form.origen.value,
                    destino: this.form.destino.value,
                    precio: this.precio.value,
                }
            });
        },
        async getAddresses(query) {
            //console.log("buscando sugerencias");
            await service.autosuggest({
                q: query,
                at: '39.46975,-0.37739'
            }, (result) =>{
                var suggestions = [];
                var resultLength = result.items.length;
                for(var i = 0; i < resultLength; i++){
                    var suggest = result.items[i].title;
                    suggestions.push(suggest);
                }
                this.adresses = suggestions;
            });
        },
    },
    watch: {
        addressSearch: _.debounce(function(addr) { this.getAddresses(addr) }, 500),
    },
};

</script>

<style>
#groupForm {
    max-width: 500px;
    margin: 0 auto;
}
</style>
