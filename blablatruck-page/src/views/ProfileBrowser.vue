<template>
  <div id="page-base">
    <Sidebar />
    <h2 style="font-weight: bold" class="mt-3">Buscador de perfiles</h2>
    <b-container fluid id="search-container" class="mt-4 mb-4" align-h="center">
      <b-row no-gutters class="justify-content-md-center">
        <b-col md="auto">
          <b-input placeholder="Ingresa el nombre a buscar" class="mr-2 actor-search" type="text" id="criterioInput"/>
        </b-col>
        <b-col md="auto">
          <b-button @click="getUsers">Buscar</b-button>
        </b-col>
      </b-row>
    </b-container>
    <div id="result-container" class="mt-2"></div>
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
    ></b-table>
    <b-pagination class="mt-3"
      align="center"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
const axios = require("axios");
export default {
  name: "ProfileBrowser",
  components: {
    Sidebar,
  },
  data() {
    return {
      selected: null,
      options: [
        { value: "n", text: "Nombre" },
        { value: "e", text: "Empresa" },
      ],
      perPage: 5,
      currentPage: 1,
      fields: [
          { 
            key: 'Nombre',
            sortable: true
          },
          { 
            key: 'Tipo',
            sortable: true
          }
      ],
      items: [
      ],
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
        if(texto != null && !(texto.trim() === "")) {
            await axios.get('http://localhost:3300/api/personas/filter', {
                    params: {
                        Nombre: texto
                    }
            }
                ).then((response) => {
                    
                    this.items = response.data[0];
                }, (error) => {
                    console.log(error);
                });
        } else {
        }
    },
  }
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