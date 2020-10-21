<template>

<div id="groupForm" class="container-fluid">
    
    <div id="priceCalculation">

        <h1 class="mt-0">Calcula el presupuesto de tu pedido :)</h1>

        <b-form @submit="onSubmit" @reset="onReset" v-if="show">

         <b-form-group id="input-group-1" label="Origen:" label-for="input-1">
             <b-form-input 
             id="input-Origin" 
              v-model="$v.form.origin.$model"
              :state="validateState('origin')"
              type="text"
              placeholder="Direccion: Calle | nrº | planta | puerta"> 
              </b-form-input>
            </b-form-group>

             <b-form-group id="input-group-2" label="Destino:" label-for="input-2">
             <b-form-input 
             id="input-Destination" 
              v-model="$v.form.destination.$model"
              :state="validateState('destination')"
              type="text"
              placeholder="Direccion: Calle | nrº | planta | puerta"> 
              </b-form-input>

            </b-form-group>

            <b-form-group id="input-group-3" label="Peso mercancia:" label-for="input-3">
                <b-input-group class="mt-3 ">
                    <template v-slot:append>
                        <b-input-group-text><strong class="text">kg</strong></b-input-group-text>
                    </template>
                    <b-form-input 
                    id="input-Weight" 
                    v-model="$v.form.weight.value.$model"
                    :state="validateStateWithPrize('weight')"
                    max="32"
                     min="0" 
                     value="1"
                      type="number"></b-form-input>
                </b-input-group>

            </b-form-group>

            <b-form-group id="input-group-Nature" label="Naturaleza:" label-for="input-Nature">
                <b-form-select @input="prizeNature()" id="input-Nature"  v-model="$v.form.nature.value.$model" :options="optionsNature" :state="validateStateWithPrize('nature')"></b-form-select>
            </b-form-group>

            <label>Tamaño</label>

            <b-form inline class="mt-2">

                <b-input-group class="w-25">
                    <template v-slot:append>
                        <b-input-group-text><strong class="text">m</strong></b-input-group-text>
                    </template>
                    <b-form-input 
                    v-model= "$v.form.size.value.ancho.$model"
                    :state= "validateSizeWithPrice('ancho')"
                    placeholder="Ancho"></b-form-input>
                </b-input-group>

                <label class="mt-2 mx-3">x</label>

                <b-input-group class="w-25">
                    <template v-slot:append>
                        <b-input-group-text><strong class="text">m</strong></b-input-group-text>
                    </template>
                    <b-form-input 
                     v-model= "$v.form.size.value.alto.$model" 
                     :state= "validateSizeWithPrice('alto')"
                     placeholder="Alto"></b-form-input>
                </b-input-group>

                <label class="mt-2 mx-3">x</label>

                <b-input-group class="w-25">
                    <template v-slot:append>
                        <b-input-group-text><strong class="text">m</strong></b-input-group-text>
                    </template>
                    <b-form-input 
                    v-model= "$v.form.size.value.largo.$model" 
                    :state= "validateSizeWithPrice('largo')"
                    placeholder="Largo">
                    </b-form-input>
                </b-input-group>

            </b-form>

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
import { validationMixin } from "vuelidate";
import {required, integer, minValue, maxValue} from "vuelidate/lib/validators";

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
          prize: "3"
        },
  
         nature: {
          value: null,
          prize: "" //tiene que ser dinámico acorde a la opción seleccionada
        },

        size: {
          value:{
          ancho: "",
          largo: "",
          alto: "",
          },
          prize: "1"
        },
      },

      optionsNature: [
        { value: null, text: "Selecciona una opción" },
        { value: "Frágil", text: "Frágil"},
        { value: "Congelado", text: "Congelado"},
        { value: "Normal", text: "Normal"}
      ],

      show: true,
    };
  },

  computed: {
    precioTotal:function(){
    return ((this.form.weight.prize)*(this.form.weight.value)
             * (this.form.nature.prize)
             + (this.form.size.prize)*((this.form.size.value.ancho)*(this.form.size.value.largo)*(this.form.size.value.alto)))
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
        value:{
        required,
        }
      },

      weight: {
        value: {
          required,
          minValue: minValue(0),
          maxValue: maxValue(32)
        }
      },

      size: {
        value:{
        ancho: { required, integer},
        largo: { required, integer},
        alto: { required, integer},
        },
      },
    },
  },

  methods: {

    prizeNature(){
      if(this.form.nature.value == "Frágil") {this.form.nature.prize= "3"}
      if(this.form.nature.value == "Congelado") {this.form.nature.prize= "2"}
      if(this.form.nature.value == "Normal") {this.form.nature.prize= "1"}
      if(this.form.nature.value == null) {this.form.nature.prize= "";}
    },
    
    validateStateWithPrize(prop) {
      const { $dirty, $error } = this.$v.form[prop].value;
      return $dirty ? !$error : null;
    },

     validateSizeWithPrice(prop) {
      const { $dirty, $error } = this.$v.form.size.value[prop]
      return $dirty ? !$error : null;
    },

    validateState(prop) {
      const { $dirty, $error } = this.$v.form[prop];
      return $dirty ? !$error : null;
    },


    onSubmit(evt) {
      evt.preventDefault();
    },

    showPrice() {
      this.$v.$touch()
      if(!this.$v.$invalid) {
        this.show = false;}
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