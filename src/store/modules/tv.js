import axios from 'axios';
import { path } from '../../api/tmdb-api';

export const tv = {
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
    async fetchTvDetails({ commit },{ id }) {
      try {
        const res = await axios.get(`${path}/tv/${id}?api_key=${process.env.VUE_APP_API_KEY}`);
        if (!res.status) {
          throw new Error('Response is not ok')
        }
        this.dispatch('tv/fetchTvCredits',{ id:id });
        commit('setItem', res.data);
      } catch (error) {
        console.warn(error);
      }
    },
    async fetchTvCredits({ commit },{ id }) {
      try {
        const res = await axios.get(`${path}/tv/${id}/credits?api_key=${process.env.VUE_APP_API_KEY}`);
        if (!res.status) {
          throw new Error('Response is not ok')
        }
        commit('setActors', res.data.cast.slice(0,20));
      } catch (error) {
        console.warn(error);
      }
    }
  },
  getters:{
    getItem:(state) => state.item,
    getActors:(state) => state.actors
  }
};
