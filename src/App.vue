<template>
  <v-app>
    <div v-if="$router.currentRoute.name==null">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>Quejas</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-btn @click="$router.push({name:'comercios'})">Comercios</v-btn>
          <v-btn @click="$router.push({name:'sucursales'})">Sucursales</v-btn>
          <v-btn  @click="$router.push({name:'quejas'})">Quejas</v-btn>
          <v-btn @click="$router.push({name:'estadisticas'})">Estadisticas</v-btn>
        </v-row>
      </v-container>
    </v-main>
    </div>
    <router-view />
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    //
  }),
  created(){
    
  }
};
</script>
