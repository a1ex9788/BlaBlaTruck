<template>
<div id="groupForm" class="container-fluid">

    <div id="priceCalculation">

        <h1 class="mt-0">Calcula el presupuesto de tu pedido :)</h1>

        <b-form @submit="onSubmit" @reset="onReset" v-if="show">

            <b-form-group class="mt-4" id="input-group-1" label="Origen:" label-for="input-1">
                <b-form-input id="input-Origin" v-model="$v.form.origin.$model" :state="validateState('origin')" type="text" placeholder="Direccion: Calle | nrº | planta | puerta">
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Destino:" label-for="input-2">
                <b-form-input id="input-Destination" v-model="$v.form.destination.$model" :state="validateState('destination')" type="text" placeholder="Direccion: Calle | nrº | planta | puerta">
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-Nature" label="Naturaleza:" label-for="input-Nature">
                <b-form-select @input="priceNature()" id="input-Nature" v-model="$v.form.nature.value.$model" :options="optionsNature" :state="validateStateWithPrice('nature')"></b-form-select>
            </b-form-group>

            <b-form-group id="input-group-3" label="Peso mercancia:" label-for="input-3">
                <b-input-group class="mt-2 ">
                    <template v-slot:append>
                        <b-input-group-text><strong class="text">kg</strong></b-input-group-text>
                    </template>
                    <b-form-input id="input-Weight" v-model="$v.form.weight.value.$model" :state="validateStateWithPrice('weight')" max="100" min="1" value="1" placeholder="1" type="number"></b-form-input>
                </b-input-group>
            </b-form-group>

            <label hidden>Tamaño</label>

            <b-form hidden inline class="mt-2">

                <b-input-group class="w-25">
                    <template v-slot:append>
                        <b-input-group-text><strong class="text">cm</strong></b-input-group-text>
                    </template>
                    <b-form-input v-model="$v.form.size.value.ancho.$model" :state="validateSizeWithPrice('ancho')" type="number" max="120" min="1" value="1" placeholder="Ancho"></b-form-input>
                </b-input-group>

                <label class="mt-2 mx-3">x</label>

                <b-input-group class="w-25">
                    <template v-slot:append>
                        <b-input-group-text><strong class="text">cm</strong></b-input-group-text>
                    </template>
                    <b-form-input v-model="$v.form.size.value.alto.$model" :state="validateSizeWithPrice('alto')" type="number" max="120" min="1" value="1" placeholder="Alto"></b-form-input>
                </b-input-group>

                <label class="mt-2 mx-3">x</label>

                <b-input-group class="w-25">
                    <template v-slot:append>
                        <b-input-group-text><strong class="text">cm</strong></b-input-group-text>
                    </template>
                    <b-form-input v-model="$v.form.size.value.largo.$model" :state="validateSizeWithPrice('largo')" type="number" max="120" min="1" value="1" placeholder="Largo">
                    </b-form-input>
                </b-input-group>
            </b-form>

            <div>
                <b-nav vertical class=" mx-auto mt-3 w-50">
                    <label>Tamaño:</label>
                    <b-form class="mt-2">

                        <b-input-group>
                            <label class="mr-1 mt-1">Ancho</label>
                            <template v-slot:append>
                                <b-input-group-text><strong class="text">cm</strong></b-input-group-text>
                            </template>
                            <b-form-input v-model="$v.form.size.value.ancho.$model" :state="validateSizeWithPrice('ancho')" type="number" max="120" min="1" value="1" placeholder="(Ej.) 20"></b-form-input>
                        </b-input-group>

                        <b-input-group class="mt-3">
                            <label class="mr-3 mt-1 ml-2">Alto</label>

                            <template v-slot:append>
                                <b-input-group-text><strong class="text">cm</strong></b-input-group-text>
                            </template>
                            <b-form-input v-model="$v.form.size.value.alto.$model" :state="validateSizeWithPrice('alto')" type="number" max="120" min="1" value="1" placeholder="(Ej.) 20"></b-form-input>
                        </b-input-group>

                        <b-input-group class="mt-3">
                            <label class="mr-2 mt-1">Largo</label>

                            <template v-slot:append>
                                <b-input-group-text><strong class="text">cm</strong></b-input-group-text>
                            </template>
                            <b-form-input v-model="$v.form.size.value.largo.$model" :state="validateSizeWithPrice('largo')" type="number" max="120" min="1" value="1" placeholder="(Ej.) 20">
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
        <h3> {{precioTotal }} euros </h3>
        <b-button class="mt-2 mx-4" type="submit" variant="primary">Crear encargo</b-button>
        <b-button @click="goBack" class="mt-2" type="button">Volver</b-button>
    </div>

</div>
</template>

<script>
import {
    validationMixin
} from "vuelidate";
import {
    required,
    integer,
    minValue,
    maxValue
} from "vuelidate/lib/validators";

export default {
    mixins: [validationMixin],
    name: "FormComponent",
    data() {
        return {
            form: {
                origin: "",
                destination: "",

                weight: {
                    value: "",
                    price: "3.54"
                },

                nature: {//en la realidad esto no es importante para calcular el precio 
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
            return (Math.round((this.form.weight.price) * (this.form.weight.value) +
                (this.form.nature.price) +
                (this.form.size.price) * ((this.form.size.price) * (this.form.size.price))),-2)
        }

    },

    validations: {
        form: {
            origin: {
                required,
            },

            destination: {
                required,
            },

            nature: {
                value: {
                    required,
                }
            },

            weight: {
                value: {
                    required,
                    minValue: minValue(0),
                    maxValue: maxValue(100)
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
        },
    },

    methods: {

        priceNature() {
            if (this.form.nature.value == "Frágil") {
                this.form.nature.price = "3"
            }
            if (this.form.nature.value == "Congelado") {
                this.form.nature.price = "2"
            }
            if (this.form.nature.value == "Normal") {
                this.form.nature.price = "1"
            }
            if (this.form.nature.value == null) {
                this.form.nature.price = "";
            }
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

        onReset(evt) {
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
    },
};
</script>

<style>
#groupForm {
    max-width: 500px;
    margin: 0 auto;
}
</style>
