<template>
<div>
    <Sidebar />
    <div id="groupForm">
        <div id="groupTitle" class="container-fluid">
            <div class="row mt-2">
                <div class="col-md-10" id="titleDiv">
                <h2 id="title" class="mt-4">Mi perfil</h2>
                </div>
                <div v-if="!isEditing()" id="groupForm2" class="container-fluid">
                    <label id="labels" class="mt-3 mb-0"> <strong> Nombre: </strong> </label>
                    <br>
                    <label id="labels" class="mt-3 mb-0"> <strong> Apellidos: fejfh </strong> </label>
                    <br>
                    <label id="labels" class="mt-3 mb-0"> <strong> DNI: </strong> </label>
                    <br>
                    <label id="labels" class="mt-3 mb-0"> <strong> Teléfono: </strong> </label>
                    <br>
                    <label id="labels" class="mt-3 mb-0"> <strong> Correo electrónico: </strong> </label>
                    <br>
                    <label id="labels" class="mt-3 mb-0"> <strong> Nombre de Usuario: </strong> </label>
                    <br>
                    <div v-if="isCarrierLogged()">
                        <label id="labels" class="mt-3 mb-0"> <strong> Naturaleza Camión: </strong> </label>
                        <br>
                        <label id="labels" class="mt-3 mb-0"> <strong> Capacidad: </strong> </label>
                        <br>
                        <label id="labels" class="mt-3 mb-0"> <strong> Valoración: </strong> </label>
                    </div>
                    <div v-if="!isCarrierLogged()">
                        <label id="labels" class="mt-3 mb-0"> <strong> Empresa: </strong> </label>
                    </div>
                </div>
                <div v-if="isEditing()" id="groupForm2" class="container-fluid">
                    <b-row>
                        <b-col sm="3"><label id="labels" class="mt-3 mb-0"> <strong> Nombre: </strong> </label></b-col>
                        <b-col sm="9" class="mt-2"><b-form-input id="nameText" type="text" value="pepito" class=""></b-form-input></b-col>
                    </b-row>
                    <br>
                    <b-row>
                        <b-col sm="3"><label id="labels" class="mt-3 mb-0"> <strong> Apellidos: </strong> </label></b-col>
                        <b-col sm="9" class="mt-2"><b-form-input id="surnamesText" type="text"></b-form-input></b-col>
                    </b-row>
                    <br>
                    <b-row>
                        <b-col sm="3"><label id="labels" class="mt-3 mb-0"> <strong> DNI: </strong> </label></b-col>
                        <b-col sm="9" class="mt-2"><b-form-input id="dniText" type="text"></b-form-input></b-form-input></b-col>
                    </b-row>
                    <br>
                    <b-row>
                        <b-col sm="3"><label id="labels" class="mt-3 mb-0"> <strong> Teléfono: </strong> </label></b-col>
                        <b-col sm="9" class="mt-2"><b-form-input id="phoneText" type="number"></b-form-input></b-col>
                    </b-row>
                    <br>
                    <b-row>
                        <b-col sm="3"><label id="labels" class="mt-3 mb-0"> <strong> Email: </strong> </label></b-col>
                        <b-col sm="9" class="mt-2"><b-form-input id="emailText" type="text"></b-form-input></b-col>
                    </b-row>
                    <br>
                    <b-row>
                        <b-col sm="3"><label id="labels" class="mt-3 mb-0"> <strong> Usuario: </strong> </label></b-col>
                        <b-col sm="9" class="mt-2"><b-form-input id="userText" type="text"></b-form-input></b-col>
                    </b-row>
                    <br>                                     
                    <div v-if="isCarrierLogged()">
                        <b-row>   
                            <b-col sm="3"><label id="labels" class="mt-3 mb-0"> <strong> Naturaleza Camión: </strong> </label></b-col>
                            <b-col sm="9" class="mt-2"><b-form-input id="natureText" type="text"></b-form-input></b-col>
                        </b-row> 
                        <br>
                        <b-row>   
                            <b-col sm="3"> <label id="labels" class="mt-3 mb-0"> <strong> Capacidad: </strong> </label></b-col>
                            <b-col sm="9" class="mt-2"><b-form-input id="capacityText" type="text"></b-form-input></b-col>
                        </b-row>                                                   
                    </div>
                    <div v-if="!isCarrierLogged()">
                        <b-row>   
                            <b-col sm="3"> <label id="labels" class="mt-3 mb-0"> <strong> Empresa: </strong> </label></b-col>
                            <b-col sm="9" class="mt-2"><b-form-input id="companyText" type="text"></b-form-input></b-col>
                        </b-row>                                                   
                    </div>
                </div>                
            </div>
            <b-button v-if="!isEditing()" class="btn-success mt-5" @click="onEditProfile()">  Editar perfil </b-button>
            <b-button v-if="isEditing()" id="buttons" class="btn-danger mt-5" @click="onViewProfile()">  Cancelar </b-button> 
            <b-button v-if="isEditing()" id="buttons" class="btn-success mt-5" @click="saveChanges()">  Guardar </b-button>  
        </div>
    </div>
</div>
</template>

<script>
const axios = require("axios");
import Sidebar from "../components/Sidebar";

export default {
    name: "Profile",
    components: {
        Sidebar,
    },
    data() {
        return {
            personDNI: undefined,
            isCarrier: undefined,
            isEditingProfile: undefined
        };
    },
    created() {
        this.personDNI = this.$cookies.get("loginToken").Dni;
        this.isCarrier = this.$cookies.get("loginToken").Type === "Transportista";
        this.isEditingProfile = false;

        if (!this.personDNI) this.personDNI = "11111111r";
        if (!this.isCarrier) this.isCarrier = false;

    },
    methods: {
        isCarrierLogged(){
            return this.isCarrier
        },

        onEditProfile(){
            this.isEditingProfile = true
        },
        isEditing(){
            return this.isEditingProfile
        },
        onViewProfile(){
            this.isEditingProfile = false
        },
        saveChanges(){
            //Guardar cambios en la BD 
            this.onViewProfile()
        }
    
        
       

    }
    
};
</script>

<style>
#groupForm {
    max-width: 800px;
    margin: 0 auto;
}

#groupTitle {
    max-width: 800px;
    min-width: 800px;
    text-align: center;
}
#groupForm2 {
  max-width: 500px;
  text-align: left;
}
#buttons {
  margin: 10%;
  width: 100px;
}
</style>
