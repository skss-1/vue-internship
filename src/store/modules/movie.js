import axios from 'axios';
import { path } from '../../api/tmdb-api';

export const movie = {
  namespaced: true,
  state: () => ({
    item: {},
    actors:[]
  }),
  mutations: {
    setItem(state, payload) {
      state.item = { ...payload };
    },
    setActors(state, payload) {
      state.actors = [...payload];
    },
  },
  actions: {
    async fetchMovieDetails({ commit },{ id }) {
        const res = await axios.get(
          `${path}/movie/${id}?api_key=${process.env.VUE_APP_API_KEY}`
        );
        console.log(res)
        this.dispatch('movie/fetchMovieCredits',{ id:id });
        commit('setItem', res.data);
    },
    async fetchMovieCredits({ commit },{ id }) {
        const res = await axios.get(
          `${path}/movie/${id}/credits?api_key=${process.env.VUE_APP_API_KEY}`
        );
        commit('setActors', res.data.cast.slice(0,20));
    }
  },
  getters:{
    getItem:(state) => state.item,
    getActors:(state) => state.actors
  }
};
