<!--<template>
  <b-container fluid>
    <b-row class="my-1" v-for="type in types" :key="type">
      <b-col sm="3">
        <label :for="`type-${type}`">Type <code>{{ type }}</code>:</label>
      </b-col>
      <b-col sm="9">
        <label :for="`type-${type}`">Type <code>{{ type }}</code>:</label>
        <b-form-input :id="`type-${type}`" :type="type"></b-form-input>
      </b-col>
    </b-row>
    <b-row>
      <b-form-input v-model="text" placeholder="Enter your name"></b-form-input>
      <b-form-group label-size="lg" label="Información personal"> </b-form-group>
       <h3 class="mt-3"> Nombre13wdfdwffggr </h3>
       <h5 class="mt-2"> Nombre13 </h5>
      <b-form-group label="Nombre2"> </b-form-group>
      <b-form-input type="text"> </b-form-input>
      <label> Apellidos </label>
      <b-form-input type="text"> </b-form-input>
      <label> Nombre de Usuario </label>
      <b-form-input type="text"> </b-form-input>
      <label> Contraseña </label>
      <b-form-input type="password"> </b-form-input>
      <label> DNI </label>
      <b-form-input type="text"> </b-form-input>
      <label> Empresa </label>
      <b-form-input type="text"> </b-form-input>
      <label> Teléfono </label>
      <b-form-input type="number"> </b-form-input>
    </b-row>

  </b-container>
</template>  -->
<template>
    <div id="groupForm" class="container-fluid">
       
        <h2 class="mt-1">Información personal</h2>

        <label> Nombre </label>
        <b-form-input type="text"> </b-form-input>
        <label> Apellidos </label>
        <b-form-input type="text"> </b-form-input>
        <label> Nombre de Usuario </label>
        <b-form-input type="text"> </b-form-input>
        <label> Contraseña </label>
        <b-form-input type="password"> </b-form-input>
        <label> DNI </label>
        <b-form-input type="text"> </b-form-input>
        <label> Empresa </label>
        <b-form-input type="text"> </b-form-input>
        <label> Teléfono </label>
        <b-form-input type="number"> </b-form-input>
        <b-row> 

            <button id="buttonLogin" @click="login" type="button" class="btn btn-primary mt-2 mb-2 btn-block">Iniciar sesión</button>
            <button id="buttonLogin" @click="login" type="button" class="btn btn-primary mt-2 mb-2 btn-block">Iniciar sesión2</button>
        </b-row>    
        <button id="buttonLogin" @click="login" type="button" class="btn btn-primary mt-2 mb-2 btn-block">Iniciar sesión</button>
        <div id="linksBottom" class="fixed-bottom mb-3">
            <b-button variant="danger">Atrás</b-button>
            <b-button variant="success">Siguiente</b-button>
        </div>
    </div>
</template>


<script>
  export default {
    data() {
      return {
        types: [
          'text',
          'number',
          'email',
          'password',
          'search',
          'url',
          'tel',
          'date',
          'time',
          'range',
          'color'
        ]
      }
    }
  }
</script>