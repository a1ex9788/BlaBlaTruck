<template>
  <div id="groupForm">
    <div id="groupTitle" class="container-fluid">
      <div class="row mt-2">
        <div class="col-md-2 nopadding">
          <b-img
            fluid
            alt=""
            id="photo"
            src="../../assets/carrierLogo.png"
          ></b-img>
        </div>
        <div class="col-md-10" id="titleDiv">
          <h2 id="title" class="mt-4">Registro transportista</h2>
        </div>
      </div>
      <h3 id="subtitle" class="mt-3">Datos camión</h3>
    </div>
    <div id="groupForm2" class="container-fluid">
      <label id="labels" class="mt-3 mb-0"> Naturaleza </label>
      <b-form-select
        id="natureText"
        type="text"
        :state="natureError"
        :options="natureOptions"
      >
      </b-form-select>
      <label id="labels" class="mt-3 mb-0"> Capacidad </label>
      <b-form-input
        @input="capacityError = undefined"
        id="capacityText"
        @click="showCapacityTextError = false"
        type="number"
        :state="capacityError"
        placeholder="(Ej.) 350"
      >
      </b-form-input>

      <b-tooltip
        :show="showCapacityTextError"
        target="capacityText"
        id="messageErrorCapacity"
        :title="capacityTextError"
        triggers="manual"
        variant="danger"
        placement="top"
      />

      <br /><br />
      <div id="groupTitle" class="container-fluid mt-3">
        <h3 id="subtitle">Datos bancarios</h3>
      </div>
      <label id="labels" class="mt-3 mb-0"> IBAN </label>
      <b-form-input
        id="ibanText"
        type="text"
        :state="ibanError"
        placeholder="(Ej.) ES57"
      >
      </b-form-input>
      <label id="labels" class="mt-3 mb-0"> Nº de cuenta bancaria </label>
      <b-form-input
        id="bankAccountText"
        type="number"
        :state="bankAccountError"
        placeholder="(Ej.) 01234567890123456789"
      >
      </b-form-input>
    </div>
    <router-link to="/registerCarrier1">
      <button id="buttons" class="btn btn-primary mb-2">Atrás</button>
    </router-link>
    <button id="buttons" @click="createCarrier" class="btn btn-primary mb-2">
      Crear
    </button>
  </div>
</template>

<script>
const axios = require("axios");
/* eslint-disable */
export default {
  name: "RegisterCarrier2",

  data() {
    return {
      showCapacityTextError: false,
      capacityTextError: "La capacidad solo acepta numeros positivos.",
      natureError: undefined,
      capacityError: undefined,
      ibanError: undefined,
      bankAccountError: undefined,

      natureOptions: [
        { value: "1", text: "Producto frágil" },
        { value: "2", text: "Producto perecedero" },
        { value: "3", text: "Mercancia peligrosa" },
      ],

      nombre: undefined,
      apellidos: undefined,
      username: undefined,
      contraseña: undefined,
      dni: undefined,
      telefono: undefined,
    };
  },
  created() {
    this.nombre = this.$route.params.nombre;
    this.apellidos = this.$route.params.apellidos;
    this.username = this.$route.params.username;
    this.contraseña = this.$route.params.contraseña;
    this.dni = this.$route.params.dni;
    this.telefono = this.$route.params.telefono;
    this.email = this.$route.params.email;
  },
  methods: {
    async createCarrier() {
      // Campo para saber si hay error
      var error = false;

      //Recoger los datos de los campos
      var natureText = document.getElementById("natureText");
      var capacityText = document.getElementById("capacityText");
      var ibanText = document.getElementById("ibanText");
      var bankAccountText = document.getElementById("bankAccountText");

      //Comprobación de campos
      this.natureError = true;
      this.capacityError = true;
      this.ibanError = true;
      this.bankAccountError = true;
      if (natureText.value == "") {
        this.natureError = false;
        error = true;
      }
      if (capacityText.value == "" || capacityText.value.trim().includes("-") || capacityText.value.trim().includes("e") ) {
        this.showCapacityTextError = true;
        this.capacityError = false;
        error = true;
      }
      if (
        ibanText.value == "" ||
        ibanText.value.length != 4 ||
        !isNaN(ibanText.value.substring(0, 2)) ||
        isNaN(ibanText.value.substring(2, 4))
      ) {
        this.ibanError = false;
        error = true;
      }
      if (bankAccountText.value == "" || bankAccountText.value.length != 20) {
        this.bankAccountError = false;
        error = true;
      }

      //Crear transportista en la BD
      if (!error) {
        await axios
          .post("http://localhost:3300/api/personas", {
            Nombre: this.nombre,
            Apellidos: this.apellidos,
            DNI: this.dni,
            Telefono: this.telefono,
            Email: this.email,
            Usuario: this.username,
            Contraseña: this.contraseña,
            IBAN: ibanText.value,
            NumeroCuentaBancaria: bankAccountText.value,
          })
          .then(
            (response) => {
              console.log(response); //si se crea con exito en la DB el usuario
            },
            (error) => {
              console.log(error); // si hay un error con la creacion o conexion
            }
          );
          console.log("test");
        // luego creamos el cliente
        await axios
          .post("http://localhost:3300/api/transportista", {
            DNI: this.dni,
            NaturalezaCamion: natureText.value,
            Capacidad: capacityText.value,
          })
          .then(
            (response) => {
              //console.log(response); //si se crea con exito en la DB el usuario
            },
            (error) => {
              //console.log(error); // si hay un error con la creacion o conexion
            }
          );
        this.$router.go(-2);
      }

      //Ir al menú de transportista (todavía no implementado)
      //if (!error) this.$router.push('/carrierMenu');
    },
  },
};
</script>

<style>
#groupForm {
  max-width: 500px;
  text-align: center;
  margin: 0 auto;
}
#groupTitle {
  max-width: 500px;
  text-align: center;
}
#titleDiv {
  padding-right: 12%;
}
@media (max-width: 480px) {
  #titleDiv {
    padding-right: 0%;
  }
}
#groupForm2 {
  max-width: 500px;
  text-align: left;
}
#buttons {
  margin: 10%;
  width: 100px;
}
#title {
  font-weight: bold;
}
#subtitle {
  text-decoration: underline;
}
.nopadding {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
