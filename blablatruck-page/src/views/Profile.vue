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
                    <label id="labels" class="mt-3 mb-0"> <strong> Nombre:</strong> {{this.infoUsuario.Nombre}} </label>
                    <br>
                    <label id="labels" class="mt-3 mb-0"> <strong> Apellidos:</strong> {{this.infoUsuario.Apellidos}}</label>
                    <br>
                    <label id="labels" class="mt-3 mb-0"> <strong> DNI: </strong> {{this.infoUsuario.DNI}}</label>
                    <br>
                    <label id="labels" class="mt-3 mb-0"> <strong> Teléfono: </strong>{{this.infoUsuario.Telefono}} </label>
                    <br>
                    <label id="labels" class="mt-3 mb-0"> <strong> Email: </strong>{{this.infoUsuario.Email}} </label>
                    <br>
                    <label id="labels" class="mt-3 mb-0"> <strong> Usuario: </strong>{{this.infoUsuario.Usuario}} </label>
                    <br>
                    <label id="labels" class="mt-3 mb-0"> <strong> IBAN: </strong>{{this.infoUsuario.IBAN}} </label>
                    <br>
                    <label id="labels" class="mt-3 mb-0"> <strong> C. bancaria: </strong>{{this.infoUsuario.NumeroCuentaBancaria}} </label>
                    <br>
                    <div v-if="isCarrierLogged()">
                        <label id="labels" class="mt-3 mb-0"> <strong> Naturaleza Camión: </strong> {{this.getNaturalezaCamion(this.infoUsuario.NaturalezaCamion)}}</label>
                        <br>
                        <label id="labels" class="mt-3 mb-0"> <strong> Capacidad: </strong> {{this.infoUsuario.Capacidad}}</label>
                        <br>
                        <label id="labels" class="mt-3 mb-0"> <strong> Valoración Tiempo: </strong></label>
                        <b-img class = "ml-5" id="starImage1" src="../assets/yellowStar.png"></b-img>
                        <b-img id="starImage2" src= "../assets/greyStar.png" ></b-img>
                        <b-img id="starImage3" src="../assets/greyStar.png" ></b-img>
                        <b-img id="starImage4" src="../assets/greyStar.png" ></b-img>
                        <b-img id="starImage5" src="../assets/greyStar.png" ></b-img>
                        <br>
                        <label id="labels" class="mt-3 mb-0"> <strong> Valoración Estado: </strong></label>
                        <b-img class = "ml-5" id="starImage6" src="../assets/yellowStar.png"></b-img>
                        <b-img id="starImage7" src= "../assets/greyStar.png" ></b-img>
                        <b-img id="starImage8" src="../assets/greyStar.png" ></b-img>
                        <b-img id="starImage9" src="../assets/greyStar.png" ></b-img>
                        <b-img id="starImage10" src="../assets/greyStar.png" ></b-img>
                        <br>
                    </div>
                    <div v-if="!isCarrierLogged()">
                        <label id="labels" class="mt-3 mb-0"> <strong> Empresa: </strong> {{this.infoUsuario.Empresa}}</label>
                    </div>
                </div>
                <div v-if="isEditing()" id="groupForm2" class="container-fluid">
                    <b-row>
                        <b-col sm="3"><label id="labels" class="mt-3 mb-0"> <strong> Nombre: </strong> </label></b-col>
                        <b-col sm="9" class="mt-2"><b-form-input id="nameText" type="text" :value = this.infoUsuario.Nombre class=""></b-form-input></b-col>
                    </b-row>
                    <br>
                    <b-row>
                        <b-col sm="3"><label id="labels" class="mt-3 mb-0"> <strong> Apellidos: </strong> </label></b-col>
                        <b-col sm="9" class="mt-2"><b-form-input id="surnamesText" type="text" :value = this.infoUsuario.Apellidos ></b-form-input></b-col>
                    </b-row>
                    <br>
                    <b-row>
                        <b-col sm="3"><label id="labels" class="mt-3 mb-0"> <strong> Teléfono: </strong> </label></b-col>
                        <b-col sm="9" class="mt-2"><b-form-input id="phoneText" type="number" :value = this.infoUsuario.Telefono></b-form-input></b-col>
                    </b-row>
                    <br>
                    <b-row>
                        <b-col sm="3"><label id="labels" class="mt-3 mb-0"> <strong> Email: </strong> </label></b-col>
                        <b-col sm="9" class="mt-2"><b-form-input id="emailText" type="text" :value = this.infoUsuario.Email></b-form-input></b-col>
                    </b-row>
                    <br>    
                    <b-row>
                        <b-col sm="3"><label id="labels" class="mt-3 mb-0"> <strong> IBAN: </strong> </label></b-col>
                        <b-col sm="9" class="mt-2"><b-form-input id="ibanText" type="text" :value = this.infoUsuario.IBAN></b-form-input></b-col>
                    </b-row>
                    <br>  
                    <b-row>
                        <b-col sm="3"><label id="labels" class="mt-3 mb-0"> <strong> C. bancaria: </strong> </label></b-col>
                        <b-col sm="9" class="mt-2"><b-form-input id="numeroCuentaBancariaText" type="number" :value = this.infoUsuario.NumeroCuentaBancaria></b-form-input></b-col>
                    </b-row>
                    <br>                               
                    <div v-if="isCarrierLogged()">
                        <b-row>   
                            <b-col sm="3"><label id="labels" class="mt-3 mb-0"> <strong> Naturaleza Camión: </strong> </label></b-col>
                            <b-col sm="9" class="mt-2"><b-form-input id="natureText" type="text" :value = this.infoUsuario.NaturalezaCamion></b-form-input></b-col>
                        </b-row> 
                        <br>
                        <b-row>   
                            <b-col sm="3"> <label id="labels" class="mt-3 mb-0"> <strong> Capacidad: </strong> </label></b-col>
                            <b-col sm="9" class="mt-2"><b-form-input id="capacityText" type="text" :value = this.infoUsuario.Capacidad></b-form-input></b-col>
                        </b-row>                                                   
                    </div>
                    <div v-if="!isCarrierLogged()">
                        <b-row>   
                            <b-col sm="3"> <label id="labels" class="mt-3 mb-0"> <strong> Empresa: </strong> </label></b-col>
                            <b-col sm="9" class="mt-2"><b-form-input id="companyText" type="text" :value = this.infoUsuario.Empresa></b-form-input></b-col>
                        </b-row>                                                   
                    </div>
                </div>                
            </div>
            <b-button v-if="!isEditing()" class="btn-info mt-5" @click="onEditProfile()">  Editar perfil </b-button>
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
            isEditingProfile: undefined,
            infoUsuario: {
                Nombre: undefined,
                Apellidos: undefined,
                Telefono: undefined,
                Email: undefined,
                IBAN: undefined,
                NumeroCuentaBancaria: undefined,
                Empresa: undefined,
                Capacidad: undefined,
                NaturalezaCamión: undefined,
                MediaValoracionTiempo: undefined,
                MediaValoracionEstado: undefined
            }
        };
    },
    created() {
        this.personDNI = this.$cookies.get("loginToken").Dni;
        this.isCarrier = this.$cookies.get("loginToken").Type === "Transportista";
        this.isEditingProfile = false;
        this.updateMyProfile();
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
            if(this.isCarrier) setTimeout(this.updateValorations, 1)
        },
        getNaturalezaCamion(naturaleza){
            switch(naturaleza){
                case '1':
                    return "Productos frágiles"
                case '2':
                    return "Productos perecederos"
                case '3':
                    return "Productos peligrosos"
            }
        },
        nombre(){
            return this.infoUsuario.Nombre
        },
        async updateValorations(){
            let updated = false

            while(!updated){
                try{
                    var srcYellowStar = starImage1.src
                    switch(Math.round(this.infoUsuario.MediaValoracionTiempo)){
                        case 5: 
                            starImage5.src = srcYellowStar
                        case 4:
                            starImage4.src = srcYellowStar
                        case 3:
                            starImage3.src = srcYellowStar
                        case 2:
                            starImage2.src = srcYellowStar
                    }

                    switch(Math.round(this.infoUsuario.MediaValoracionEstado)){
                        case 5: 
                            starImage10.src = srcYellowStar
                        case 4:
                            starImage9.src = srcYellowStar
                        case 3:
                            starImage8.src = srcYellowStar
                        case 2:
                            starImage7.src = srcYellowStar
                    }
                    updated = true;
                }
                catch(error){
                }
            }
        },
        async updateMyProfile() {
            this.infoUsuario = await this.getMyProfile();
            this.onViewProfile()
        },
        async getMyProfile() {
            var res;

            if (this.isCarrier) {
                await axios
                .get("http://localhost:3300/api/transportista/" + this.personDNI, {})
                .then(
                    (response) => {
                        res = response.data[0];
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            } else {
                await axios
                .get("http://localhost:3300/api/cliente/" + this.personDNI, {})
                .then(
                    (response) => {
                        res = response.data[0];
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }
            
            return res[0]
        },
        async saveChanges(){
            this.$bvModal.msgBoxConfirm('¿Desea guardar los cambios?',{
                title: 'Confirmación',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'success',
                okTitle:'Sí',
                cancelTitle: 'No',
                centered: true
            })
            .then((value)=>{
                if(value == true) {
                    if (this.isCarrier) {
                        axios.put("http://localhost:3300/api/transportista/" + this.personDNI, {
                            DNI: this.personDNI,
                            Capacidad: capacityText.value,
                            NaturalezaCamion: natureText.value
                        })
                        .then((error) => {
                            console.log(error);
                        })
                    } else {
                        axios.put("http://localhost:3300/api/cliente/" + this.personDNI, {
                            Empresa: companyText.value
                        })
                        .then((error) => {
                            console.log(error);
                        })                            
                    }
                    axios.put("http://localhost:3300/api/personas/" + this.personDNI, {
                        Nombre: nameText.value,
                        Apellidos: surnamesText.value,
                        Telefono: phoneText.value,
                        Email: emailText.value,
                        IBAN: ibanText.value,
                        NumeroCuentaBancaria: numeroCuentaBancariaText.value
                    })
                    .then(() => {
                        this.$bvModal.msgBoxOk('Sus datos se han guardado correctamente',{
                            title: 'Confirmación',
                            size: 'sm',
                            buttonSize: 'sm',
                            okVariant: 'info',
                            headerClass: 'p-2 border-bottom-0',
                            footerClass: 'p-2 border-top-0',
                            centered: true
                        })
                        .then(()=> {
                            this.updateMyProfile()
                            this.onViewProfile()
                        })
                    }),
                    (error) => {
                        console.log(error);
                    }
                }
            })  
        },
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
#starImage1{
    max-width: 35px;
    max-height: 35px;
}
#starImage2{
    max-width: 35px;
    max-height: 35px;
}
#starImage3{
    max-width: 35px;
    max-height: 35px;
}
#starImage4{
    max-width: 35px;
    max-height: 35px;
}
#starImage5{
    max-width: 35px;
    max-height: 35px;
}
#starImage6{
    max-width: 35px;
    max-height: 35px;
}
#starImage7{
    max-width: 35px;
    max-height: 35px;
}
#starImage8{
    max-width: 35px;
    max-height: 35px;
}
#starImage9{
    max-width: 35px;
    max-height: 35px;
}
#starImage10{
    max-width: 35px;
    max-height: 35px;
}
</style>
