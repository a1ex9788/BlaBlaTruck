<template>
<div>
    <Sidebar />
    <div id="groupForm">
        <div id="groupTitle" class="container-fluid">
            <div class="row mt-2">
                <div class="col-md-10" id="titleDiv">
                <h2 id="title" class="mt-4" style= "font-weight: bold">Mi perfil</h2>
                </div>
                <div v-if="!isEditing()" id="groupForm2" class="container-fluid">
                    <b-row>
                        <b-col sm="5"><label id="labels" class="mt-3 mb-0"> <strong> Nombre:</strong> </label></b-col>
                        <b-col sm="7"><label id="labels" class="mt-3 mb-0"> {{this.infoUsuario.Nombre}} </label></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="5"><label id="labels" class="mt-3 mb-0"> <strong> Apellidos:</strong> </label></b-col>
                        <b-col sm="7"><label id="labels" class="mt-3 mb-0"> {{this.infoUsuario.Apellidos}} </label></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="5"><label id="labels" class="mt-3 mb-0"> <strong> DNI:</strong> </label></b-col>
                        <b-col sm="3"><label id="labels" class="mt-3 mb-0"> {{this.infoUsuario.DNI}} </label></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="5"><label id="labels" class="mt-3 mb-0"> <strong> Telefono:</strong> </label></b-col>
                        <b-col sm="3"><label id="labels" class="mt-3 mb-0"> {{this.infoUsuario.Telefono}} </label></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="5"><label id="labels" class="mt-3 mb-0"> <strong> Email:</strong> </label></b-col>
                        <b-col sm="7"><label id="labels" class="mt-3 mb-0"> {{this.infoUsuario.Email}} </label></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="5"><label id="labels" class="mt-3 mb-0"> <strong> Usuario:</strong> </label></b-col>
                        <b-col sm="7"><label id="labels" class="mt-3 mb-0"> {{this.infoUsuario.Usuario}} </label></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="5"><label id="labels" class="mt-3 mb-0"> <strong> IBAN:</strong> </label></b-col>
                        <b-col sm="3"><label id="labels" class="mt-3 mb-0"> {{this.infoUsuario.IBAN}} </label></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="5"><label id="labels" class="mt-3 mb-0"> <strong> Cuenta bancaria:</strong> </label></b-col>
                        <b-col sm="6"><label id="labels" class="mt-3 mb-0"> {{formatCuentaBancaria(this.infoUsuario.NumeroCuentaBancaria)}} </label></b-col>
                    </b-row>
                    <div v-if="isCarrierLogged()">
                        <b-row>
                            <b-col sm="5"><label id="labels" class="mt-3 mb-0"> <strong> Naturaleza Camión:</strong> </label></b-col>
                            <b-col sm="5"><label id="labels" class="mt-3 mb-0"> {{this.getNaturalezaCamion(this.infoUsuario.NaturalezaCamion)}} </label></b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="5"><label id="labels" class="mt-3 mb-0"> <strong> Capacidad:</strong> </label></b-col>
                            <b-col sm="3"><label id="labels" class="mt-3 mb-0"> {{this.infoUsuario.Capacidad}} </label></b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="5"><label id="labels" class="mt-3 mb-0"> <strong> Valoración Tiempo:</strong> </label></b-col>
                            <b-col sm="7" class = "mt-3">
                                <b-img id="starImage1" src="../assets/greyStar.png"></b-img>
                                <b-img class = "ml-2" id="starImage2" src= "../assets/greyStar.png" ></b-img>
                                <b-img class = "ml-2" id="starImage3" src="../assets/greyStar.png" ></b-img>
                                <b-img class = "ml-2" id="starImage4" src="../assets/greyStar.png" ></b-img>
                                <b-img class = "ml-2" id="starImage5" src="../assets/greyStar.png" ></b-img>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="5"><label id="labels" class="mt-3 mb-0"> <strong> Valoración Estado:</strong> </label></b-col>
                            <b-col sm="7" class="mt-3">
                                <b-img id="starImageInvisible" src="../assets/yellowStar.png"></b-img>
                                <b-img id="starImage6" src="../assets/greyStar.png"></b-img>
                                <b-img class = "ml-2" id="starImage7" src= "../assets/greyStar.png" ></b-img>
                                <b-img class = "ml-2" id="starImage8" src="../assets/greyStar.png" ></b-img>
                                <b-img class = "ml-2" id="starImage9" src="../assets/greyStar.png" ></b-img>
                                <b-img class = "ml-2" id="starImage10" src="../assets/greyStar.png" ></b-img>
                            </b-col>
                        </b-row>
                    </div>
                    <div v-if="!isCarrierLogged()">
                    <b-row>
                        <b-col sm="5"><label id="labels" class="mt-3 mb-0"> <strong> Empresa:</strong> </label></b-col>
                        <b-col sm="7"><label id="labels" class="mt-3 mb-0"> {{getEmpresa(this.infoUsuario.Empresa)}} </label></b-col>
                    </b-row>
                    </div>
                </div>
                <div v-if="isEditing()" id="groupForm2" class="container-fluid">
                    <b-row>
                        <b-col sm="3"><label id="labels" class="mt-3 mb-0"> <strong> Nombre: </strong> </label></b-col>
                        <b-col sm="9" class="mt-2"><b-form-input :state="nameError" id="nameText" type="text" :value = this.infoUsuario.Nombre class=""></b-form-input></b-col>
                    </b-row>
                    <br>
                    <b-row>
                        <b-col sm="3"><label id="labels" class="mt-3 mb-0"> <strong> Apellidos: </strong> </label></b-col>
                        <b-col sm="9" class="mt-2"><b-form-input :state="surnamesError" id="surnamesText" type="text" :value = this.infoUsuario.Apellidos ></b-form-input></b-col>
                    </b-row>
                    <br>
                    <b-row>
                        <b-col sm="3"><label id="labels" class="mt-3 mb-0"> <strong> Teléfono: </strong> </label></b-col>
                        <b-col sm="9" class="mt-2"><b-form-input :state="telephoneError" id="phoneText" type="number" :value = this.infoUsuario.Telefono></b-form-input></b-col>
                    </b-row>
                    <br>
                    <b-row>
                        <b-col sm="3"><label id="labels" class="mt-3 mb-0"> <strong> Email: </strong> </label></b-col>
                        <b-col sm="9" class="mt-2"><b-form-input :state="emailError" id="emailText" type="text" :value = this.infoUsuario.Email></b-form-input></b-col>
                    </b-row>
                    <br>    
                    <b-row>
                        <b-col sm="3"><label id="labels" class="mt-3 mb-0"> <strong> IBAN: </strong> </label></b-col>
                        <b-col sm="9" class="mt-2"><b-form-input :state="ibanError" id="ibanText" type="text" :value = this.infoUsuario.IBAN></b-form-input></b-col>
                    </b-row>
                    <br>  
                    <b-row>
                        <b-col sm="3"><label id="labels" class="mt-3 mb-0"> <strong> C. bancaria: </strong> </label></b-col>
                        <b-col sm="9" class="mt-2"><b-form-input :state="cuentaBancariaError" id="numeroCuentaBancariaText" type="number" :value = this.infoUsuario.NumeroCuentaBancaria></b-form-input></b-col>
                    </b-row>
                    <br>                               
                    <div v-if="isCarrierLogged()">
                        <b-row>   
                            <b-col sm="3"><label id="labels" class="mt-3 mb-0"> <strong> Naturaleza Camión: </strong> </label></b-col>
                            <b-col sm="9" class="mt-2"><b-form-select id="natureText" type="text" :options="natureOptions" :value = this.infoUsuario.NaturalezaCamion></b-form-select></b-col>
                        </b-row> 
                        <br>
                        <b-row>   
                            <b-col sm="3"> <label id="labels" class="mt-3 mb-0"> <strong> Capacidad: </strong> </label></b-col>
                            <b-col sm="9" class="mt-2"><b-form-input :state="capacityError" id="capacityText" type="text" :value = this.infoUsuario.Capacidad></b-form-input></b-col>
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

function containsANumber(y) {
  let x = 0;
  while (!y.includes(x) && x<10) {
  x++;
  }
  return y.includes(x);
}

const axios = require("axios");
import Sidebar from "../components/Sidebar";

export default {
    name: "Profile",
    components: {
        Sidebar,
    },
    data() {
        return {
            error: undefined,
            capacityError: undefined,
            ibanError: undefined,
            cuentaBancariaError: undefined,
            nameError: undefined,
            surnamesError: undefined,
            telephoneError: undefined,
            emailError: undefined,
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
            },
            natureOptions: [
                { value: "1", text: "Producto frágil" },
                { value: "2", text: "Producto perecedero" },
                { value: "3", text: "Mercancía peligrosa" },
      ],
        };
    },
    created() {
        this.personDNI = this.$cookies.get("loginToken").Dni;
        this.isCarrier = this.$cookies.get("loginToken").Type === "Transportista";
        this.isEditingProfile = false;
        this.updateMyProfile();
    },
    methods: {
        next(){
            this.error = false;

            this.nameError = true;
            this.surnamesError = true;
            this.telephoneError = true;
            this.emailError = true;
            this.ibanError = true;
            this.cuentaBancariaError = true;
            this.capacityError = true;

            if (nameText.value.trim() == "" || containsANumber(nameText.value.trim())) {
                //this.showNameTextError = true;
                this.nameError = false;
                this.error = true;
            }
            if (surnamesText.value.trim() == "" || containsANumber(surnamesText.value.trim())) {
                //this.showSurnamesTextError = true;
                this.surnamesError = false;
                this.error = true;
            }
            if (phoneText.value.trim() == "" || phoneText.value.trim().length != 9) {
                this.telephoneError = false;
                this.error = true;
            }
            if (emailText.value.trim() == "" || !emailText.value.trim().includes("@") || !emailText.value.trim().includes(".")) {
                this.emailError = false;
                this.error = true;
            }
            if (numeroCuentaBancariaText.value == "" || numeroCuentaBancariaText.value.length != 20) {
                this.cuentaBancariaError = false;
                this.error = true;
            }
            if (ibanText.value == "" || ibanText.value.length != 4 || !isNaN(ibanText.value.substring(0, 2)) || isNaN(ibanText.value.substring(2, 4))) {
                this.ibanError = false;
                this.error = true;
            }
            if (this.isCarrier && (capacityText.value == "" || capacityText.value.trim().includes("-") || capacityText.value.trim().includes("e")) ) {
                //this.showCapacityTextError = true;
                this.capacityError = false;
                this.error = true;
            }
        },
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
                    return "Mercancías peligrosas"
            }
        },
        async updateValorations(){
            let updated = false

            while(!updated){
                try{
                    var srcYellowStar = starImageInvisible.src
                    switch(Math.round(this.infoUsuario.MediaValoracionTiempo)){
                        case 5: 
                            starImage5.src = srcYellowStar
                        case 4:
                            starImage4.src = srcYellowStar
                        case 3:
                            starImage3.src = srcYellowStar
                        case 2:
                            starImage2.src = srcYellowStar
                        case 1:
                            starImage1.src = srcYellowStar
                        
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
                        case 1:
                            starImage6.src = srcYellowStar
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
            this.next()
            if(!this.error){
                this.$bvModal.msgBoxConfirm('¿Desea guardar los cambios?',{
                    title: 'Confirmación',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'success',
                    okTitle:'Sí',
                    cancelTitle: 'No',
                    centered: true
                })
                .then(async (value)=>{
                    if(value == true) {
                        if (this.isCarrier) {
                            await axios.put("http://localhost:3300/api/transportista/" + this.personDNI, {
                                DNI: this.personDNI,
                                Capacidad: capacityText.value,
                                NaturalezaCamion: natureText.value
                            })
                            .then((error) => {
                                console.log(error);
                            })
                        } else {
                            await axios.put("http://localhost:3300/api/cliente/" + this.personDNI, {
                                DNI: this.personDNI,
                                Empresa: companyText.value
                            })
                            .then((error) => {
                                console.log(error);
                            })                            
                        }
                        await axios.put("http://localhost:3300/api/personas/" + this.personDNI, {
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

            }
        },
        getEmpresa(empresa){
            if(empresa) return empresa
            else return "No tiene empresa"
        },
        formatCuentaBancaria(cuentaBancaria){
            if (!cuentaBancaria){return "";}
            return cuentaBancaria.substring(0,4) + " " + cuentaBancaria.substring(4,8) + " " + cuentaBancaria.substring(8,12) + " " 
                + cuentaBancaria.substring(12,16) + " " + cuentaBancaria.substring(16,20)

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
#titleDiv {
  padding-left: 19%;
}
@media (max-width: 480px) {
  #titleDiv {
    padding-right: 0%;
  }
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
#starImageInvisible{
    max-width: 0px;
    max-height: 0px;
    visibility: hidden;
}
</style>
