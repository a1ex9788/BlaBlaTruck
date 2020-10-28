<template>
    <div id="sidebar">
        <b-sidebar id="sidebar-1" title="BlablaTruck" bg-variant="dark" text-variant="light" shadow>
      <div class="px-3 py-2" id="sidebar-content">
        <hr style="background-color:white">
        <router-link to="/navegator">
            <b-button class="button-nav sidebar-item" squared variant="outline-secondary">Navegador</b-button>
        </router-link>
        <hr style="background-color:white">
        <router-link to="/registerNewPackage">
            <b-button class="button-nav sidebar-item" squared variant="outline-secondary">Registrar paquete</b-button>
        </router-link>
        <SidebarItem id="sidebarItem"/>
      </div>
    </b-sidebar>
        <nav class="navbar navbar-dark bg-dark">
              <b-button class="button-nav" v-b-toggle.sidebar-1 variant="outline-secondary">☰</b-button>
        </nav>
    </div>
    
</template>

<script>
import $ from 'jquery'
import SidebarItem from './SidebarItem'
export default {
    name: 'Sidebar',
    mounted() {
        this.generateSidebarContent();
    },
    components: { SidebarItem },
    data () {
        return {
            pagesClient: [
                    '/registerNewPackage',
                    '/historical'
            ],
            pagesTransportist: [
                    '/navegator',
                    '/historical'
            ]
        }
        
    },
    methods: {
         generateSidebarContent() {
            var cookie = this.$cookies.get("loginToken").Type
            if(cookie === 'Cliente') {
                this.pagesClient.forEach(page => {
                    var $clone = $('#sidebarItem').clone(true);
                    $clone.attr("innerHTML",page)
                    console.log($clone)
                    //$clone = page
                    //console.log(clone.textButton)
                    $clone.appendTo("sidebar-content")
                })
            }
        }
    }
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
        outline: transparent;
        width: 100%;
        text-align: left;
    }
</style>