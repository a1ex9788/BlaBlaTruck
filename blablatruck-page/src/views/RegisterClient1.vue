<template>
    <div id="groupForm" class="container-fluid">      
        <b-row>
            <b-img id="photo" src="../assets/clientLogo.png"></b-img>
            <h1 id="title" class="ml-4 mt-3 width 2">Registro usuario</h1>
        </b-row>

        <h3 id="subtitle" class="mt-3">Información personal</h3>

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

        <label id="errorText" class="mt-4 mb-0"> Error </label>

        <router-link to="/login">
            <button id="buttons" class="btn btn-primary mb-2">Cancelar</button>
        </router-link>
        <router-link to="/registerClient2">
            <button id="buttons" class="btn btn-primary mb-2">Siguiente</button>
        </router-link>
    </div>
</template>

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
