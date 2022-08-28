import Vue from 'vue'
import Vuex from 'vuex'
import { search } from './modules/search'
import { movie } from './modules/movie'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    search,
    movie
  }
})
