<template>
    <v-app id="comercios">
        <v-app-bar color="primary" app dark>
            <v-btn icon @click="$router.go(-1)">
                <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>
                Estadisticas
            </v-toolbar-title>
        </v-app-bar>
        <v-main>
            <v-container>
                <v-progress-linear indeterminate color="primary" v-if="isLoading"></v-progress-linear>
                <v-data-table :items="estadisticas1"
                caption="Número de quejas por comercio sin region oriente"
                :headers="headers1" 
                >
                </v-data-table>
                <v-data-table :items="estadisticas2"
                caption="Número de quejas por municipio"
                :headers="headers2" 
                >
                </v-data-table>
                <v-data-table :items="estadisticas3"
                caption="Número de quejas por departamento"
                :headers="headers3" 
                >
                </v-data-table>
                <v-data-table :items="estadisticas4"
                caption="Número de quejas por region"
                :headers="headers4" 
                >
                </v-data-table>
                <v-data-table :items="estadisticas5"
                caption="Número de quejas por comercio"
                :headers="headers1" 
                >
                </v-data-table>
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
export default {
    data:function(){
        return ({
            isLoading:false,
            headers1:[
                {text:"Cantidad quejas",value:"queja"},
                {text:"Nombre Comercio",value:"comercio"},
            ],
            headers2:[
                {text:"Cantidad quejas",value:"queja"},
                {text:"Nombre Municipio",value:"comercio"},
            ],
            headers3:[
                {text:"Cantidad quejas",value:"queja"},
                {text:"Nombre Departamento",value:"comercio"},
            ],
            headers4:[
                {text:"Cantidad quejas",value:"queja"},
                {text:"Nombre Region",value:"comercio"},
            ],
            estadisticas1:[],
            estadisticas2:[],
            estadisticas3:[],
            estadisticas4:[],
            estadisticas5:[],
        })
    },
    methods:{
        async loadEstadisticas1(){
            return this.$axios.get(`api/estadisticas`);
        },
        async loadEstadisticas2(){
            return this.$axios.get(`api/estadisticas/municipio`);
        },
        async loadEstadisticas3(){
            return this.$axios.get(`api/estadisticas/departamento`);
        },
        async loadEstadisticas4(){
            return this.$axios.get(`api/estadisticas/region`);
        },
        async loadEstadisticas5(){
            return this.$axios.get(`api/estadisticas/comercio`);
        },
        async loadAll(){
            this.isLoading=true;
            await this.$axios.all([this.loadEstadisticas1(),this.loadEstadisticas2(),this.loadEstadisticas3(),this.loadEstadisticas4(),this.loadEstadisticas5()]).then((response)=>{
                if(response[0].status==200){
                    this.estadisticas1=response[0].data;
                    this.estadisticas2=response[1].data;
                    this.estadisticas3=response[2].data;
                    this.estadisticas4=response[3].data;
                    this.estadisticas5=response[4].data;
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