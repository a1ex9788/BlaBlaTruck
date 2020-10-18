<template>
  <div id="groupForm" class="container-fluid">
    <h1 class="mt-0">Crea tu encargo</h1>

    <form>
        <label for="Nature" class="mt-3">Naturaleza</label>
            <div class="col-mb">
                <select id="Nature" class="form-control col-30">
                    <option selected>Elige una opcion...</option>
                    <option>Producto frágil</option>
                    <option>Producto perecedero</option>
                    <option>Mercancia peligrosa</option>
                </select>
            </div>  
        
        <label for="maxWeight" class="mt-3">Peso mercancia (en kg)</label>
            <div class="col-mb">
                <!--Añadir una restriccion de maxima carga 32-->
                <input class="form-control" type="number" value="10" id="maxWeight">
            </div>  

        <form>
            <label for="origin" class="mt-3">Tamaño</label> 
            <div class="form-row">
                <div class="col">
                    <input type="text" class="form-control" placeholder="Ancho">
                </div>
                <label class="mt-1">x</label>
                <div class="col">
                        <input type="text" class="form-control" placeholder="Alto">
                </div>
                <label class="mt-1">x</label>
                <div class="col">
                        <input type="text" class="form-control" placeholder="Largo">
                </div>
            </div>
        </form>

        <label for="origin" class="mt-3">Origen de envio</label>
            <div class="col-mb">
                <input class="form-control" type="text" id="origin" placeholder="Direccion: Calle | nrº | planta | puerta">
            </div>
       
        <label for="destiny" class="mt-3">Destino de envio</label>
            <div class="col-mb">
                <input class="form-control" type="text"  id="destiny" placeholder="Direccion: Calle | nrº | planta | puerta">
            </div>
        
        <div class="input-group mt-5">
        <div class="input-group-prepend">
            <button type="button" class="btn btn-outline-secondary">Calcular precio</button>   
        </div>
        <input type="text" class="form-control" placeholder="El precio calculado">
        <span class="input-group-text" id="currency">€</span>
        </div>

        <button type="submit" class="btn btn-primary btn-lg mt-4 mx-3">Crear</button>
        <button type="submit" class="btn btn-secondary btn-lg mt-4 mx-3">Volver</button>
    </form>    
    
  </div>

</template>

<script>
export default {
    name: "RegisterNewPackage",

    data(){

       

    },
    methods: {
        
    }
}
</script>


<style>
 #groupForm {
        max-width: 500px;
        margin: 0 auto;
    }
</style>