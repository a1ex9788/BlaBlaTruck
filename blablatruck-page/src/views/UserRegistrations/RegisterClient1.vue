<template>
  <div id="groupForm" class="container-fluid">
    <b-row>
      <b-img id="photo" src="../../assets/clientLogo.png"></b-img>
      <h1 id="title" class="ml-4 mt-3 width 2">Registro usuario</h1>
    </b-row>

    <h3 id="subtitle" class="mt-3">Información personal</h3>

    <label id="labels" class="mt-3 mb-0"> Nombre </label>
    <b-form-input
      @input="nameError = undefined"
      id="nameText"
      type="text"
      :state="nameError"
      placeholder="(Ej.) Federico"
    >
    </b-form-input>
    <label id="labels" class="mt-3 mb-0"> Apellidos </label>
    <b-form-input
      @input="surnamesError = undefined"
      id="surnamesText"
      type="text"
      :state="surnamesError"
      placeholder="(Ej.) García Lorca"
    >
    </b-form-input>
    <label id="labels" class="mt-3 mb-0"> DNI </label>
    <b-form-input
      @input="
        dniError = undefined;
        showDniTextError = false;
      "
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
      placement="right"
    />
    <label id="labels" class="mt-3 mb-0"> Empresa </label>
    <b-form-input
      @input="companyError = undefined"
      id="companyText"
      type="text"
      :state="companyError"
      placeholder="(Ej.) Fracoped S.L."
    >
    </b-form-input>
    <label id="labels" class="mt-3 mb-0"> Teléfono </label>
    <b-form-input
      @input="telephoneError = undefined"
      id="telephoneText"
      type="number"
      :state="telephoneError"
      placeholder="(Ej.) 123456789"
    >
    </b-form-input>
    <label id="labels" class="mt-3 mb-0"> Correo electrónico </label>
    <b-form-input
      @input="emailError = undefined"
      id="emailText"
      type="text"
      :state="emailError"
      placeholder="(Ej.) federicoGL@gmail.com"
    >
    </b-form-input>
    <label id="labels" class="mt-3 mb-0"> Nombre de Usuario </label>
    <b-form-input
      @input="
        usernameError = undefined;
        showUsernameTextError = false;
      "
      id="usernameText"
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
      placement="right"
    />
    <label id="labels" class="mt-3 mb-0"> Contraseña </label>
    <b-form-input
      @input="passwordError = undefined"
      id="passwordText"
      type="password"
      :state="passwordError"
    >
    </b-form-input>

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
  name: "RegisterClient1",

  data() {
    return {
      showDniTextError: false,
      dniTextError: "El DNI introducido ya está registrado en otra cuenta",
      showUsernameTextError: false,
      usernameTextError:
        "El nombre de usuario introducido ya está registrado en otra cuenta",
      nameError: undefined,
      surnamesError: undefined,
      dniError: undefined,
      companyError: undefined,
      telephoneError: undefined,
      emailError: undefined,
      usernameError: undefined,
      passwordError: undefined,
    };
  },
  methods: {
    async next() {
      // Campo para saber si hay error
      var error = false;

      //Recoger los datos de los campos
      var nameText = document.getElementById("nameText");
      var surnamesText = document.getElementById("surnamesText");
      var dniText = document.getElementById("dniText");
      var companyText = document.getElementById("companyText");
      var telephoneText = document.getElementById("telephoneText");
      var emailText = document.getElementById("emailText");
      var usernameText = document.getElementById("usernameText");
      var passwordText = document.getElementById("passwordText");

      //Comprobación de campos
      this.nameError = true;
      this.surnamesError = true;
      this.companyError = true;
      this.usernameError = true;
      this.passwordError = true;
      this.dniError = true;
      this.telephoneError = true;
      this.emailError = true;

      if (nameText.value == "") {
        this.nameError = false;
        error = true;
      }
      if (surnamesText.value == "") {
        this.surnamesError = false;
        error = true;
      }
      if (
        dniText.value == "" ||
        dniText.value.length != 9 ||
        isNaN(dniText.value.substring(0, 8)) ||
        !isNaN(dniText.value.substring(8, 9))
      ) {
        this.dniError = false;
        error = true;
      } else
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
      if (companyText.value == "") {
        this.companyError = false;
        error = true;
      }
      if (telephoneText.value == "" || telephoneText.value.length != 9) {
        this.telephoneError = false;
        error = true;
      }
      if (
        emailText.value == "" ||
        !emailText.value.includes("@") ||
        !emailText.value.includes(".")
      ) {
        this.emailError = false;
        error = true;
      }
      console.log(usernameText.value.trim());
      if (usernameText.value == "") {
        this.usernameError = false;
        error = true;
      } else
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
      if (passwordText.value == "") {
        this.passwordError = false;
        error = true;
      }

      //Pasar a RegisterClient2
      if (!error)
        this.$router.push({
          name: "RegisterClient2",
          params: {
            nombre: nameText.value.trim(),
            apellidos: surnamesText.value.trim(),
            username: usernameText.value.trim(),
            contraseña: passwordText.value.trim(),
            dni: dniText.value.trim(),
            empresa: companyText.value.trim(),
            telefono: telephoneText.value.trim(),
            email: emailText.value.trim(),
          },
        });
    },
  },
};
</script>

<style>
#groupForm {
  max-width: 500px;
}
#buttons {
  margin: 10%;
  width: 100px;
}
#labels {
  text-align: left;
  width: 500px;
}
#photo {
  height: 100px;
  width: 100px;
}
#title {
  font-weight: bold;
}
#subtitle {
  text-decoration: underline;
}
</style>
