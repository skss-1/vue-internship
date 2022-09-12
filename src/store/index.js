import Vue from 'vue'
import Vuex from 'vuex'
import { search } from './modules/search'
import { movie } from './modules/movie'
import { person } from './modules/person'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    search,
    movie,
    person
  }
})
