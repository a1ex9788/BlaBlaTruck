<template>
    <div id="groupForm" class="container-fluid">      
        <b-row>
            <b-img id="photo" src="../assets/clientLogo.png"></b-img>
            <h1 id="title" class="ml-4 mt-3 width 2">Registro usuario</h1>
        </b-row>

        <h3 id="subtitle" class="mt-3">Datos bancarios</h3>
        <label id="labels" class="mt-3 mb-0"> IBAN </label>
        <b-form-input id="ibanText" type="text"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> Nº de cuenta bancaria </label>
        <b-form-input id="ncCuentaBancariaText" type="text"> </b-form-input>

        <label id="errorText" class="mt-4 mb-0"> Error </label>

        <router-link to="/registerClient1">
            <button id="buttons" class="btn btn-primary mb-2">Atrás</button>
        </router-link>
        <button id="buttons" @click="onClickCrear" class="btn btn-primary mb-2">Crear</button>
    </div>
</template>

<script>
const axios = require('axios');
export default {
    name: "RegisterClient2",
    data() {
        return{
            nombre: undefined,
            apellidos: undefined,
            username: undefined,
            contraseña: undefined,
            dni: undefined,
            empresa: undefined,
            telefono: undefined
        }
    },
    created() {
        this.nombre = this.$route.params.nombre
        this.apellidos = this.$route.params.apellidos
        this.username = this.$route.params.username
        this.contraseña = this.$route.params.contraseña
        this.dni = this.$route.params.dni
        this.empresa = this.$route.params.empresa
        this.telefono = this.$route.params.telefono
    },
    methods: {
        //Conectarse a la api para crear un cliente
        onClickCrear() {
            /*axios.post('localhost:3300/api/personas', {
                Nombre: this.nombre,
                Apellidos: this.apellidos,
                DNI: this.dni,
                Telefono: this.telefono,
                Email: this.email,
                Usuario: this.username,
                Contraseña: this.contraseña,
                IBAN: document.getElementById("ibanText").value,
                NumeroCuentaBancaria: document.getElementById("ncCuentaBancariaText").value
            }).then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });*//*
            axios.post('localhost:3300/api/personas', {
                Nombre: 'Jesus',
                Apellidos: 'Garcia',
                DNI: '12345687Z',
                Telefono: '620111111',
                Email: 'correo@correo.com',
                Usuario: 'user',
                Contraseña: 'user',
                IBAN: 'ES11',
                NumeroCuentaBancaria: '618253694888314000'
            }).then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });*/
            axios.get('localhost:3300/api/personas')
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
        max-width: 500px;
        fill: auto;
    }
    #photo
    {
        height: 100px;
        width: 100px;
    }
    #errorText
    {
        text-align: left;
        max-width: 500px;
        fill: auto;
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
