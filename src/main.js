import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'

Vue.config.productionTip = false
Vue.use(Vuex);

const store = new Vuex.Store({});

export default store;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
