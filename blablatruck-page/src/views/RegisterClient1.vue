<template>
    <div id="groupForm" class="container-fluid">      
        <b-row>
            <b-img id="photo" src="../assets/clientLogo.png"></b-img>
            <h1 id="title" class="ml-4 mt-3 width 2">Registro usuario</h1>
        </b-row>

        <h3 id="subtitle" class="mt-3">Información personal</h3>

        <label id="labels" class="mt-3 mb-0"> Nombre </label>
        <b-form-input id="nombreText" type="text"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> Apellidos </label>
        <b-form-input id="apellidosText" type="text"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> Nombre de Usuario </label>
        <b-form-input id="usernameText" type="text"> </b-form-input>
        <label id="labels"  class="mt-3 mb-0"> Contraseña </label>
        <b-form-input id="contraseñaText" type="password"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> DNI </label>
        <b-form-input id="dniText" type="text"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> Empresa </label>
        <b-form-input id="empresaText" type="text"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> Teléfono </label>
        <b-form-input id="telefonoText" type="tel"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> Email </label>
        <b-form-input id="emailText" type="tel"> </b-form-input>

        <label id="errorText" class="mt-4 mb-0"> Error </label>

        <router-link to="/login">
            <button id="buttons" class="btn btn-primary mb-2">Cancelar</button>
        </router-link>
        <router-link :to="{name:'RegisterClient2', params:{ nombre:this.nombre, apellidos:this.apellidos,
             username:this.username, contraseña:this.contraseña, dni:this.dni, empresa:this.empresa, telefono:this.telefono, email:this.email}}">
            <button id="buttons" @click="onClickSiguiente" class="btn btn-primary mb-2">Siguiente</button>
        </router-link>
    </div>
</template>

<script>

export default {
    data() {
        return{
            nombre: undefined,
            apellidos: undefined,
            username: undefined,
            contraseña: undefined,
            dni: undefined,
            empresa: undefined,
            telefono: undefined,
            email: undefined
        }
    },
    mounted() {
    },
    methods: {
        onClickSiguiente() {
            this.nombre = document.getElementById("nombreText").value
            this.apellidos = document.getElementById("apellidosText").value
            this.username = document.getElementById("usernameText").value
            this.contraseña = document.getElementById("contraseñaText").value
            this.dni = document.getElementById("dniText").value
            this.empresa = document.getElementById("empresaText").value
            this.telefono = document.getElementById("telefonoText").value
            this.telefono = document.getElementById("emailText").value
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
        margin-top: 5%;
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
    #errorText
    {
        text-align: left;
        width: 500px;
        color: red;
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
