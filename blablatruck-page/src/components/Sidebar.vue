<template>
  <div id="sidebar">
    <b-sidebar
      id="sidebar-1"
      title="BlablaTruck"
      bg-variant="dark"
      text-variant="light"
      shadow
    >
      <div class="px-3 py-2" id="sidebar-content">
        <hr style="background-color: white" />
        <p>Hola {{ this.nombreUsuario }}, ¿que quiere hacer?</p>
        <SidebarItem id="sidebarItem" hidden="true" />
      </div>
    <b-button id='closeSesionButton' class="ml-3" @click="cerrarSesion"> Cerrar sesión </b-button>
    </b-sidebar>
    <nav class="navbar navbar-dark bg-dark">
      <b-button
        class="button-nav"
        v-b-toggle.sidebar-1
        variant="outline-secondary"
        >☰</b-button
      >
    </nav>
  </div>
</template>

<script>
import $ from "jquery";
import SidebarItem from "./SidebarItem";
const axios = require("axios");
export default {
  name: "Sidebar",
  mounted() {
    this.generateSidebarContent();
  },
  components: { SidebarItem },
  data() {
    return {
      pagesClient: [
        {
          name: "Registrar paquete",
          path: "/priceCalculation",
        },
        {
          name: "Mis envíos",
          path: "/myShipments",
        },
        {
          name: "Mi perfil",
          path: "/profile",
        },
         {
          name: "Ubicación del transportista",
          path: "/navegator",
        },
         {
          name: "Buscar usuarios",
          path: "/profileBrowser",
        },
      ],
      pagesTransportist: [
        {
          name: "Mapa de encargos",
          path: "/navegator",
        },
        {
          name: "Mis envíos",
          path: "/myShipments",
        },
        {
          name: "Mi perfil",
          path: "/profile",
        },
         {
          name: "Buscar usuarios",
          path: "/profileBrowser",
        },
      ],
      nombreUsuario: undefined,
      transportista: undefined,
      cliente: undefined,
      personaDNI: undefined,
      loginPath: "/login"
    };
  },
  methods: {
      async nombre(){
          var res;
        //   await axios
        // .get("http://localhost:3300/api/personas/" + this.$cookies.get("loginToken").Dni, {})
        // .then(
        //   (response) => {
        //     res = response.data[0];
        //   },
        //   (error) => {
        //     console.log(error);
        //   }
        // );
        // this.nombreUsuario = res[0].Nombre;
        return;
      },

    generateSidebarContent() {
      var cookie = this.$cookies.get("loginToken").Type;
      if (cookie === "Cliente") {
        this.pagesClient.forEach((page) => {
          var $clone = $("#sidebarItem").clone();
          $clone.attr("href", page.path);
          $clone[0].firstChild.innerText = page.name;
          $clone.attr("hidden", false);
          $("#sidebar-content").append($clone);
          this.nombre();
        });
      } else {
        this.pagesTransportist.forEach((page) => {
          var $clone = $("#sidebarItem").clone();
          $clone.attr("href", page.path);
          $clone[0].firstChild.innerText = page.name;
          $clone.attr("hidden", false);
          $("#sidebar-content").append($clone);
          this.nombre();
        });
      }
    },
    cerrarSesion(){
      this.$router.push({name: "Login"})
      this.$cookies.remove("loginToken")
    }
  },
};
</script>

<style>
#sidebar-1 {
  text-align: left;
  color: white;
}
.button-nav {
  color: white;
}
.sidebar-item {
  color: white;
  outline: transparent;
  width: 100%;
  text-align: left;
}
#closeSesionButton{
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  width: 90%;
}
</style>