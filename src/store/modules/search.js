import axios from 'axios'
import router from '@/router'
import { path } from '@/api/tmdb-api'

export const search = {
  namespaced: true,
  state: () => ({
    itemsList: [],
    regions: [],
    languages: [],
  }),
  mutations: {
    setItems(state, payload) {
      state.itemsList = [...payload];
    },
    setRegions(state, payload) {
      state.regions = [...payload];
    },
    setLanguages(state, payload) {
      state.languages = [...payload];
    },
  },
  actions: {
    async search({ commit }, { searchValue, adultIncluded, region, language, year }) {
      console.log(language)
      try {
        const res = await axios.get(`${path}/search/multi?api_key=${process.env.VUE_APP_API_KEY}&include_adult=${adultIncluded}&query=${searchValue}&region=${region}&language=${language}&year=${year}`)
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
    },
    async fetchRegions({ commit }) {
      try {
        const res = await axios.get(`${path}/watch/providers/regions?api_key=${process.env.VUE_APP_API_KEY}`);
        if (!res.status) {
          throw new Error('Response is not ok');
        }
        commit('setRegions', res.data.results);
      } catch (error) {
        console.warn(error);
      }
    },
    async fetchLanguages({ commit }) {
      try {
        const res = await axios.get(`${path}/configuration/languages?api_key=${process.env.VUE_APP_API_KEY}`);
        if (!res.status) {
          throw new Error('Response is not ok');
        }
        commit('setLanguages', res.data);
      } catch (error) {
        console.warn(error);
      }
    }
  },
  getters: {
    getItems:(state) => state.itemsList,
    getRegions:(state) => state.regions,
    getLanguages:(state) => state.languages,
  }
}