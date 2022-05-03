import Vue from 'vue'
import './plugins/vuetify'
import VeeValidate from 'vee-validate'
import { router } from './_helpers'
import { store } from './_store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.use(VeeValidate)
Vue.use(VueAxios, axios)
// Agregamos la URL base de nuestra API
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
