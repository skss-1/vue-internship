import axios from 'axios'
import router from '@/router'
import { path } from '@/api/tmdb-api'

export const search = {
  namespaced: true,
  state: () => ({
    itemsList: [],
    totalPages: 0,
    currentPage: 1,
    regions: [],
    languages: [],
    isLoading: true,
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
    },
    setRegions(state, payload) {
      state.regions = [...payload];
    },
    setLanguages(state, payload) {
      state.languages = [...payload];
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    async search({ commit }, { query, include_adult, region, language, year, page }) {
      try {
        commit('setIsLoading', true);
        const res = await axios.get(`${path}/search/multi`, { params: { api_key: process.env.VUE_APP_API_KEY, query, include_adult, region, language, year, page } })
        if (!res.status) {
          throw new Error('Response is not ok');
        }
        commit('setCurrentPage', res.data.page)
        commit('setTotalPages', res.data.total_pages)
        commit('setItems', res.data.results);
        commit('setIsLoading', false);
      } catch (error) {
        console.warn(error);
      }
    },
    async fetchPopularMovies({ commit }, { page }) {
      try {
        commit('setIsLoading', true);
        const res = await axios.get(`${path}/movie/popular`, { params: { api_key: process.env.VUE_APP_API_KEY, page } });      
        if (!res.status) {
          throw new Error('Response is not ok');
        }
        commit('setCurrentPage', res.data.page);
        commit('setTotalPages', res.data.total_pages);
        commit('setItems', res.data.results);
        commit('setIsLoading', false);
      } catch (error) {
        console.warn(error);
      }
    },
    async fetchTopRatedMovies({ commit }, { page }) {
      try {
        commit('setIsLoading', true);
        const res = await axios.get(`${path}/movie/top_rated`, { params: { api_key: process.env.VUE_APP_API_KEY, page } });
        if (!res.status) {
          throw new Error('Response is not ok');
        }
        commit('setCurrentPage', res.data.page);
        commit('setTotalPages', res.data.total_pages);
        commit('setItems', res.data.results);
        commit('setIsLoading', false);
      } catch (error) {
        console.warn(error);
      }
    },
    async fetchUpcomingMovies({ commit }, { page }) {
      try {
        commit('setIsLoading', true);
        const res = await axios.get(`${path}/movie/upcoming`, { params: { api_key: process.env.VUE_APP_API_KEY, page } });
        if (!res.status) {
          throw new Error('Response is not ok');
        }
        commit('setCurrentPage', res.data.page);
        commit('setTotalPages', res.data.total_pages);
        commit('setItems', res.data.results);
        commit('setIsLoading', false);
      } catch (error) {
        console.warn(error);
      }
    },
    async fetchRegions({ commit }) {
      try {
        const res = await axios.get(`${path}/watch/providers/regions`, { params: { api_key: process.env.VUE_APP_API_KEY } });
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
        const res = await axios.get(`${path}/configuration/languages`, { params: { api_key: process.env.VUE_APP_API_KEY } });
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
    getTotalPages: (state) => state.totalPages,
    getCurrentPage: (state) => state.currentPage,
    getItems: (state) => state.itemsList,
    getRegions:(state) => state.regions,
    getLanguages:(state) => state.languages,
    getIsLoading:(state) => state.isLoading,
  }
}