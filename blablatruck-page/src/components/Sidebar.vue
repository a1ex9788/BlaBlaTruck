<template>
    <div id="sidebar">
        <b-sidebar id="sidebar-1" title="BlablaTruck" bg-variant="dark" text-variant="light" shadow>
      <div class="px-3 py-2">
        <hr style="background-color:white">
        <router-link to="/navegator">
            <b-button class="button-nav sidebar-item" squared variant="outline-secondary">Navegador</b-button>
        </router-link>
        <hr style="background-color:white">
        <router-link to="/registerNewPackage">
            <b-button class="button-nav sidebar-item" squared variant="outline-secondary">Registrar paquete</b-button>
        </router-link>
      </div>
    </b-sidebar>
        <nav class="navbar navbar-dark bg-dark">
              <b-button class="button-nav" v-b-toggle.sidebar-1 variant="outline-secondary">☰</b-button>
        </nav>
    </div>
    
</template>

<script>
export default {

}
</script>

<style>
    #sidebar-1 {
        text-align: left;
        color: white
    }
    .button-nav {
        color: white; 
    }
    .sidebar-item {
        color: white;
        width: 100%;
        text-align: left;
    }
</style>