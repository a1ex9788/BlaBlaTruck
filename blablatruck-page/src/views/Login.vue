<template>
    <div id="groupForm" class="container-fluid">
        <b-img src="../assets/logo-login.png" fluid alt="Fluid image" class="mt-5"></b-img>
        
        <h2 class="mt-3">Inicio de sesión</h2>
        <h5 class="mt-2">La nueva app de transportes eficientes!</h5>

        <b-input class="mt-3" @input="isUsernameEmpty = undefined; isLoginFailed= false" :state="isUsernameEmpty" type="text" placeholder="Nombre de usuario" id="usernameText" trim/>
        <b-input class="mt-2" @input="isPasswordEmpty = undefined; isLoginFailed= false" :state="isPasswordEmpty" type="password" placeholder="Contraseña" id="passwordText" trim/>
        <button id="buttonLogin" @click="login" type="button" class="btn btn-primary mt-2 mb-2 btn-block">Iniciar sesión</button>
        <b-tooltip :show="isLoginFailed" placement="bottom" target="buttonLogin" title="El usuario y/o la contraseña no son correctos" triggers="manual" variant="danger"/>
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
            isPasswordEmpty: undefined,
            isLoginFailed: false,
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
            if (!errorLogin) {
                console.log("no ha habido error");
                await axios.get('http://localhost:3300/api/personas/login', {
                    params: {
                        Usuario: usernameText.value.trim(),
                        Contraseña: passwordText.value.trim()
                    }}, {
                        withCredentials: true
                    }
                ).then((response) => {
    
                    if (response.status == 200) {
                        let d = new Date();
                        d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
                        let expires = "expires=" + d.toUTCString();
                        document.cookie =
                            "loginToken=" + JSON.stringify(response.data) + ";"
                            + expires + ";path=/"
                    }
                }, (error) => {
                    console.log(error); // si hay un error con el logueo o conexion
                });
            }
            //Comprueba si ha fallado el login y muestra un mensaje de error
            if(this.$cookies.get("loginToken").Type === 'NotLogged') {
                this.isLoginFailed = true
            }else {
                //Carga la interfaz del tipo de usuario si el login es satisfactorio 
            }
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