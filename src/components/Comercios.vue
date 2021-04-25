<template>
    <v-app id="comercios">
        <v-app-bar color="primary" app dark>
            <v-btn icon @click="$router.go(-1)">
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>
                Comercios 
            </v-toolbar-title>
        </v-app-bar>
        <v-main>
            <v-container>
                <v-progress-linear indeterminate color="primary" v-if="isLoading"></v-progress-linear>
                <v-data-table :items="comerciosData"
                :headers="headers" 
                >
                    <template v-slot:item.actions="{item}">
                        <v-btn icon @click="ondelete(item)"><v-icon>clear</v-icon></v-btn>
                        <v-btn icon @click="onedit(item)"><v-icon>edit</v-icon></v-btn>
                    </template>
                </v-data-table>
                <v-row justify="center">
                    <v-col cols="12" sm="12" md="6" align="center">
                        <v-form ref="comercio" :disabled="isLoading">
                            <v-text-field
                            label="Nombre comercio"
                            outlined
                            v-model="comercio.nombreComercio"
                            :rules="comercio.nombreRules"
                            >

                            </v-text-field>
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
                {text:"Nombre Comercio",value:"nombreComercio"},
                {text:"Acciones",value:"actions"},
            ],
            comerciosData:[],
            comercio:{
                nombreComercio:"",
                nombreRules:[
                    v=>!!v||"Nombre comercio es obligatorio"
                ]
            }
        })
    },
    methods:{
        async ondelete(item){
            this.isLoading=true;
            await this.$axios.delete(`api/comercios/delete/${item.idcomercio}`).then((response)=>{
                response;
            }).catch((error)=>{
                alert("no se puede borrar");
                error;
            });

            this.loadComercios();
            this.isLoading=false;
        },
        onedit(item){
            this.comercio.idcomercio=item.idcomercio;
            this.comercio.nombreComercio=item.nombreComercio;
        },
        async save(){
            if(this.$refs.comercio.validate()){
                this.isLoading=true;
                if(this.comercio.idcomercio){
                    await this.$axios.put(`api/comercios/update/${this.comercio.idcomercio}`,this.comercio).then((response)=>{
                        console.log(response);
                    }).catch((error)=>{
                        error;
                    });
                }else{
                    await this.$axios.post(`api/comercios/create`,this.comercio).then((response)=>{
                        console.log(response);
                    }).catch((error)=>{
                        error;
                    });
                }
                delete this.comercio.idcomercio;
                await this.loadComercios();
                this.isLoading=false;
                this.$refs.comercio.reset();
            }
        },
        async loadComercios(){
            this.isLoading=true;
            await this.$axios.get(`api/comercios`).then((response)=>{
                if(response.status==200){
                    this.comerciosData=response.data;
                }
            }).catch((error)=>{
                error;
            });
            this.isLoading=false;
        }
    },
    created(){
        this.loadComercios();
    }
}
</script>
<style scoped>

</style>