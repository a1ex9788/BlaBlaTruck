<template>
    <div id="groupForm" class="container-fluid">      
        <b-row>
            <b-img id="photo" src="../assets/clientLogo.png"></b-img>
            <h1 class="ml-4 mt-3 width 2">Registro usuario</h1>
        </b-row>

        <h3 class="mt-3">Datos bancarios</h3>

        <label id="labels" class="mt-3 mb-0"> IBAN </label>
        <b-form-input type="text"> </b-form-input>
        <label id="labels" class="mt-3 mb-0"> Nº de cuenta bancaria </label>
        <b-form-input type="text"> </b-form-input>

        <button id="buttons" class="btn btn-primary mb-2">Atrás</button>
        <button id="buttons" class="btn btn-primary mb-2">Siguiente</button>
    </div>
</template>

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
