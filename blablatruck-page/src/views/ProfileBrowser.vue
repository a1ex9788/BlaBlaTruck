<template>
  <div id="page-base">
    <Sidebar />
    <b-modal
      size="lg"
      title="Inspección de perfil"
      id="modal"
      ok-only
      @ok="onClickOkModal"
    >
      <InspectionProfile
        id="inspectorP"
        v-bind:dni="dniSelected"
        v-bind:tipo="tipoSelected"
      />
    </b-modal>
    <h2 style="font-weight: bold" class="mt-3">Buscador de perfiles</h2>
    <b-container fluid id="search-container" class="mt-4 mb-4" align-h="center">
      <b-row no-gutters class="justify-content-md-center">
        <b-col md="auto">
          <b-input
            :state="errorSearch"
            placeholder="Ingresa el nombre a buscar"
            class="mr-2 actor-search"
            type="text"
            id="criterioInput"
          />
        </b-col>
        <b-col md="auto">
          <b-button @click="getUsers" id="buttonSearch">Buscar</b-button>
        </b-col>
      </b-row>
    </b-container>
    <div id="res-container" class="mt-2">
      <b-table
        fixed
        hover
        small
        show-empty
        outlined
        id="result-container"
        empty-text="No hay usuarios con ese críterio de busqueda"
        :items="items"
        :fields="fields"
        :per-page="perPage"
        :current-page="currentPage"
        @row-clicked="clickUser"
      ></b-table>
      <b-pagination
        class="mt-3 mb-5 fixed-bottom"
        align="center"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import InspectionProfile from "../components/ProfileResult.vue";
const $ = require("jquery");
const axios = require("axios");

export default {
  name: "ProfileBrowser",
  components: {
    Sidebar,
    InspectionProfile,
  },
  mounted() {
    $("#criterioInput").on("input", () => {
      this.errorSearch = null;
    });
  },
  data() {
    return {
      errorSearch: null,
      selected: null,
      dniSelected: "a",
      tipoSelected: false,
      showModal: false,
      options: [
        { value: "n", text: "Nombre" },
        { value: "e", text: "Empresa" },
      ],
      perPage: 10,
      currentPage: 1,
      fields: [
        {
          key: "Nombre",
          sortable: true,
        },
        {
          key: "Tipo",
          sortable: true,
        },
      ],
      items: [],
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },
  methods: {
    async getUsers() {
      let texto = document.getElementById("criterioInput").value;
      if (texto != null && !(texto.trim() === "")) {
        await axios
          .get("http://localhost:3300/api/personas/filter", {
            params: {
              Nombre: texto,
            },
          })
          .then(
            (response) => {
              this.errorSearch = null;
              this.items = response.data[0];
              if (this.items == undefined) this.items = [];
            },
            (error) => {
              this.items = [];
            }
          );
      } else {
        this.errorSearch = false;
      }
    },
    async clickUser(item) {
      await this.$bvModal.show("modal");
      this.dniSelected = item.DNI;
      if (item.Tipo === "Transportista") this.tipoSelected = true;
      else this.tipoSelected = false;
    },
    onClickOkModal() {
      this.dniSelected = undefined;
    },
  },
};
</script>

<style>
#result-container {
  margin: auto;
  max-width: 70%;
  background: white;
}

#result-paginator {
  margin: auto;
}

#search-container {
  margin: auto;
}

.actor-search {
  width: 250px;
}

.actor-select {
  width: 120px;
}

.col {
  padding: 0px;
  margin: 0px;
}
</style>