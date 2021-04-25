<template>
    <v-app id="comercios">
        <v-app-bar color="primary" app dark>
            <v-btn icon @click="$router.go(-1)">
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>
                Sucursales 
            </v-toolbar-title>
        </v-app-bar>
        <v-main>
            <v-container>
                <v-progress-linear indeterminate color="primary" v-if="isLoading"></v-progress-linear>
                <v-data-table :items="sucursalesData"
                :headers="headers" 
                >
                    <template v-slot:item.actions="{item}">
                        <v-btn icon @click="ondelete(item)"><v-icon>clear</v-icon></v-btn>
                        <v-btn icon @click="onedit(item)"><v-icon>edit</v-icon></v-btn>
                    </template>
                </v-data-table>
                <v-row justify="center">
                    <v-col cols="12" sm="12" md="6" align="center">
                        <v-form ref="sucursal" :disabled="isLoading">
                            <v-text-field
                            label="Dirección sucursal"
                            outlined
                            v-model="sucursal.nombreSucursal"
                            :rules="sucursal.nombreRules"
                            >

                            </v-text-field>
                            <v-select
                            :loading="isLoadingMunicipios"
                            label="Departamentos"
                            :items="departamentosData"
                            :item-text="(item)=>`${item.nombreDepartamento}`"
                            item-value="iddepartamento"
                            @change="onchangeDepartamento"
                            v-model="iddepartamento"
                            >
                            </v-select>
                            <v-select
                            :loading="isLoadingMunicipios"
                            label="Municipios"
                            :items="municipiosData"
                            :item-text="(item)=>`${item.nombreMunicipio}`"
                            item-value="idmunicipio"
                            v-model="sucursal.idmunicipio"
                            :rules="sucursal.idmunicipioRules"
                            >

                            </v-select>
                            <v-select
                            label="Comercios"
                            :items="comerciosData"
                            :item-text="(item)=>`${item.nombreComercio}`"
                            item-value="idcomercio"
                            v-model="sucursal.idcomercio"
                            :rules="sucursal.idcomercioRules"
                            >

                            </v-select>
                            <v-btn @click="save">
                                Guardar
                            </v-btn>
                        </v-form>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
export default {
    data:function(){
        return ({
            isLoading:false,
            isLoadingMunicipios:false,
            headers:[
                {text:"Nombre Comercio",value:"idcomercioNavigation.nombreComercio"},
                {text:"Nombre Municipio",value:"idmunicipioNavigation.nombreMunicipio"},
                {text:"Dirección Sucursal",value:"nombreSucursal"},
                {text:"Acciones",value:"actions"},
            ],
            sucursalesData:[],
            municipiosData:[],
            departamentosData:[],
            comerciosData:[],
            iddepartamento:"",
            sucursal:{
                nombreSucursal:"",
                nombreRules:[
                    v=>!!v||"Dirección de sucursal es obligatorio"
                ],
                idmunicipio:"",
                idmunicipioRules:[
                    v=>!!v||"Municipio es obligatorio"
                ],
                idcomercio:"",
                idcomercioRules:[
                    v=>!!v||"Comercio es obligatorio"
                ]
            }
        })
    },
    methods:{
        onchangeDepartamento(departamento){
            this.loadMunicipiosByDepartamento(departamento);
        },
        async loadMunicipiosByDepartamento(departamento){
            this.isLoadingMunicipios=true;
            await this.$axios.get(`api/municipios?departamento=${departamento}`).then((response)=>{
                if(response.status==200){
                    this.municipiosData=response.data;
                }
            }).catch((error)=>{
                error;
            });
            this.isLoadingMunicipios=false;
        },
        async ondelete(item){
            this.isLoading=true;
            await this.$axios.delete(`api/sucursales/delete/${item.idsucursal}`).then((response)=>{
                response;
            }).catch((error)=>{
                alert("no se puede borrar");
                error;
            });

            await this.loadAll();
            this.isLoading=false;
        },
        onedit(item){
            this.sucursal.idsucursal=item.idsucursal;
            this.sucursal.nombreSucursal=item.nombreSucursal;
            this.sucursal.idmunicipio=item.idmunicipio;
            this.sucursal.idcomercio=item.idcomercio;
        },
        async save(){
            if(this.$refs.sucursal.validate()){
                this.isLoading=true;
                if(this.sucursal.idsucursal){
                    await this.$axios.put(`api/sucursales/update/${this.sucursal.idsucursal}`,this.sucursal).then((response)=>{
                        console.log(response);
                    }).catch((error)=>{
                        error;
                    });
                }else{
                    await this.$axios.post(`api/sucursales/create`,this.sucursal).then((response)=>{
                        console.log(response);
                    }).catch((error)=>{
                        error;
                    });
                }
                delete this.sucursal.idsucursal;

                await this.loadAll();
                this.municipiosData=[];
                this.$refs.sucursal.reset();

                this.isLoading=false;
            }
        },
        async loadDepartamentos(){
            return this.$axios.get(`api/departamentos`);
        },
        async loadSucursales(){
            return this.$axios.get(`api/sucursales`);
        },
        async loadComercios(){
            return this.$axios.get(`api/comercios`);
        },
        async loadAll(){
            this.isLoading=true;
            await this.$axios.all([this.loadDepartamentos(),this.loadSucursales(),this.loadComercios()]).then((response)=>{
                if(response[0].status==200){
                    this.sucursalesData=response[1].data;
                    this.departamentosData=response[0].data;
                    this.comerciosData=response[2].data;
                }
            }).catch((error)=>{
                console.log(error);
                error;
            })
            this.isLoading=false;
        }
    },
    created(){
        this.loadAll();
    }
}
</script>
<style scoped>

</style>