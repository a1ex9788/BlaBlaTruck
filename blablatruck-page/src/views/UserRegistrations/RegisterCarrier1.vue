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
      <h3 id="subtitle" class="mt-3">Información personal</h3>
    </div>
    <div id="groupForm2" class="container-fluid">
      <label id="labels" class="mt-3 mb-0"> Nombre </label>
      <b-form-input
        id="nameText"
        type="text"
        :state="nameError"
        placeholder="(Ej.) Federico"
      >
      </b-form-input>
      <label id="labels" class="mt-3 mb-0"> Apellidos </label>
      <b-form-input
        id="surnamesText"
        type="text"
        :state="surnamesError"
        placeholder="(Ej.) García Lorca"
      >
      </b-form-input>
      <label id="labels" class="mt-3 mb-0"> DNI </label>
      <b-form-input
        @input="dniError = undefined"
        @click="showDniTextError = false"
        id="dniText"
        type="text"
        :state="dniError"
        placeholder="(Ej.) 12345678L"
      >
      </b-form-input>
      <b-tooltip
        :show="showDniTextError"
        target="dniText"
        id="messageErrorDni"
        :title="dniTextError"
        triggers="manual"
        variant="danger"
        placement="top"
      />
      <label id="labels" class="mt-3 mb-0"> Teléfono </label>
      <b-form-input
        id="telephoneText"
        type="number"
        :state="telephoneError"
        placeholder="(Ej.) 123456789"
      >
      </b-form-input>
      <label id="labels" class="mt-3 mb-0"> Correo electrónico </label>
      <b-form-input
        id="emailText"
        type="text"
        :state="emailError"
        placeholder="(Ej.) federicoGL@gmail.com"
      >
      </b-form-input>
      <label id="labelUsername" class="mt-3 mb-0"> Nombre de Usuario </label>
      <b-form-input
        id="usernameText"
        @input="usernameError = undefined"
        @click="showUsernameTextError = false"
        type="text"
        :state="usernameError"
        placeholder="(Ej.) fedgalo"
      >
      </b-form-input>
      <b-tooltip
        :show="showUsernameTextError"
        target="usernameText"
        id="messageErrorUsername"
        :title="usernameTextError"
        triggers="manual"
        variant="danger"
        placement="top"
      />
      <label id="labels" class="mt-3 mb-0"> Contraseña </label>
      <b-form-input id="passwordText" type="password" :state="passwordError">
      </b-form-input>
    </div>
    <router-link to="/login">
      <button id="buttons" class="btn btn-primary mb-2">Cancelar</button>
    </router-link>
    <button id="buttons" @click="next" class="btn btn-primary mb-2">
      Siguiente
    </button>
  </div>
</template>

<script>
const axios = require("axios");
/* eslint-disable */
export default {
  name: "RegisterCarrier1",

  data() {
    return {
      showDniTextError: false,
      dniTextError: "El DNI introducido ya está registrado en otra cuenta",
      showUsernameTextError: false,
      usernameTextError:
        "El nombre de usuario introducido ya está registrado en otra cuenta",
      nameError: undefined,
      surnamesError: undefined,
      usernameError: undefined,
      passwordError: undefined,
      dniError: undefined,
      telephoneError: undefined,
      emailError: undefined,
    };
  },
  methods: {
    async next() {
      // Campo para saber si hay error
      var error = false;

      //Recoger los datos de los campos
      var nameText = document.getElementById("nameText");
      var surnamesText = document.getElementById("surnamesText");
      var usernameText = document.getElementById("usernameText");
      var passwordText = document.getElementById("passwordText");
      var dniText = document.getElementById("dniText");
      var telephoneText = document.getElementById("telephoneText");
      var emailText = document.getElementById("emailText");

      //Comprobación de campos
      this.nameError = true;
      this.surnamesError = true;
      this.usernameError = true;
      this.passwordError = true;
      this.dniError = true;
      this.telephoneError = true;
      this.emailError = true;

      if (nameText.value.trim() == "") {
        this.nameError = false;
        error = true;
      }
      if (surnamesText.value.trim() == "") {
        this.surnamesError = false;
        error = true;
      }

      if (passwordText.value.trim() == "") {
        this.passwordError = false;
        error = true;
      }

      if (
        telephoneText.value.trim() == "" ||
        telephoneText.value.trim().length != 9
      ) {
        this.telephoneError = false;
        error = true;
      }
      if (
        emailText.value.trim() == "" ||
        !emailText.value.trim().includes("@") ||
        !emailText.value.trim().includes(".")
      ) {
        this.emailError = false;
        error = true;
      }
      if (
        dniText.value.trim() == "" ||
        dniText.value.trim().length != 9 ||
        isNaN(dniText.value.trim().substring(0, 8)) ||
        !isNaN(dniText.value.trim().substring(8, 9))
      ) {
        this.dniError = false;
        error = true;
      } else {
        await axios
          .get("http://localhost:3300/api/personas/" + dniText.value.trim())
          .then(
            (response) => {
              if (response.status == 200) {
                this.showDniTextError = true;
                this.dniError = false;
                error = true;
              }
            },
            (error) => {}
          );
      }

      if (usernameText.value.trim() == "") {
        this.usernameError = false;
        error = true;
      } else {
        await axios
          .get("http://localhost:3300/api/personas/userExists/", {
            params: { Usuario: usernameText.value.trim() },
          })
          .then(
            (response) => {
              if (response.data) {
                this.showUsernameTextError = true;
                this.usernameError = false;
                error = true;
              }
            },
            (error) => {}
          );
      }

      //Pasar a RegisterCarrier2
      if (!error)
        this.$router.push({
          name: "RegisterCarrier2",
          params: {
            nombre: nameText.value,
            apellidos: surnamesText.value,
            username: usernameText.value,
            contraseña: passwordText.value,
            dni: dniText.value,
            telefono: telephoneText.value,
            email: emailText.value,
          },
        });
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
