import axios from 'axios'
import router from '@/router'
import { path } from '@/api/tmdb-api'

export const search = {
  namespaced: true,
  state: () => ({
    itemsList: [],
  }),
  mutations: {
    setItems(state, payload) {
      state.itemsList = [...payload];
    },
  },
  actions: {
    async searchMovie({ commit }, { searchValue, adultIncluded }) {
      try {
        const res = await axios.get(`${path}/search/movie?api_key=${process.env.VUE_APP_API_KEY}&include_adult=${adultIncluded}&query=${searchValue}`)
        if (!res.status) {
          throw new Error('Response is not ok')
        }
        commit('setItems', res.data.results)
      } catch (error) {
        console.warn(error)
      }
    },
    async fetchPopularMovies({ commit }) {
      try {
        const res = await axios.get(`${path}/movie/popular?api_key=${process.env.VUE_APP_API_KEY}`);
        if (!res.status) {
          throw new Error('Response is not ok')
        }
        commit('setItems', res.data.results);
      } catch (error) {
        console.warn(error)
      }
    },
    async fetchTopRatedMovies({ commit }) {
      try {
        const res = await axios.get(`${path}/movie/top_rated?api_key=${process.env.VUE_APP_API_KEY}`);
        if (!res.status) {
          throw new Error('Response is not ok')
        }
        commit('setItems', res.data.results);
      } catch (error) {
        console.warn(error)
      }
    },
    async fetchUpcomingMovies({ commit }) {
      try {
        const res = await axios.get(`${path}/movie/upcoming?api_key=${process.env.VUE_APP_API_KEY}`);
        if (!res.status) {
          throw new Error('Response is not ok')
        }
        commit('setItems', res.data.results);
      } catch (error) {
        console.warn(error)
      }
    }
  },
  getters: {
    getItems:(state) => state.itemsList
  }
}