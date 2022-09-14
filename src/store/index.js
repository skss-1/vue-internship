import Vue from 'vue'
import Vuex from 'vuex'
import { search } from './modules/search'
import { movie } from './modules/movie'
import { tv } from './modules/tv'
import { person } from './modules/person'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    search,
    movie,
    tv,
    person
  }
})
