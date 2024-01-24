// frontend/src/store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import AuthService from '../services/AuthService';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    login({ commit }, credentials) {
      return AuthService.login(credentials)
        .then(() => {
          commit('setToken', localStorage.getItem('token'));
        });
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token
  }
});
