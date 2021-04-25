import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import Comercios from './components/Comercios'
import Sucursales from './components/Sucursales'
import Quejas from './components/Quejas'
import Estadisticas from './components/Estadisticas'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueAxios, axios)

axios.defaults.baseURL=window.location.hostname.includes("localhost")?`http://localhost:50521/`:"http://diecco-001-site1.itempurl.com/";

const routes=new VueRouter({
  base:"/",
  mode:"hash",
  routes:[
    {
      path:"comercios",component:Comercios,name:"comercios"
    },
    {
      path:"sucursales",component:Sucursales,name:"sucursales"
    },
    {
      path:"quejas",component:Quejas,name:"quejas"
    },
    {
      path:"estadisticas",component:Estadisticas,name:"estadisticas"
    }
  ]
})

new Vue({
  router:routes,
  vuetify,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$axios=axios;
  }
}).$mount('#app')
