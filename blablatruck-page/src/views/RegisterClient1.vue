<template>
    <div id="groupForm" class="container-fluid">      
        <b-row>
            <b-img id="photo" src="../assets/clientLogo.png"></b-img>
            <h1 class="ml-4 mt-3 width 2">Registro usuario</h1>
        </b-row>

        <h3 class="mt-3">Información personal</h3>

        <label id="labels" class="mt-3 mb-0"> Nombre </label>
        <b-form-input type="text"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> Apellidos </label>
        <b-form-input type="text"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> Nombre de Usuario </label>
        <b-form-input type="text"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> Contraseña </label>
        <b-form-input type="password"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> DNI </label>
        <b-form-input type="text"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> Empresa </label>
        <b-form-input type="text"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> Teléfono </label>
        <b-form-input type="tel"> </b-form-input>

        <button id="buttons" class="btn btn-primary mb-2">Cancelar</button>
        <button id="buttons" @click="next" class="btn btn-primary mb-2">Siguiente</button>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: "RegisterClient1",
    
    data() {
    },
    methods: {
        next () {
            const User = {
                template: '<div>User</div>'
            }

            const router = new VueRouter({
                routes: [
                    {path:'./views/registerClient2', component: User}
                ]
            })

            return router
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
        margin-top: 15%;
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
</style>
