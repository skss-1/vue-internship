import axios from 'axios';
import { path } from '../../api/tmdb-api';

export const person = {
  namespaced: true,
  state: () => ({
    person: {},
    credits: [],
    loading:true,
  }),
  mutations: {
    setPerson(state, payload) {
      state.person = { ...payload };
    },
    setCredits(state, payload) {
      state.credits = [...payload];
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async fetchPerson({ commit },{ id }) {
      try {
        commit('setLoading', true);
        const res = await axios.get(`${path}/person/${id}?api_key=${process.env.VUE_APP_API_KEY}`);
        if (!res.status) {
          throw new Error('Response is not ok');
        }
        this.dispatch('person/fetchCredits', { id: id });
        commit('setPerson', res.data);
      } catch (error) {
        console.warn(error);
      }
    },
    async fetchCredits({ commit },{ id }) {
      try {
        const res = await axios.get(`${path}/person/${id}/combined_credits?api_key=${process.env.VUE_APP_API_KEY}`);
        if (!res.status) {
          throw new Error('Response is not ok');
        }
        commit('setCredits',  res.data.cast);
        commit('setLoading', false);
      } catch (error) {
        console.warn(error);
      }
    },
  },
  getters: {
    getPerson:(state) => state.person,
    getCredits:(state) => state.credits,
    getLoading:(state) => state.loading,
  }
};
