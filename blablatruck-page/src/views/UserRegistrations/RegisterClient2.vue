<template>
    <div id="groupForm" class="container-fluid">      
        <b-row>
            <b-img id="photo" src="../../assets/clientLogo.png"></b-img>
            <h1 id="title" class="ml-4 mt-3 width 2">Registro usuario</h1>
        </b-row>

        <h3 id="subtitle" class="mt-3">Datos bancarios</h3>

        <label id="labels" class="mt-3 mb-0"> IBAN </label>
        <b-form-input @input="ibanError = undefined" id="ibanText" type="text" :state="ibanError" placeholder="(Ej.) ES57"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> Nº de cuenta bancaria </label>
        <b-form-input @input="bankAccountError = undefined" id="bankAccountText" type="number" :state="bankAccountError" placeholder="(Ej.) 01234567890123456789"> </b-form-input>

        <router-link to="/registerClient1">
            <button id="buttons" class="btn btn-primary mb-2">Atrás</button>
        </router-link>
        <button id="buttons" @click="createClient" class="btn btn-primary mb-2">Crear</button>
    </div>
</template>

<script>
const axios = require('axios');
/* eslint-disable */
export default {
    name: "RegisterClient2",
    
    data() {
        return {
            ibanError: undefined,
            bankAccountError: undefined,

            nombre: undefined,
            apellidos: undefined,
            username: undefined,
            contraseña: undefined,
            dni: undefined,
            empresa: undefined,
            telefono: undefined
        };
    },
    created() {
        this.nombre = this.$route.params.nombre
        this.apellidos = this.$route.params.apellidos
        this.username = this.$route.params.username
        this.contraseña = this.$route.params.contraseña
        this.dni = this.$route.params.dni
        this.empresa = this.$route.params.empresa
        this.telefono = this.$route.params.telefono
        this.email = this.$route.params.email
    },
    methods: {
        async createClient () {
            // Campo para saber si hay error
            var error = false

            //Recoger los datos de los campos
            var ibanText = document.getElementById("ibanText")
            var bankAccountText = document.getElementById("bankAccountText")

            //Comprobación de campos
            this.ibanError = true
            this.bankAccountError = true

            if (ibanText.value == "" || ibanText.value.length != 4
                || !isNaN(ibanText.value.substring(0,2))
                || isNaN(ibanText.value.substring(2,4))) { this.ibanError = false; error = true}
            if (bankAccountText.value == "" || bankAccountText.value.length != 20) { this.bankAccountError = false; error = true}

            //Crear cliente en la BD
            if (!error) {
                await axios.post('http://localhost:3300/api/personas', {
                Nombre: this.nombre,
                Apellidos: this.apellidos,
                DNI: this.dni,
                Telefono: this.telefono,
                Email: this.email,
                Usuario: this.username,
                Contraseña: this.contraseña,
                IBAN: ibanText.value,
                NumeroCuentaBancaria: bankAccountText.value
                }).then((response) => {
                    console.log(response); //si se crea con exito en la DB el usuario
                }, (error) => {
                    console.log(error); // si hay un error con la creacion o conexion
                });
                // luego creamos el cliente
                await axios.post('http://localhost:3300/api/cliente', {
                    DNI: this.dni,
                    Empresa: this.empresa
                }).then((response) => {
                    console.log(response); //si se crea con exito en la DB el usuario
                }, (error) => {
                    console.log(error); // si hay un error con la creacion o conexion
                });
            }

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
