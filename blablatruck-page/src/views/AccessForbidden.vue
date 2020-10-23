<template>
  <div id="groupForm"  class="container-fluid">
      <h2 class="mb-5"><strong>No tienes acceso a esta página</strong></h2>
      <b-img class="mb-5" center fluid src="../assets/forbidden.png"/>
      <b-button variant="primary" @click="onClickVolver">Ir a login</b-button>
  </div>
</template>

<script>

export default {
    name: "AccessForbidden",
    methods: {
        onClickVolver() {
            this.$router.push('/login')
        }
    }
}
</script>

<style>
    #groupForm {
        max-width: 500px;
        margin: 0 auto;
        text-align: center;
    }
</style>