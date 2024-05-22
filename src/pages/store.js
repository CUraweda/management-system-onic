import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    branches: []  // Array untuk menyimpan data cabang
  },
  mutations: {
    setBranches(state, branches) {
      state.branches = branches;
    }
  },
  actions: {
    setBranches({ commit }, branches) {
      commit('setBranches', branches);
    }
  },
  getters: {
    getBranches(state) {
      return state.branches;
    }
  }
});
