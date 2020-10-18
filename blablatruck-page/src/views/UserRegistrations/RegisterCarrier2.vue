<template>
    <div>
        <div id="groupForm2" class="container-fluid">
            <b-row>
                <b-img id="photo" src="../../assets/carrierLogo.png"></b-img>
                <h1 id="title" class="ml-4 mt-3 width 2">Registro transportista</h1>
            </b-row>
        </div>
        <div id="groupForm" class="container-fluid">      
            <h3 id="subtitle" class="mt-3">Datos camión</h3>

            <label id="labels" class="mt-3 mb-0"> Naturaleza </label>
            <b-form-input id="natureText" type="text" :state="natureError"> </b-form-input>
            <label id="labels" class="mt-3 mb-0"> Capacidad </label>
            <b-form-input id="capacityText" type="number" :state="capacityError" placeholder="350"> </b-form-input>

            <br><br>

            <h3 id="subtitle" class="mt-3">Datos bancarios</h3>

            <label id="labels" class="mt-3 mb-0"> IBAN </label>
            <b-form-input id="ibanText" type="text" :state="ibanError" placeholder="ES57"> </b-form-input>
            <label id="labels" class="mt-3 mb-0"> Nº de cuenta bancaria </label>
            <b-form-input id="bankAccountText" type="number" :state="bankAccountError" placeholder="01234567890123456789"> </b-form-input>

            <router-link to="/registerCarrier1">
                <button id="buttons" class="btn btn-primary mb-2">Atrás</button>
            </router-link>
            <button id="buttons" @click="createCarrier" class="btn btn-primary mb-2">Crear</button>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "RegisterCarrier2",
    
    data() {
        return {
            natureError: undefined,
            capacityError: undefined,
            ibanError: undefined,
            bankAccountError: undefined,
        };
    },
    methods: {
        createCarrier () {
            // Campo para saber si hay error
            var error = false

            //Recoger los datos de los campos
            var natureText = document.getElementById("natureText")
            var capacityText = document.getElementById("capacityText")
            var ibanText = document.getElementById("ibanText")
            var bankAccountText = document.getElementById("bankAccountText")

            //Comprobación de campos
            if (natureText.value == "" || natureText.value.length != 4) { this.natureError = false; error = true}
            if (capacityText.value == "" || capacityText.value.length != 20) { this.capacityError = false; error = true}
            if (ibanText.value == "" || ibanText.value.length != 4) { this.ibanError = false; error = true}
            if (bankAccountText.value == "" || bankAccountText.value.length != 20) { this.bankAccountError = false; error = true}

            //Crear carriere en la BD
            if (!error) console.log("asd");

            //Ir al menú de transportista (todavía no implementado)
            //if (!error) this.$router.push('/carrierMenu');
        }
    }

}
</script>

<style>
    #groupForm {
        max-width: 500px;
    }
    #groupForm2 {
        max-width: 550px;
    }
    #buttons{
        margin: 10%;
        width: 100px;
    }
    #labels{
        text-align: left;
        width: 500px;
    }
    #photo
    {
        height: 100px;
        width: 100px;
    }
    #title
    {
        font-weight: bold;
    }
    #subtitle
    {
        text-decoration: underline;
    }
</style>
