import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [
      {
        title: "title",
        checked: false,
        hidden: false,
        details: "no detail yet111111",
        id: Math.random() * 100000,
      },
    ],
  },
  mutations: {
    addNewTask(state, payload) {
      state.tasks.push({
        title: payload.title,
        checked: false,
        hidden: false,
        highPriority: payload.highPriority,
        details: payload.details,
        id: Math.random() * 100000,
      });
    },
  },
  actions: {
    addNewTask(state, payload) {
      state.commit("addNewTask", payload);
    },
  },
  getters: {
    getCurrentTasks(state) {
      return state.tasks.filter((el) => !el.hidden);
    },
    getAllTasks(state) {
      return state.tasks;
    },
  },
});
