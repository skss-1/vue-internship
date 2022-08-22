import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: []
  },
  getters: {
  },
  mutations: {
    addElement(state, value) {
      state.tasks = [...state.tasks, value]
    }
  },
  actions: {
  },
  modules: {
  }
})
