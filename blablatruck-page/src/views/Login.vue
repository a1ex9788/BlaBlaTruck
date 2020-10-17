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
            <a id="links">¿Quiere registrase como transportista?</a>            
            <br>
            <router-link to="/registerClient">
            <a id="links">¿Quiere registrase como cliente para crear encargos?</a>
            </router-link>
        </div>
    </div>
</template>

<script>
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
        login () {
            // Campo para saber si hay error
            var errorLogin = false
            //Recoger los datos de los campos
            var usernameText = document.getElementById("usernameText")
            var passwordText = document.getElementById("passwordText")
            //Comprobación de campos con api
            if (usernameText.value == "") { this.isUsernameEmpty = false; errorLogin = true}
            if (passwordText.value == "") { this.isPasswordEmpty = false; errorLogin = true}
            //Conexion a la api mediante axios

            //Carga la interfaz del tipo de usuario si el login es satisfactorio 
            //(de momento avisar si se ha hecho login bien)
            console.log(usernameText.value)
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