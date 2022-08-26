import axios from 'axios'
import { path } from '../../api/tmdb-api'

export const search = {
  namespaced: true,
  state: () => ({
    itemsList: []
  }),
  mutations: {
    setItems(state, payload) {
      state.itemsList = [...payload]
    }
  },
  actions: {
    async searchMovie({ commit }, { searchValue, adultIncluded }) {
      const res = await axios.get(`${path}/search/movie?api_key=${process.env.VUE_APP_API_KEY}&include_adult=${adultIncluded}&query=${searchValue}`)
      commit('setItems', res.data.results)
    }
  }
}