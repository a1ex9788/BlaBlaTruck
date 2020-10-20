<template>

<div id="groupForm" class="container-fluid">
    
    <div id="priceCalculation">

        <h1 class="mt-0">Calcula el presupuesto de tu pedido</h1>

        <b-form @submit="onSubmit" @reset="onReset" v-if="show">

            <b-form-group id="input-group-1" label="Origen:" label-for="input-1">
                <b-form-input id="input-Origin" v-model= form.origin type="text" required placeholder="Direccion: Calle | nrº | planta | puerta"> </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Destino:" label-for="input-2">
                <b-form-input id="input-Destination"  v-model= form.destination type="text" required placeholder="Direccion: Calle | nrº | planta | puerta"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Peso mercancia:" label-for="input-3">
                <b-input-group class="mt-3 ">
                    <template v-slot:append>
                        <b-input-group-text><strong class="text">kg</strong></b-input-group-text>
                    </template>
                    <b-form-input id="input-Weight" v-model="form.weight" max="32" min="0" value="1" type="number"></b-form-input>
                </b-input-group>

            </b-form-group>

            <b-form-group id="input-group-Nature" label="Naturaleza:" label-for="input-Nature">
                <b-form-select id="input-Nature" v-model="form.nature" :options="optionsNature" required></b-form-select>
            </b-form-group>

            <label>Tamaño</label>

            <b-form inline class="mt-2">

                <b-input-group class="w-25">
                    <template v-slot:append>
                        <b-input-group-text><strong class="text">m</strong></b-input-group-text>
                    </template>
                    <b-form-input v-model="form.size[0]"  placeholder="Ancho"></b-form-input>
                </b-input-group>

                <label class="mt-2 mx-3">x</label>

                <b-input-group class="w-25">
                    <template v-slot:append>
                        <b-input-group-text><strong class="text">m</strong></b-input-group-text>
                    </template>
                    <b-form-input v-model="form.size[1]" placeholder="Alto"></b-form-input>
                </b-input-group>

                <label class="mt-2 mx-3">x</label>

                <b-input-group class="w-25">
                    <template v-slot:append>
                        <b-input-group-text><strong class="text">m</strong></b-input-group-text>
                    </template>
                    <b-form-input v-model="form.size[2]" placeholder="Largo"></b-form-input>
                </b-input-group>

            </b-form>

            <br>
            <b-button @click="showPrice" class="mt-2 mx-4" type="submit" variant="primary">Calcular</b-button>
            <b-button @click='goBackPage' class="mt-2" type="button">Volver</b-button>
        </b-form>
    </div>

    <div id="showPriceCalculated" v-if="!show">
        <h2> [Precio calculado]</h2>
        <b-button class="mt-2 mx-4" type="submit" variant="primary">Crear encargo</b-button>
        <b-button @click="goBack" class="mt-2" type="button">Volver</b-button>
    </div>

</div>
</template>

<script>
export default {
    
    data() {
        return {
            form: {
                origin: '',
                destination: '',
                weight: '0',
                nature: 'null',
                size: [],
            },

           optionsNature: [
          { value: 'null', text: 'Selecciona una opción' },
          { value: 'Frágil', text: 'Frágil' },
          { value:  'Congelado', text: 'Congelado' },
          { value: 'Normal', text: 'Normal' },
            ],

            show: true
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            alert(JSON.stringify(this.form))
        },

        showPrice() {
            //document.getElementById("priceCalculation").hidden = true
            //document.getElementById("showPriceCalculated").hidden = false
            this.show = false
       },

        goBackPage(){
            this.$router.push('about'); //Falta indicar la verdadera página de retorno
        },

        goBack(){
            this.show=true;

        },

        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.form.origin = ''
            this.form.destination = ''
            this.form.nature = null
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        }
    }
}
</script>

<style>
#groupForm {
    max-width: 500px;
    margin: 0 auto;
}
</style>
