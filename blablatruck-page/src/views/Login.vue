<template>
    <div id="groupForm" class="container-fluid">
        <b-img src="../assets/logo-login.png" fluid alt="Fluid image"></b-img>
        
        <h2 class="mt-3">Inicio de sesión</h2>
        <h5 class="mt-2">La nueva app de transportes eficientes!</h5>

        <b-input class="mt-3" @input="isUsernameEmpty = undefined" :state="isUsernameEmpty" type="text" placeholder="Nombre de usuario" id="usernameText" trim/>
        <b-input class="mt-2" @input="isPasswordEmpty = undefined" :state="isPasswordEmpty" type="password" placeholder="Contraseña" id="passwordText" trim/>
        <button id="buttonLogin" @click="login" type="button" class="btn btn-primary mt-2 mb-2 btn-block">Iniciar sesión</button>
        <!--<a id="links">¿Ha olvidado su contraseña?</a>-->
        <div id="linksBottom" class="fixed-bottom mb-3">
            <router-link id="links" to="/registerCarrier1">¿Quiere registrase como transportista?</router-link>
            <br>
            <router-link id="links" to="/registerClient1">¿Quiere registrase como cliente para crear encargos?</router-link>
        </div>
    </div>
</template>

<script>
const axios = require('axios');
/* eslint-disable */
export default {
    name: "Login",
    
    data() {
        return {
            isUsernameEmpty: undefined,
            isPasswordEmpty: undefined
        };
    },
    methods: {
        async login () {
            // Campo para saber si hay error
            var errorLogin = false
            //Recoger los datos de los campos
            var usernameText = document.getElementById("usernameText")
            var passwordText = document.getElementById("passwordText")
            
            //Comprobación de campos con api
            if (usernameText.value ==  "" || usernameText.value ==  undefined)  { this.isUsernameEmpty = false; errorLogin = true}
            if (passwordText.value == "" || passwordText.value == undefined) { this.isPasswordEmpty = false; errorLogin = true}
            //Conexion a la api mediante axios
            console.log(usernameText.value);
            if (!errorLogin) {
                console.log("no ha habido error");
                await axios.get('http://localhost:3300/api/personas/login', {
                    params: {
                        Usuario: usernameText.value,
                        Contraseña: passwordText.value
                    }
                    }).then((response) => {
                    console.log(response); //si se crea con exito en la DB el usuario
                }, (error) => {
                    console.log(error); // si hay un error con la creacion o conexion
                });
            }
            //Carga la interfaz del tipo de usuario si el login es satisfactorio 
            //(de momento avisar si se ha hecho login bien)
            if (!errorLogin) alert("Logged!")
            else alert("Not Logged!") 
        }
    }

}
</script>

<style>
    #groupForm {
        max-width: 500px;
        margin: 0 auto;
    }
    #links{
        color: #28abb9;
        text-decoration: underline;
    }
</style>