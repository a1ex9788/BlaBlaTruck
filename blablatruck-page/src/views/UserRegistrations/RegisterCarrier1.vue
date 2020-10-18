<template>
    <div>
        <div id="groupForm2" class="container-fluid">
            <b-row>
                <b-img id="photo" src="../../assets/carrierLogo.png"></b-img>
                <h1 id="title" class="ml-4 mt-3 width 2">Registro transportista</h1>
            </b-row>
        </div>
        <div id="groupForm" class="container-fluid">      
            <h3 id="subtitle" class="mt-3">Información personal</h3>

            <label id="labels" class="mt-3 mb-0"> Nombre </label>
            <b-form-input id="nameText" type="text" :state="nameError" placeholder="Federico"> </b-form-input>
            <label id="labels" class="mt-3 mb-0"> Apellidos </label>
            <b-form-input id="surnamesText" type="text" :state="surnamesError" placeholder="García Lorca"> </b-form-input>
            <label id="labels" class="mt-3 mb-0"> DNI </label>
            <b-form-input id="dniText" type="text" :state="dniError" placeholder="12345678L"> </b-form-input>
            <label id="labels" class="mt-3 mb-0"> Teléfono </label>
            <b-form-input id="telephoneText" type="number" :state="telephoneError" placeholder="123456789"> </b-form-input>
            <label id="labels" class="mt-3 mb-0"> Correo electrónico </label>
            <b-form-input id="emailText" type="text" :state="emailError" placeholder="federicoGL@gmail.com"> </b-form-input>
            <label id="labels" class="mt-3 mb-0"> Nombre de Usuario </label>
            <b-form-input id="usernameText" type="text" :state="usernameError" placeholder="fedgalo"> </b-form-input>
            <label id="labels" class="mt-3 mb-0"> Contraseña </label>
            <b-form-input id="passwordText" type="password" :state="passwordError"> </b-form-input>

            <router-link to="/login">
                <button id="buttons" class="btn btn-primary mb-2">Cancelar</button>
            </router-link>
            <button id="buttons" @click="next" class="btn btn-primary mb-2">Siguiente</button>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "RegisterCarrier1",
    
    data() {
        return {
            nameError: undefined,
            surnamesError: undefined,
            usernameError: undefined,
            passwordError: undefined,
            dniError: undefined,
            telephoneError: undefined,
            emailError: undefined,
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
            var telephoneText = document.getElementById("telephoneText")
            var emailText = document.getElementById("emailText")

            //Comprobación de campos
            this.nameError = true
            this.surnamesError = true
            this.usernameError = true
            this.passwordError = true
            this.dniError = true
            this.telephoneError = true
            this.emailError = true

            if (nameText.value == "") { this.nameError = false; error = true}
            if (surnamesText.value == "") { this.surnamesError = false; error = true}
            if (usernameText.value == "") { this.usernameError = false; error = true}
            if (passwordText.value == "") { this.passwordError = false; error = true}
            if (dniText.value == "" || dniText.value.length != 9) { this.dniError = false; error = true}
            if (telephoneText.value == "" || telephoneText.value.length != 9) { this.telephoneError = false; error = true}
            if (emailText.value == "") { this.emailError = false; error = true}

            //Pasar a RegisterCarrier2
            if (!error) this.$router.push('/registerCarrier2');
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
