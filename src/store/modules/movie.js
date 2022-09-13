import axios from 'axios';
import { path } from '../../api/tmdb-api';

export const movie = {
  namespaced: true,
  state: () => ({
    item: {},
    actors: [],
    videos: [],
    reviews: [],
    isLoading: true,
  }),
  mutations: {
    setItem(state, payload) {
      state.item = { ...payload };
    },
    setActors(state, payload) {
      state.actors = [...payload];
    },
    setVideos(state, payload) {
      state.videos = [...payload];
    },
    setReviews(state, payload) {
      state.reviews = [...payload];
    },
    setIsLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    async fetchMovieDetails({ commit },{ id }) {
      try {
        commit('setIsLoading', true);
        commit('setItem', {});
        commit('setActors', []);
        commit('setVideos', []);
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
        this.dispatch('movie/fetchMovieVideos', { id: id });
        commit('setActors', res.data.cast.slice(0,20));
      } catch (error) {
        console.warn(error);
      }
    },
    async fetchMovieVideos({ commit },{ id }) {
      try {
        const res = await axios.get(`${path}/movie/${id}/videos?api_key=${process.env.VUE_APP_API_KEY}`);
        if (!res.status) {
          throw new Error('Response is not ok')
        }
        this.dispatch('movie/fetchMovieReviews', { id: id });
        commit('setVideos', res.data.results);
      } catch (error) {
        console.warn(error);
      }
    },
    async fetchMovieReviews({ commit },{ id }) {
      try {
        const res = await axios.get(`${path}/movie/${id}/reviews?api_key=${process.env.VUE_APP_API_KEY}`);
        if (!res.status) {
          throw new Error('Response is not ok')
        }
        commit('setReviews', res.data.results);
        commit('setIsLoading', false);
      } catch (error) {
        console.warn(error);
      }
    }
  },
  getters:{
    getItem:(state) => state.item,
    getActors:(state) => state.actors,
    getVideos:(state) => state.videos,
    getReviews:(state) => state.reviews,
    getIsLoading:(state) => state.isLoading,
  }
};
