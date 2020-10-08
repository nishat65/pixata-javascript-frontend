import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth/auth';
import post from './post/post';
// import forgotPassword from './auth/forgotPassword';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    post,
  },
});
