<template>
  <div id="page-base">
      <Sidebar/>
      <h2 style= "font-weight: bold" class="mt-3"> Buscador de perfiles </h2>
      <div id="search-container" class = "m-4">
            <div>
                <p class="m-2">Buscar por </p>
            </div>
            <div>
                <b-select class="actor-select"/>
            </div>
            <div>
                <p class="m-2">con el término</p>
            </div>
            <div>
                <b-input class="mr-2 actor-search" type="text"/>
            </div>
            <div>
                <b-button>Buscar</b-button>
            </div>
      </div>
      <div class="result-container">

      </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
export default {
    name:"ProfileBrowser",
    components: {
        Sidebar
    },
}
</script>

<style>
#page-base{
}

#result-container{
    margin: auto;
    width: 100%;
}

#search-container{

}

.actor-search{
    width: 250px;
}

.actor-select{
    width: 150px;
}
</style>