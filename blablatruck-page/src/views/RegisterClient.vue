<style> @import '/stylesheets/register.css'; </style>
<template>
    <div id="groupForm" class="container-fluid">
       
        <h2 class="mt-1">Información personal</h2>

        <label class="mt-3"> Nombre </label>
        <b-form-input type="text"> </b-form-input>
        <label class="mt-3"> Apellidos </label>
        <b-form-input type="text"> </b-form-input>
        <label class="mt-3"> Nombre de Usuario </label>
        <b-form-input type="text"> </b-form-input>
        <label class="mt-3"> Contraseña </label>
        <b-form-input type="password"> </b-form-input>
        <label class="mt-3"> DNI </label>
        <b-form-input type="text"> </b-form-input>
        <label class="mt-3"> Empresa </label>
        <b-form-input type="text"> </b-form-input>
        <label class="mt-3"> Teléfono </label>
        <b-form-input type="number"> </b-form-input>
        <button id="buttonLogin" @click="login" type="button" class="btn btn-primary mt-5 mb-2 mr-5">Cancelar</button>
        <button id="buttonLogin" @click="login" type="button" class="btn btn-primary mt-5 mb-2 ml-5">Siguiente</button>
    </div>
</template>
