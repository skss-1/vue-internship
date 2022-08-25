import axios from 'axios'
import { API_KEY, path } from '../../api/tmdb-api'


export const search = {
  state: () => ({
    itemsList: []
  }),
  mutations: {
    stateUpdate(state, payload) {
    state.itemsList = [...payload]
    console.log(state.itemsList)
    }
  },
  actions: {
    async searchMovie({ commit }, { searchValue, adultIncluded }) {
      const res = await axios.get(`${path}/search/movie?api_key=${API_KEY}&include_adult=${adultIncluded}&query=${searchValue}`)
      commit('stateUpdate', res.data.results)
    }
  }
}