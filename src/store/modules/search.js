import axios from 'axios'
import router from '@/router'
import { path } from '@/api/tmdb-api'

export const search = {
  namespaced: true,
  state: () => ({
    itemsList: [],
    totalPages: 0,
    currentPage: 1
  }),
  mutations: {
    setItems(state, payload) {
      state.itemsList = [...payload];
    },
    setTotalPages(state, payload) {
      state.totalPages = payload
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload
    }
  },
  actions: {
    async searchMovie({ commit }, { searchValue, adultIncluded, page }) {
      try {
        const res = await axios.get(`${path}/search/movie?api_key=${process.env.VUE_APP_API_KEY}&include_adult=${adultIncluded}&query=${searchValue}&page=${page}`)
        if (!res.status) {
          throw new Error('Response is not ok')
        }
        commit('setCurrentPage', res.data.page)
        commit('setTotalPages', res.data.total_pages)
        commit('setItems', res.data.results)
      } catch (error) {
        console.warn(error)
      }
    },
    async fetchPopularMovies({ commit }, { page }) {
      try {
        const res = await axios.get(`${path}/movie/popular?api_key=${process.env.VUE_APP_API_KEY}&page=${page}`);
        if (!res.status) {
          throw new Error('Response is not ok')
        }
        commit('setCurrentPage', res.data.page)
        commit('setTotalPages', res.data.total_pages)
        commit('setItems', res.data.results);
      } catch (error) {
        console.warn(error)
      }
    },
    async fetchTopRatedMovies({ commit }, { page }) {
      try {
        const res = await axios.get(`${path}/movie/top_rated?api_key=${process.env.VUE_APP_API_KEY}&page=${page}`);
        if (!res.status) {
          throw new Error('Response is not ok')
        }
        commit('setCurrentPage', res.data.page)
        commit('setTotalPages', res.data.total_pages)
        commit('setItems', res.data.results);
      } catch (error) {
        console.warn(error)
      }
    },
    async fetchUpcomingMovies({ commit }, { page }) {
      try {
        const res = await axios.get(`${path}/movie/upcoming?api_key=${process.env.VUE_APP_API_KEY}&page=${page}`);
        if (!res.status) {
          throw new Error('Response is not ok')
        }
        commit('setCurrentPage', res.data.page)
        commit('setTotalPages', res.data.total_pages)
        commit('setItems', res.data.results);
      } catch (error) {
        console.warn(error)
      }
    }
  },
  getters: {
    getItems: (state) => state.itemsList,
    getTotalPages: (state) => state.totalPages,
    getCurrentPage: (state) => state.currentPage
  }
}