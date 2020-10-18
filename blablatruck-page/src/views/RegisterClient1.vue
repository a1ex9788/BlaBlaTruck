<template>
    <div id="groupForm" class="container-fluid">      
        <b-row>
            <b-img id="photo" src="../assets/clientLogo.png"></b-img>
            <h1 id="title" class="ml-4 mt-3 width 2">Registro usuario</h1>
        </b-row>

        <h3 id="subtitle" class="mt-3">Información personal</h3>

        <label id="labels" class="mt-3 mb-0"> Nombre </label>
        <b-form-input id="nameText" type="text" :state="nameError"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> Apellidos </label>
        <b-form-input id="surnamesText" type="text" :state="surnamesError"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> Nombre de Usuario </label>
        <b-form-input id="usernameText" type="text" :state="usernameError"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> Contraseña </label>
        <b-form-input id="passwordText" type="password" :state="passwordError"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> DNI </label>
        <b-form-input id="dniText" type="text" :state="dniError"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> Empresa </label>
        <b-form-input id="companyText" type="text" :state="companyError"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> Teléfono </label>
        <b-form-input id="telephoneText" type="number" :state="telephoneError"> </b-form-input>

        <router-link to="/login">
            <button id="buttons" class="btn btn-primary mb-2">Cancelar</button>
        </router-link>
        <router-link to="/registerClient2">
            <button id="buttons" @click="next" class="btn btn-primary mb-2">Siguiente</button>
        </router-link>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "RegisterClient1",
    
    data() {
        return {
            nameError: undefined,
            surnamesError: undefined,
            usernameError: undefined,
            passwordError: undefined,
            dniError: undefined,
            companyError: undefined,
            telephoneError: undefined,
        };
    },
    methods: {
        next () {
            // Campo para saber si hay error
            var error = false

            //Recoger los datos de los campos
            var nameText = document.getElementById("nameText")
            var surnamesText = document.getElementById("surnamesText")
            var usernameText = document.getElementById("usernameText")
            var passwordText = document.getElementById("passwordText")
            var dniText = document.getElementById("dniText")
            var companyText = document.getElementById("companyText")
            var telephoneText = document.getElementById("telephoneText")

            //Comprobación de campos
            if (nameText.value == "") { this.nameError = false; error = true}
            if (surnamesText.value == "") { this.surnamesError = false; error = true}
            if (usernameText.value == "") { this.usernameError = false; error = true}
            if (passwordText.value == "") { this.passwordError = false; error = true}
            if (dniText.value == "") { this.dniError = false; error = true}
            if (companyText.value == "") { this.companyError = false; error = true}
            if (telephoneText.value == "") { this.telephoneError = false; error = true}

            //que pase a RegisterClient2
            if (!error) ;
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
