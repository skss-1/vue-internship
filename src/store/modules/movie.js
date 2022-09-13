import axios from 'axios';
import { path } from '../../api/tmdb-api';

export const movie = {
  namespaced: true,
  state: () => ({
    item: {},
    actors: [],
    isLoading: true,
  }),
  mutations: {
    setItem(state, payload) {
      state.item = { ...payload };
    },
    setActors(state, payload) {
      state.actors = [...payload];
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    async fetchMovieDetails({ commit },{ id }) {
      try {
        commit('setIsLoading', true);
        const res = await axios.get(`${path}/movie/${id}?api_key=${process.env.VUE_APP_API_KEY}`);
        if (!res.status) {
          throw new Error('Response is not ok')
        }
        this.dispatch('movie/fetchMovieCredits', { id: id });
        commit('setItem', res.data);
      } catch (error) {
        console.warn(error);
      }
    },
    async fetchMovieCredits({ commit },{ id }) {
      try {
        const res = await axios.get(`${path}/movie/${id}/credits?api_key=${process.env.VUE_APP_API_KEY}`);
        if (!res.status) {
          throw new Error('Response is not ok')
        }
        commit('setActors', res.data.cast.slice(0,20));
        commit('setIsLoading', false);
      } catch (error) {
        console.warn(error);
      }
    }
  },
  getters:{
    getItem:(state) => state.item,
    getActors:(state) => state.actors,
    getIsLoading:(state) => state.isLoading,
  }
};
