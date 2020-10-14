<template>
    <div id="groupForm" class="container-fluid">
        <b-img src="../assets/logo-login.png" fluid alt="Fluid image"></b-img>
        
        <h2 class="mt-3">Inicio de sesión</h2>
        <h5 class="mt-2">La nueva app de transportes eficientes!</h5>

        <b-input class="mt-3" type="text" placeholder="Nombre de usuario"/>
        <b-input class="mt-2" type="password" placeholder="Contraseña"/>
        <button type="button" class="btn btn-primary mt-2 mb-2 btn-block" >Iniciar sesión</button>
        <a id="links">¿Ha olvidado su contraseña?</a>
        <div id="linksBottom" class="fixed-bottom mb-3">
            <a id="links">¿Quiere registrase como transportista?</a>
            <br>
            <a id="links">¿Quiere registrase como cliente para crear encargos?</a>
        </div>
    </div>
</template>

<script>

export default {
    name: "Login"
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