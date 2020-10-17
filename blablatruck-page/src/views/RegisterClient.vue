<template>
    <div id="groupForm" class="container-fluid">       
        <h2 class="mt-1">Información personal</h2>

        <label id="labels" class="mt-3"> Nombre </label>
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
        
        <button id="buttons" class="btn btn-primary mb-2">Cancelar</button>
        <button id="buttons" class="btn btn-primary mb-2">Siguiente</button>
    </div>
</template>

<style>
    #groupForm {
        max-width: 500px;
    }
    #buttons{
        margin: 10%;
        margin-top: 20%;
    }
    #labels{
        margin-right: 0initial;
    }
</style>
