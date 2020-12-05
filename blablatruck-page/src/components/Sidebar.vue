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
      ],
      nombreUsuario: undefined,
      transportista: undefined,
      cliente: undefined,
      personaDNI: undefined,
    };
  },
  methods: {
      async nombre(){
          var res;
          await axios
        .get("http://localhost:3300/api/personas/" + this.$cookies.get("loginToken").Dni, {})
        .then(
          (response) => {
            res = response.data[0];
          },
          (error) => {
            console.log(error);
          }
        );
        this.nombreUsuario = res[0].Nombre;
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
</style>