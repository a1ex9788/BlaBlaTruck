<template>
    <div id="groupForm" class="container-fluid">      
        <b-row>
            <b-img id="photo" src="../assets/clientLogo.png"></b-img>
            <h1 id="title" class="ml-4 mt-3 width 2">Registro usuario</h1>
        </b-row>

        <h3 id="subtitle" class="mt-3">Datos bancarios</h3>

        <label id="labels" class="mt-3 mb-0"> IBAN </label>
        <b-form-input id="ibanText" type="text" :state="ibanError"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> Nº de cuenta bancaria </label>
        <b-form-input id="bankAccountText" type="number" :state="bankAccountError"> </b-form-input>

        <router-link to="/registerClient1">
            <button id="buttons" class="btn btn-primary mb-2">Atrás</button>
        </router-link>
        <button id="buttons" @click="createClient" class="btn btn-primary mb-2">Crear</button>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "RegisterClient1",
    
    data() {
        return {
            ibanError: undefined,
            bankAccountError: undefined,
        };
    },
    methods: {
        createClient () {
            // Campo para saber si hay error
            var error = false

            //Recoger los datos de los campos
            var ibanText = document.getElementById("ibanText")
            var bankAccountText = document.getElementById("bankAccountText")

            //Comprobación de campos
            if (ibanText.value == "" || ibanText.value.length != 4) { this.ibanError = false; error = true}
            if (bankAccountText.value == "" || bankAccountText.value.length != 20) { this.bankAccountError = false; error = true}

            //Crear cliente en la BD
            if (!error) console.log("asd");

            //Ir al menú de cliente (todavía no implementado)
            //if (!error) this.$router.push('/clientMenu');
        }
    }

}
</script>

<style>
    #groupForm {
        max-width: 500px;
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
