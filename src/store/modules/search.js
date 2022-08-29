import axios from 'axios'
import router from '@/router'
import { path } from '@/api/tmdb-api'

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
      try {
        const res = await axios.get(`${path}/search/movie?api_key=${process.env.VUE_APP_API_KEY}&include_adult=${adultIncluded}&query=${searchValue}`)
        if (!res.status) {
          throw new Error('Response is not ok')
        }
        router.push({
          query: {
            include_adult:adultIncluded,
            query: searchValue
          }
        })
        commit('setItems', res.data.results)
      } catch (error) {
        console.warn(error)
      }
    }
  }
}