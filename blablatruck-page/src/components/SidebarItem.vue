<template>
  <router-link id='routerLink' class="mt-3" :to="this.toPath">
            <label class="btn squared btn-outline-secondary button-nav sidebar-item" id='button'>{{updateText}}</label>
        </router-link>
</template>

<script>
export default {
    name: "SidebarItem",
    data() {
        return {
            toPath: "/",
            textButton: "pepe"
        }
    },
    computed: {
        updateText() {
            return this.textButton
        }
    }
}
</script>

<style>

</style>