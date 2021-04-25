<template>
    <v-app id="comercios">
        <v-app-bar color="primary" app dark>
            <v-btn icon @click="$router.go(-1)">
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>
                Quejas
            </v-toolbar-title>
        </v-app-bar>
        <v-main>
            <v-container>
                <v-progress-linear indeterminate color="primary" v-if="isLoading"></v-progress-linear>
                <v-data-table :items="quejasData"
                :headers="headers" 
                >
                    <template v-slot:item.actions="{item}">
                        <v-btn icon @click="ondelete(item)"><v-icon>clear</v-icon></v-btn>
                        <v-btn icon @click="onedit(item)"><v-icon>edit</v-icon></v-btn>
                    </template>
                </v-data-table>
                <v-row justify="center">
                    <v-col cols="12" sm="12" md="6" align="center">
                        <v-form ref="queja" :disabled="isLoading">
                            <v-text-field
                            label="Queja"
                            outlined
                            v-model="queja.queja1"
                            :rules="queja.quejaRules"
                            >

                            </v-text-field>
                            <v-select
                            label="Sucursales"
                            :items="sucursalesData"
                            :item-text="(item)=>`${item.nombreSucursal}`"
                            item-value="idsucursal"
                            v-model="queja.idsucursal"
                            :rules="queja.idsucursalRules"
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
            headers:[
                {text:"Queja",value:"queja1"},
                {text:"Comercio",value:"idsucursalNavigation.idcomercioNavigation.nombreComercio"},
                {text:"Dirección Sucursal",value:"idsucursalNavigation.nombreSucursal"},
                {text:"Acciones",value:"actions"},
            ],
            sucursalesData:[],
            quejasData:[],
            queja:{
                queja:"",
                quejaRules:[
                    v=>!!v||"Dirección de sucursal es obligatorio"
                ],
                idsucursal:"",
                idsucursalRules:[
                    v=>!!v||"Sucursal es obligatoria"
                ],
            }
        })
    },
    methods:{
        async ondelete(item){
            this.isLoading=true;
            await this.$axios.delete(`api/quejas/delete/${item.idqueja}`).then((response)=>{
                response;
            }).catch((error)=>{
                alert("no se puede borrar");
                error;
            });

            await this.loadAll();
            this.isLoading=false;
        },
        onedit(item){
            this.queja.idqueja=item.idqueja;
            this.queja.queja1=item.queja1;
            this.queja.idsucursal=item.idsucursal;
        },
        async save(){
            if(this.$refs.queja.validate()){
                this.isLoading=true;
                if(this.queja.idqueja){
                    await this.$axios.put(`api/quejas/update/${this.queja.idqueja}`,this.queja).then((response)=>{
                        console.log(response);
                    }).catch((error)=>{
                        error;
                    });
                }else{
                    await this.$axios.post(`api/quejas/create`,this.queja).then((response)=>{
                        console.log(response);
                    }).catch((error)=>{
                        error;
                    });
                }
                delete this.queja.idqueja;
                await this.loadAll();
                this.isLoading=false;
                this.$refs.queja.reset();
            }
        },
        async loadQuejas(){
            return this.$axios.get(`api/quejas`);
        },
        async loadSucursales(){
            return this.$axios.get(`api/sucursales`);
        },
        async loadAll(){
            this.isLoading=true;
            await this.$axios.all([this.loadQuejas(),this.loadSucursales()]).then((response)=>{
                if(response[0].status==200){
                    this.quejasData=response[0].data;
                    this.sucursalesData=response[1].data;
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