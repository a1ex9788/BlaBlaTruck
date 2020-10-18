<template>
<div id="groupForm" class="container-fluid">

    <div hidden id="showPriceCalculated">
        <h1> Precio </h1>
        <b-button class="mt-2 mx-4" type="submit" variant="primary">Crear encargo</b-button>
        <b-button class="mt-2" type="button">Volver</b-button>
    </div>

    <div id="priceCalculation">

        <h1 class="mt-0">Calcula el presupuesto de tu pedido</h1>

        <b-form @submit="onSubmit" @reset="onReset" v-if="show">

            <b-form-group id="input-group-1" label="Origen:" label-for="input-1">
                <b-form-input id="input-Origin" type="text" required placeholder="Direccion: Calle | nrº | planta | puerta"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Destino:" label-for="input-2">
                <b-form-input id="input-Destination" type="text" required placeholder="Direccion: Calle | nrº | planta | puerta"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Peso mercancia (en kg):" label-for="input-3">
                <b-input-group class="mt-3 ">
                    <template v-slot:append>
                        <b-input-group-text><strong class="text">kg</strong></b-input-group-text>
                    </template>
                    <b-form-input id="input-Weight" max="32" min="0" value="1" type="number"></b-form-input>
                </b-input-group>

            </b-form-group>

            <b-form-group id="input-group-Nature" label="Naturaleza:" label-for="input-Nature">
                <b-form-select id="input-Nature" v-model="form.nature" :options="nature" required></b-form-select>
            </b-form-group>

            <label>Tamaño</label>

            <b-form inline class="mt-2">

                <b-input-group class="w-25">
                    <template v-slot:append>
                        <b-input-group-text><strong class="text">m</strong></b-input-group-text>
                    </template>
                    <b-form-input placeholder="Ancho"></b-form-input>
                </b-input-group>

                <label class="mt-2 mx-3">x</label>

                <b-input-group class="w-25">
                    <template v-slot:append>
                        <b-input-group-text><strong class="text">m</strong></b-input-group-text>
                    </template>
                    <b-form-input placeholder="Alto"></b-form-input>
                </b-input-group>

                <label class="mt-2 mx-3">x</label>

                <b-input-group class="w-25">
                    <template v-slot:append>
                        <b-input-group-text><strong class="text">m</strong></b-input-group-text>
                    </template>
                    <b-form-input placeholder="Largo"></b-form-input>
                </b-input-group>

            </b-form>

            <br>
            <b-button @click="showPrice" class="mt-2 mx-4" type="submit" variant="primary">Calcular</b-button>
            <b-button class="mt-2" type="button">Volver</b-button>
        </b-form>

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
                weight: ''
            },
            nature: [{
                text: 'Elige una opcion..',
                value: null
            }, 'Normal', 'Fragil', 'Congelado'],
            show: true
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            alert(JSON.stringify(this.form))
        },

        showPrice() {
            document.getElementById("priceCalculation").hidden = true
            document.getElementById("showPriceCalculated").hidden = false
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
